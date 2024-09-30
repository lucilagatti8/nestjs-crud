// src/products/dto/create-product.dto.ts
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty() // Asegura que sea obligatorio
  @IsString() // Asegura que sea una cadena
  name: string;

  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber() //hace que sea un num
  price: number;

  @IsOptional() //hace que sea opcional
  @IsString()
  imageURL?: string;

  @IsNotEmpty()
  shelf?: string;
}
