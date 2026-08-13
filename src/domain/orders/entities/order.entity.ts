import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Expose } from 'class-transformer';
import { RegistryDates } from 'common/embedded/registry-date.embedded';
import { OrderItem } from 'domain/orders/entities/order-item.entity';
import { OrderStatus } from 'domain/orders/enums/order-status.enum';
import { Payment } from 'domain/payments/entities/payment.entity';
import { User } from 'domain/users/entities/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.AWAITING_PAYMENT,
  })
  status: OrderStatus;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;

  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  customer: User;

  @OneToOne(() => Payment, (payment) => payment.order, { cascade: true })
  payment: Payment;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @Expose()
  get total() {
    return this.items?.reduce((total, curItem) => total + curItem.subTotal, 0);
  }
}
