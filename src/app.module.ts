import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UsersModule } from './domain/users/users.module';
import { DatabaseModule } from './database/database.module';
import { EnvModule } from './env/env.module';
import { OrdersModule } from './domain/orders/orders.module';
import { PaymentsModule } from './domain/payments/payments.module';
import { CategoriesModule } from './domain/categories/categories.module';
import { ProductModule } from './domain/product/product.module';
import { IamModule } from './iam/iam.module';

@Module({
  imports: [UsersModule, CommonModule, DatabaseModule, EnvModule, OrdersModule, PaymentsModule, CategoriesModule, ProductModule, IamModule],
})
export class AppModule {}
