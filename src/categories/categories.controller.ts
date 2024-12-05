import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createCategory(@Body() body: CreateCategoryDto) {
    return await this.categoriesService.createCategory(body);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getCategories() {
    return await this.categoriesService.getCategories();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getCategoryById(@Param('id') id: string) {
    return await this.categoriesService.getCategoryById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async editCategory(@Body() body: CreateCategoryDto, @Param('id') id: string) {
    return await this.categoriesService.editCategory(body, parseInt(id));
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteCategory(@Param('id') id: string) {
    return await this.categoriesService.deleteCategory(parseInt(id));
  }
}
