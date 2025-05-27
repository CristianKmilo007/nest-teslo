import {
  BadRequestException,
  Controller,
 Get,
 Param,
 /*  FileTypeValidator,
  ParseFilePipe, */
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) {}

  @Get('product/:imageName')
  findProducImage(
    @Res() res: Response,
    @Param('imageName') imageName: string,
  ){

    const imagePath = this.filesService.getStaticProductImage(imageName);

    res.sendFile(imagePath)
  }

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './uploads/products',
        filename: fileNamer
      })
    }),
  )
  uploadProductFile(
    @UploadedFile(
      /* new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType:
              /image\/(jpg|jpeg|png|gif)/, // |application\/(zip|x-rar-compressed) para aceptar archivos zip y rar
          }),
        ]
      }), */
    )
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Make sure that the file is an image.');
    }

    const secureURL = `${this.configService.get('HOST_API')}/files/product/${file.filename}`;

    return { secureURL };
  }
}
