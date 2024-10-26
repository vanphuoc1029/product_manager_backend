import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { InvoiceDetailEntity } from './invoiceDetail.entity';

@Entity('invoices')
export class InvoiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createAt: Date;

  @OneToMany(
    () => InvoiceDetailEntity,
    (invoiceDetail) => invoiceDetail.invoice,
  )
  invoiceDetails: InvoiceDetailEntity[];
}
