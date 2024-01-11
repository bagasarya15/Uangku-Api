import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

async function bootstrap() {
  config();

  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Aktifkan ValidationPipe secara global
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => {
    console.log(`Server run on port ${port}`);
  });
}
bootstrap();
