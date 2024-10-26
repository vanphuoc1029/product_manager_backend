import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesEntity } from './categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/createCategory.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private categoriesRepository: Repository<CategoriesEntity>,
  ) {}

  async createCategory(body: CreateCategoryDto) {
    return await this.categoriesRepository.save(body);
  }

  async getCategories() {
    return await this.categoriesRepository.find({ order: { id: 'ASC' } });
  }

  async getCategoryById(id: string) {
    const idInt = parseInt(id);
    return await this.categoriesRepository.findOne({ where: { id: idInt } });
  }

  async editCategory(body: CreateCategoryDto, id: number) {
    return await this.categoriesRepository.update({ id }, body);
  }

  async deleteCategory(id: number) {
    return await this.categoriesRepository.delete(id);
  }
}
