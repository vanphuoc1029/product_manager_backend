import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Patch,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product-dto';
import { CategoriesService } from 'src/categories/categories.service';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private categoryService: CategoriesService,
  ) {}

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    const category = await this.categoryService.getCategoryById(body.category);
    return this.productsService.createProduct(body, category);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Patch(':id')
  async updateProduct(@Body() body: CreateProductDto, @Param('id') id: string) {
    const category = await this.categoryService.getCategoryById(body.category);
    return this.productsService.updateProduct(id, body, category);
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }
}
