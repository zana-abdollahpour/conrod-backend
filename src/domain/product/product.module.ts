import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsSubscriber } from 'domain/product/subscribers/products.subscriber';
import { QueryingModule } from 'querying/querying.module';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductsService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), QueryingModule],
  controllers: [ProductController],
  providers: [ProductsService, ProductsSubscriber],
})
export class ProductModule {}
