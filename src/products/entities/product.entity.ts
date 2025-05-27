import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  title: string;

  @Column('float', {
    default: 0,
  })
  price: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column('text', {
    unique: true,
  })
  slug: string;

  @Column('int', {
    default: 0,
  })
  stock: number;

  @Column('text', {
    array: true,
  })
  sizes: string[];

  @Column('text')
  gender: string;

  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true, // esto es para que me carguen las imagenes relacionadas al momento de buscar un producto por id
  })
  images?: ProductImage[];

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = this.title;

    this.slug = this.slug
      .normalize('NFD')
      .toLocaleLowerCase() // a minúsculas
      .trim() // recorta bordes
      .replace(/[\u0300-\u036f]/g, '') // quita diacríticos
      .replace(/[^a-z0-9\s-]/g, '') // quita todo menos letras, números, espacios y guiones
      .replace(/\s+/g, '-') // espacios ⇒ guiones
      .replace(/-+/g, '-'); // múltiples guiones ⇒ uno solo
  }
}
