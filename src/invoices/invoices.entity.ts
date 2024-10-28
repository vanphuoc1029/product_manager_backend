import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  AfterInsert,
  AfterRemove,
} from 'typeorm';
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

  @AfterInsert()
  async afterInsert() {
    console.log('Inserted invoice with id', this.id);
  }

  @AfterRemove()
  async afterRemove() {
    console.log('Removed invoice with id', this.id);
  }
}
