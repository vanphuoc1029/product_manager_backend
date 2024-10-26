import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from './products.entity';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity]), CategoriesModule],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
