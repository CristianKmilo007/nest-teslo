import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

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

  await app.listen(process.env.PORT ?? 3100);
  logger.log(`Application is running on port: ${process.env.PORT ?? 3100}`);
}
bootstrap();
