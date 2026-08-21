import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderItemDto } from 'domain/orders/dto/order-item.dto';
import { OrderItem } from 'domain/orders/entities/order-item.entity';
import { Product } from 'domain/product/entities/product.entity';
import { PaginationDto } from 'querying/dto/pagination.dto';
import { DefaultPageSizes } from 'querying/querying.config';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { items } = createOrderDto;

    const itemsWithPrices = await Promise.all(
      items.map((item) => this.createOrderItemWithPrice(item)),
    );

    const order = this.ordersRepository.create({
      ...createOrderDto,
      items: itemsWithPrices,
    });
    return this.ordersRepository.save(order);
  }

  findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    const skip = offset;
    const take = limit || DefaultPageSizes.ORDERS;

    return this.ordersRepository.find({ skip, take });
  }

  async findOne(id: number) {
    return await this.ordersRepository.findOneOrFail({
      where: { id },
      relations: { items: { product: true }, customer: true, payment: true },
    });
  }

  async remove(id: number) {
    const order = await this.findOne(id);

    return this.ordersRepository.remove(order);
  }

  private async createOrderItemWithPrice(orderItemDto: OrderItemDto) {
    const { id } = orderItemDto.product;
    const product = await this.productsRepository.findOneByOrFail({ id });

    const { price } = product;

    const orderItem = this.orderItemsRepository.create({
      ...orderItemDto,
      price,
    });

    return orderItem;
  }
}
