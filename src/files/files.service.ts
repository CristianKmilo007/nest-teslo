import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  getStaticProductImage(imageName: string) {
    const path = join(__dirname, '../../uploads/products', imageName);

    if (!existsSync)
      throw new BadRequestException(`The image ${imageName} does not exist`);

    return path;
  }
}
