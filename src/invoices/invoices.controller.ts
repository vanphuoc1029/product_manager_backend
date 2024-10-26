import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  ParseArrayPipe,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dtos/invoice.dto';
import { NonEmptyArrayPipe } from './invoices.pipe';

@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  // Add CRUD methods here
  @Get()
  async getAllInvoices() {
    return await this.invoicesService.getAllInvoices();
  }

  @Get('/:id')
  async getDetailInvoice(@Param('id') id: string) {
    return await this.invoicesService.getInvoiceDetail(id);
  }

  @Post()
  async createInvoice(
    @Body(
      new ParseArrayPipe({ items: CreateInvoiceDto, whitelist: true }),
      NonEmptyArrayPipe,
    )
    createInvoiceBody: CreateInvoiceDto[],
  ) {
    return await this.invoicesService.createInvoice(createInvoiceBody);
  }

  @Delete('/:id')
  async deleteInvoice(@Param('id') id: string) {
    return await this.invoicesService.deleteInvoice(parseInt(id));
  }

  @Patch('/:id')
  async updateInvoice(
    @Param('id') id: string,
    @Body() updateInvoiceBody: CreateInvoiceDto[],
  ) {
    return await this.invoicesService.updateInvoice(
      parseInt(id),
      updateInvoiceBody,
    );
  }
}
