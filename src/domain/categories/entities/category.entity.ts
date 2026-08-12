import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RegistryDates } from 'common/embedded/registry-date.embedded';
import { Product } from 'domain/product/entities/product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
