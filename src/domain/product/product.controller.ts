import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { IdDto } from 'common/dto/id.dto';
import { PaginationDto } from 'common/dto/pagination.dto';
import { Public } from 'iam/authentication/decorators/public.decorator';
import { Roles } from 'iam/authorization/decorators/roles.decorator';
import { Role } from 'iam/authorization/enum/roles.enum';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './product.service';

import { MaxFileCounts } from 'files/files.config';
import type { File } from 'files/types/file.types';
import { createFileValidator } from 'files/util/file-validation.util';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(Role.MANAGER, Role.ADMIN)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Public()
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
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

  @UseInterceptors(FilesInterceptor('files', MaxFileCounts.PRODUCT_IMAGES))
  @Post(':id/images')
  uploadImage(
    @UploadedFiles(
      new ParseFilePipe({
        validators: createFileValidator('2mb', 'jpg', 'jpeg'),
      }),
    )
    files: File[],
  ) {
    return files; // TODO: implement me
  }
}
