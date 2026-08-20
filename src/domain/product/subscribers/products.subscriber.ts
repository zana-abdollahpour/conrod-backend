import { join } from 'node:path';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';

import { Product } from 'domain/product/entities/product.entity';
import { FilePath } from 'files/files.config';
import { StorageService } from 'files/storage/storage.abstract.service';

@EventSubscriber()
export class ProductsSubscriber implements EntitySubscriberInterface<Product> {
  private readonly IMAGES_FILENAMES_KEY = 'imageFilenames';

  constructor(
    private readonly dataSource: DataSource,
    private readonly storageService: StorageService,
  ) {
    dataSource.subscribers.push(this);
  }

  private async getImagesFileNames(id: number) {
    const { BASE, IMAGES } = FilePath.Products;
    const path = join(BASE, id.toString(), IMAGES);

    if (!(await this.storageService.pathExists(path))) {
      return;
    }

    return this.storageService.getDirFileNames(path);
  }

  listenTo() {
    return Product;
  }

  async afterLoad(entity: Product) {
    const imagesFilenames = await this.getImagesFileNames(entity.id);
    entity[this.IMAGES_FILENAMES_KEY] = imagesFilenames;
  }
}
