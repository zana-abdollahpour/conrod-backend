import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RegistryDates } from 'common/embedded/registry-date.embedded';
import { Category } from 'domain/categories/entities/category.entity';
import { OrderItem } from 'domain/orders/entities/order-item.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  price: number;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;

  @JoinTable({ name: 'product_to_category' })
  @ManyToMany(() => Category, (category) => category.products)
  categories: Category[];

  @OneToMany(() => OrderItem, (item) => item.product)
  items: OrderItem[];

  get orders() {
    return this.items.map((item) => item.order);
  }
}
