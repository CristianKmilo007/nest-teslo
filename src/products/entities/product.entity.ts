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

// Decorador que indica que esta clase es una entidad de base de datos llamada 'products'
@Entity({
  name: 'products',
})
export class Product {
  // Llave primaria de tipo UUID para el producto
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Título del producto, debe ser único
  @Column('text', {
    unique: true,
  })
  title: string;

  // Precio del producto, por defecto 0
  @Column('float', {
    default: 0,
  })
  price: number;

  // Descripción del producto, puede ser nula
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  // Slug único para el producto (usado en URLs)
  @Column('text', {
    unique: true,
  })
  slug: string;

  // Cantidad en stock, por defecto 0
  @Column('int', {
    default: 0,
  })
  stock: number;

  // Tallas disponibles para el producto (arreglo de strings)
  @Column('text', {
    array: true,
  })
  sizes: string[];

  // Género al que va dirigido el producto
  @Column('text')
  gender: string;

  // Etiquetas del producto (arreglo de strings), por defecto vacío
  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  // Relación uno a muchos con las imágenes del producto
  // Al guardar o actualizar un producto, también se guardan/actualizan sus imágenes (cascade)
  // Al consultar un producto, se traen sus imágenes automáticamente (eager)
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
