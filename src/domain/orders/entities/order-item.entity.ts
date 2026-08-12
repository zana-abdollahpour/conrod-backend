import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { Order } from 'domain/orders/entities/order.entity';
import { Product } from 'domain/product/entities/product.entity';

@Entity()
export class OrderItem {
  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 4, scale: 2 })
  price: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.items, { onDelete: 'CASCADE' })
  product: Product;

  @PrimaryColumn()
  orderId: number;

  @PrimaryColumn()
  productId: number;
}
