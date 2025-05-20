import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { DatabaseError } from 'pg-protocol';

import { Product } from './entities/product.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.productRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(term: string) {
    let product: Product | null;

    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term });
    } else {
      // product = await this.productRepository.findOneBy({ slug: id }) // Si se quisiera buscar por slug o cualquier otro campo

      const queryBuilder = this.productRepository.createQueryBuilder();

      // ILIKE es un operador de comparación que actúa como =, pero no distingue entre mayúsculas y minúsculas.
      // % es un comodín que representa cero o más caracteres. Además, se utiliza para buscar cualquier cadena que contenga el valor especificado.
      product = await queryBuilder
        .where('title ILIKE :title or slug ILIKE :slug', {
          title: `%${term}%`,
          slug: `%${term}%`,
        })
        .getOne(); // se utiliza getOne() para obtener solo un resultado, si quiero obtener mas de uno no agrego esa funcion
    }

    if (!product) throw new NotFoundException(`Product with ${term} not found`);

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    try {
      const product = await this.productRepository.preload({
        id: id,
        ...updateProductDto
      })
  
      if (!product) throw new NotFoundException(`Product with id ${id} not found`);
  
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  private handleDBExceptions(error: DatabaseError) {
    this.logger.error(error.message);

    if (error.code === '23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
