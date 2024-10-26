import { Module } from '@nestjs/common';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceEntity } from './invoices.entity';
import { InvoiceDetailEntity } from './invoiceDetail.entity';
import { ProductsEntity } from 'src/products/products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InvoiceEntity,
      InvoiceDetailEntity,
      ProductsEntity,
    ]),
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
