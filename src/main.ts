import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Port')

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      /* transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }, */
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Teslo Restful API')
    .setDescription('Teslo shop endpoints')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3100);
  logger.log(`Application is running on port: ${process.env.PORT ?? 3100}`);
}
bootstrap();
