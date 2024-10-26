import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  id: string;

  @IsString()
  category: string;

  @IsNumber()
  stock: number;

  @IsString()
  name: string;

  @IsString()
  price: number;

  @IsString()
  description: string;
}
