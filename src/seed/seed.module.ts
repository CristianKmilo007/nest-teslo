import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductsModule } from 'src/products/products.module';

import { Module } from '@nestjs/common';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    ProductsModule
  ],
})
export class SeedModule {}
