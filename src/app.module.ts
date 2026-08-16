import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { CategoriesModule } from './domain/categories/categories.module';
import { OrdersModule } from './domain/orders/orders.module';
import { PaymentsModule } from './domain/payments/payments.module';
import { ProductModule } from './domain/product/product.module';
import { UsersModule } from './domain/users/users.module';
import { EnvModule } from './env/env.module';
import { IamModule } from './iam/iam.module';
import { SecurityModule } from './security/security.module';

@Module({
  imports: [
    EnvModule,
    SecurityModule,
    IamModule,
    UsersModule,
    CommonModule,
    DatabaseModule,
    OrdersModule,
    PaymentsModule,
    CategoriesModule,
    ProductModule,
  ],
})
export class AppModule {}
