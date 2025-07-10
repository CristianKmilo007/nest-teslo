import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Camiseta Teslo',
    description: 'Título del producto',
    uniqueItems: true,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({
    example: 29.99,
    description: 'Precio del producto',
    default: 0,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    example: 'Camiseta de alta calidad con diseño exclusivo',
    description: 'Descripción del producto',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'camiseta-teslo',
    description: 'Slug único del producto, usado en URLs',
    uniqueItems: true,
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    example: 100,
    description: 'Cantidad en stock del producto',
    default: 0,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    example: ['S', 'M', 'L', 'XL'],
    description: 'Tallas disponibles del producto',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  sizes: string[];

  @ApiProperty({
    example: 'hombre',
    description: 'Género del producto (hombre, mujer, niño, unisex)',
  })
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty({
    example: ['camiseta', 'alta calidad', 'exclusivo'],
    description: 'Etiquetas del producto',
    type: [String],
    default: [],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags: string[];

  @ApiProperty({
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    description: 'Imágenes del producto',
    isArray: true,
    default: [],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
}
