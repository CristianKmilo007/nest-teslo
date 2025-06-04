import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

// Decorador que indica que esta clase es una entidad de base de datos llamada 'product_images'
@Entity({
  name: 'product_images',
})
export class ProductImage {

  // Llave primaria autoincremental para la imagen
  @PrimaryGeneratedColumn()
  id: number;

  // Columna de tipo texto que almacena la URL de la imagen
  @Column('text')
  url: string

  // Relación muchos a uno con la entidad Product.
  // Muchas imágenes pueden pertenecer a un solo producto.
  // Si el producto se elimina, también se eliminan sus imágenes (CASCADE).
  @ManyToOne(
    () => Product,
    (product) => product.images,
    { onDelete: 'CASCADE' }
  )
  // Indica que la columna 'product_id' es la clave foránea que referencia a Product
  @JoinColumn({ name: 'product_id' })
  product: Product

}