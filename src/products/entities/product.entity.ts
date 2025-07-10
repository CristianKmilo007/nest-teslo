import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from 'src/auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

// Decorador que indica que esta clase es una entidad de base de datos llamada 'products'
@Entity({
  name: 'products',
})
export class Product {
  // Llave primaria de tipo UUID para el producto
  @ApiProperty({
    example: 'd3b2f8c4-5e1a-4c3b-9f2e-8a1b2c3d4e5f',
    description: 'Identificador único del producto',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Título del producto, debe ser único
  @ApiProperty({
    example: 'Camiseta Teslo',
    description: 'Título del producto',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  title: string;

  // Precio del producto, por defecto 0
  @ApiProperty({
    example: 29.99,
    description: 'Precio del producto',
    default: 0,
  })
  @Column('float', {
    default: 0,
  })
  price: number;

  // Descripción del producto, puede ser nula
  @ApiProperty({
    example: 'Camiseta de alta calidad con diseño exclusivo',
    description: 'Descripción del producto',
    required: false,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  // Slug único para el producto (usado en URLs)
  @ApiProperty({
    example: 'camiseta-teslo',
    description: 'Slug único del producto, usado en URLs',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  slug: string;

  // Cantidad en stock, por defecto 0
  @ApiProperty({
    example: 100,
    description: 'Cantidad en stock del producto',
    default: 0,
  })
  @Column('int', {
    default: 0,
  })
  stock: number;

  // Tallas disponibles para el producto (arreglo de strings)
  @ApiProperty({
    example: ['S', 'M', 'L', 'XL'],
    description: 'Tallas disponibles del producto',
    type: [String],
  })
  @Column('text', {
    array: true,
  })
  sizes: string[];

  // Género al que va dirigido el producto
  @ApiProperty({
    example: 'hombre',
    description: 'Género del producto (hombre, mujer)',
    enum: ['hombre', 'mujer'],
  })
  @Column('text')
  gender: string;

  // Etiquetas del producto (arreglo de strings), por defecto vacío
  @ApiProperty({
    example: ['camiseta', 'alta calidad', 'exclusivo'],
    description: 'Etiquetas del producto',
    type: [String],
    default: [],
  })
  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  // Relación uno a muchos con las imágenes del producto
  // Al guardar o actualizar un producto, también se guardan/actualizan sus imágenes (cascade)
  // Al consultar un producto, se traen sus imágenes automáticamente (eager)
  @ApiProperty({
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    description: 'Imágenes del producto',
    isArray: true,
    default: [],
  })
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  // Relación muchos a uno con el usuario que creó el producto
  // Al consultar un producto, se trae el usuario automáticamente (eager)
  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  // Antes de insertar o actualizar, genera el slug a partir del título
  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = this.title;

    this.slug = this.slug
      .normalize('NFD')
      .toLocaleLowerCase() // Convierte a minúsculas
      .trim() // Elimina espacios al inicio y final
      .replace(/[\u0300-\u036f]/g, '') // Elimina acentos y diacríticos
      .replace(/[^a-z0-9\s-]/g, '') // Elimina caracteres especiales
      .replace(/\s+/g, '-') // Reemplaza espacios por guiones
      .replace(/-+/g, '-'); // Reemplaza múltiples guiones por uno solo
  }
}
