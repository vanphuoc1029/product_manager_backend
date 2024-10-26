import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  quantity: number;
}
