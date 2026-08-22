import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'node:path';
import { DataSource, Repository } from 'typeorm';

import { DefaultPageSizes } from 'querying/querying.config';

import { FilePath, MaxFileCounts } from 'files/files.config';
import { StorageService } from 'files/storage/storage.abstract.service';
import { File } from 'files/types/file.types';

import { QueryProductsDto } from 'domain/product/dto/querying/query-products.dto';
import { FilteringService } from 'querying/filtering.service';
import { PaginationService } from 'querying/pagination.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly storageService: StorageService,
    private readonly dataSource: DataSource,
    private readonly paginationService: PaginationService,
    private readonly filteringService: FilteringService,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async findAll(queryProductsDto: QueryProductsDto) {
    const { page, name, price, categoryId, sort, order } = queryProductsDto;

    const limit = queryProductsDto.limit || DefaultPageSizes.PRODUCTS;
    const offset = this.paginationService.calculateOffset(limit, page);

    const [products, count] = await this.productsRepository.findAndCount({
      where: {
        name: this.filteringService.contains(name),
        categories: { id: categoryId },
        price: this.filteringService.compare(price),
      },
      order: { [sort]: order },
      skip: offset,
      take: limit,
    });

    const meta = this.paginationService.createMeta(limit, page, count);

    return { products, meta };
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
    return this.dataSource.transaction(async (manager) => {
      const productsRepository = manager.getRepository(Product);

      const product = await productsRepository.findOneByOrFail({ id });
      await productsRepository.remove(product);

      await this.deleteBaseDir(id);

      return product;
    });
  }

  async uploadImages(id: number, files: File[]) {
    await this.findOne(id);

    const { BASE, IMAGES } = FilePath.Products;
    const path = join(BASE, id.toString(), IMAGES);

    if (await this.storageService.pathExists(path)) {
      const incomingFileCount = files.length;
      const dirFileCount = await this.storageService.getDirFileCount(path);
      const totalFileCount = incomingFileCount + dirFileCount;

      this.storageService.validateFileCount(
        totalFileCount,
        MaxFileCounts.PRODUCT_IMAGES,
      );
    }

    await this.storageService.createDir(path);

    await Promise.all(
      files.map((file) => this.storageService.saveFile(path, file)),
    );
  }

  async downloadImage(id: number, filename: string) {
    await this.findOne(id);

    const { BASE, IMAGES } = FilePath.Products;
    const path = join(BASE, id.toString(), IMAGES, filename);

    await this.storageService.validatePath(path);

    return this.storageService.getFile(path);
  }

  async deleteImage(id: number, filename: string) {
    await this.findOne(id);

    const { BASE, IMAGES } = FilePath.Products;
    const path = join(BASE, id.toString(), IMAGES, filename);

    await this.storageService.validatePath(path);

    return this.storageService.delete(path);
  }

  private async deleteBaseDir(id: number) {
    const { BASE } = FilePath.Products;
    const path = join(BASE, id.toString());

    await this.storageService.delete(path);
  }
}
