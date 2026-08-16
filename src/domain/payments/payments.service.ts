import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Order } from 'domain/orders/entities/order.entity';
import { OrderStatus } from 'domain/orders/enums/order-status.enum';
import { Payment } from 'domain/payments/entities/payment.entity';
import { RequestUser } from 'iam/authentication/interfaces/request-user.interface';
import { assertUserAccess } from 'iam/authorization.utils';

@Injectable()
export class PaymentsService {
  constructor(private readonly dataSource: DataSource) {}

  async payOrder(id: number, currentUser: RequestUser) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = await queryRunner.manager.findOne(Order, {
        where: { id },
        relations: { payment: true, customer: true },
      });

      assertUserAccess(order.customer.id, currentUser);

      if (!order) {
        throw new NotFoundException('Order not found');
      }

      if (order.payment) {
        throw new ConflictException('Order already paid');
      }

      const payment = queryRunner.manager.create(Payment, {
        order: order,
      });

      await queryRunner.manager.save(payment);

      order.payment = payment;
      order.status = OrderStatus.AWAITING_SHIPMENT;

      await queryRunner.manager.save(order);

      await queryRunner.commitTransaction();

      return order;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
