import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductsEntity } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dtos/create-product-dto';
import { CategoriesEntity } from 'src/categories/categories.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity) private repo: Repository<ProductsEntity>,
  ) {}

  async getAllProducts() {
    return await this.repo.find();
  }

  async createProduct(body: CreateProductDto, category: CategoriesEntity) {
    const product = new ProductsEntity();
    product.id = body.id;
    product.category = category;
    product.stock = body.stock;
    product.name = body.name;
    product.price = body.price;
    product.description = body.description;
    return await this.repo.save(product);
  }

  async deleteProduct(id: string) {
    return await this.repo.delete({ id });
  }

  async updateProduct(
    id: string,
    body: CreateProductDto,
    category: CategoriesEntity,
  ) {
    const product = await this.repo.findOne({ where: { id } });
    product.id = body.id;
    product.category = category;
    product.stock = body.stock;
    product.name = body.name;
    product.price = body.price;
    product.description = body.description;
    return await this.repo.save(product);
  }

  async getProductById(id: string) {
    return await this.repo.findOne({ where: { id } });
  }
}
