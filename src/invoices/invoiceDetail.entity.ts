import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
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
}
