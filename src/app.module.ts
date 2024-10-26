import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { TypeOrmModule } from './datasource/typeorm.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { InvoicesModule } from './invoices/invoices.module';

@Module({
  imports: [
    ProductsModule,
    CustomersModule,
    TypeOrmModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    InvoicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
