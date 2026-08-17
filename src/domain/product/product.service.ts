import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DefaultPageSizes } from 'common/common.config';
import { PaginationDto } from 'common/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    const skip = offset;
    const take = limit || DefaultPageSizes.PRODUCTS;

    return this.productsRepository.find({ skip, take });
  }

  async findOne(id: number) {
    return await this.productsRepository.findOneOrFail({
      where: { id },
      relations: { categories: true },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.preload({
      id,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.productsRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);

    return this.productsRepository.remove(product);
  }
}
