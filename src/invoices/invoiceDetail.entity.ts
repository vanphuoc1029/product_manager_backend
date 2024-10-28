import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  AfterInsert,
  AfterRemove,
} from 'typeorm';
import { InvoiceEntity } from './invoices.entity';
import { ProductsEntity } from '../products/products.entity';

@Entity('invoice_details')
export class InvoiceDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => InvoiceEntity, (invoice) => invoice.invoiceDetails)
  invoice: InvoiceEntity;

  @ManyToOne(() => ProductsEntity, (product) => product.invoiceDetails)
  product: ProductsEntity;

  @Column()
  quantity: number;

  @AfterInsert()
  async afterInsert() {
    console.log('Inserted invoice detail with id', this.id);
  }

  @AfterRemove()
  async afterRemove() {
    console.log('Removed invoice detail with id', this.id);
  }
}
