import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { IdDto } from 'common/dto/id.dto';
import { Public } from 'iam/authentication/decorators/public.decorator';
import { Roles } from 'iam/authorization/decorators/roles.decorator';
import { Role } from 'iam/authorization/enum/roles.enum';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './product.service';

import { ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { QueryProductsDto } from 'domain/product/dto/querying/query-products.dto';
import { Product } from 'domain/product/entities/product.entity';
import { IdFilenameDto } from 'files/dto/id-filename.dto';
import { MULTIPART_FORMDATA_KEY, MaxFileCounts } from 'files/files.config';
import { FileSchema } from 'files/schemas/file.schema';
import { FilesSchema } from 'files/schemas/files.schema';
import type { File } from 'files/types/file.types';
import { createParseFilePipe } from 'files/util/file-validation.util';
import { ApiPaginatedResponse } from 'querying/decorators/api-paginated-response.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(Role.MANAGER, Role.ADMIN)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiPaginatedResponse(Product)
  @Public()
  @Get()
  findAll(@Query() queryProductsDto: QueryProductsDto) {
    return this.productsService.findAll(queryProductsDto);
  }

  @Public()
  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.productsService.findOne(id);
  }

  @Roles(Role.MANAGER, Role.ADMIN)
  @Patch(':id')
  update(@Param() { id }: IdDto, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Roles(Role.MANAGER, Role.ADMIN)
  @Delete(':id')
  remove(@Param() { id }: IdDto) {
    return this.productsService.remove(id);
  }

  @ApiConsumes(MULTIPART_FORMDATA_KEY)
  @ApiBody({ type: FilesSchema })
  @Roles(Role.MANAGER)
  @UseInterceptors(FilesInterceptor('files', MaxFileCounts.PRODUCT_IMAGES))
  @Post(':id/images')
  uploadImage(
    @Param() { id }: IdDto,
    @UploadedFiles(createParseFilePipe('2mb', 'png', 'jpeg')) files: File[],
  ) {
    return this.productsService.uploadImages(id, files);
  }

  @ApiOkResponse({ type: FileSchema })
  @Public()
  @Get(':id/images/:filename')
  downloadImages(@Param() { id, filename }: IdFilenameDto) {
    return this.productsService.downloadImage(id, filename);
  }

  @Roles(Role.MANAGER)
  @Delete(':id/images/:filename')
  deleteImages(@Param() { id, filename }: IdFilenameDto) {
    return this.productsService.deleteImage(id, filename);
  }
}
