import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceEntity } from './invoices.entity';
import { InvoiceDetailEntity } from './invoiceDetail.entity';
import { CreateInvoiceDto } from './dtos/invoice.dto';
import { ProductsEntity } from '../products/products.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private invoiceRepo: Repository<InvoiceEntity>,
    @InjectRepository(InvoiceDetailEntity)
    private invoiceDetailRepo: Repository<InvoiceDetailEntity>,
    @InjectRepository(ProductsEntity)
    private productRepo: Repository<ProductsEntity>,
  ) {}

  async getAllInvoices() {
    return await this.invoiceRepo.find();
  }

  async getInvoiceDetail(id: string) {
    const invoiceDetail = await this.invoiceDetailRepo
      .createQueryBuilder('invoiceDetail')
      .select([
        'product.id',
        'product.name',
        'invoiceDetail.quantity',
        'product.price',
        'invoice.createAt',
        'product.category',
        'product.description',
        'invoice.createAt',
      ])
      .innerJoin('invoiceDetail.invoice', 'invoice')
      .innerJoin('invoiceDetail.product', 'product')
      .where('invoice.id = :id', { id })
      .getMany();
    return invoiceDetail;
  }

  async createInvoice(createInvoiceBody: CreateInvoiceDto[]) {
    const invoice = new InvoiceEntity();
    invoice.createAt = new Date();
    await this.invoiceRepo.save(invoice);
    createInvoiceBody.forEach(async (productQuantity) => {
      const invoiceDetail = new InvoiceDetailEntity();
      invoiceDetail.invoice = invoice;
      const product = await this.productRepo.findOne({
        where: { id: productQuantity.productId },
      });
      invoiceDetail.product = product;
      invoiceDetail.quantity = productQuantity.quantity;
      await this.invoiceDetailRepo.save(invoiceDetail);
    });
    return invoice;
  }

  async deleteInvoice(id: number) {
    const invoice = await this.invoiceRepo.findOne({ where: { id } });
    const invoiceDetail = await this.invoiceDetailRepo.find({
      where: { invoice },
    });
    await this.invoiceDetailRepo.remove(invoiceDetail);
    await this.invoiceRepo.remove(invoice);
  }

  async updateInvoice(id: number, updateInvoiceBody: CreateInvoiceDto[]) {
    const invoice = await this.invoiceRepo.findOne({ where: { id } });
    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }
    const invoiceDetail = await this.invoiceDetailRepo.find({
      where: { invoice },
    });
    await this.invoiceDetailRepo.remove(invoiceDetail);
    updateInvoiceBody.forEach(async (productQuantity) => {
      const invoiceDetail = new InvoiceDetailEntity();
      invoiceDetail.invoice = invoice;
      const product = await this.productRepo.findOne({
        where: { id: productQuantity.productId },
      });
      invoiceDetail.product = product;
      invoiceDetail.quantity = productQuantity.quantity;
      await this.invoiceDetailRepo.save(invoiceDetail);
    });
    return invoice;
  }
}
