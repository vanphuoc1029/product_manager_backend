import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { CategoriesEntity } from '../categories/categories.entity';
import { InvoiceDetailEntity } from 'src/invoices/invoiceDetail.entity';

@Entity('products')
export class ProductsEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => CategoriesEntity, (category) => category.products)
  category: CategoriesEntity;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  stock: number;

  @Column()
  description: string;

  @OneToMany(
    () => InvoiceDetailEntity,
    (invoiceDetail) => invoiceDetail.product,
  )
  invoiceDetails: InvoiceDetailEntity[];
}
