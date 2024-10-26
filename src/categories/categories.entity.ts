import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';
import { ProductsEntity } from '../products/products.entity';

@Entity('categories')
export class CategoriesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ProductsEntity, (product) => product.category)
  products: ProductsEntity[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted category with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed category with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated category with id', this.id);
  }
}
