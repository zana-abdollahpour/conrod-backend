import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsSubscriber } from 'domain/product/subscribers/products.subscriber';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductsService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductsService, ProductsSubscriber],
})
export class ProductModule {}
