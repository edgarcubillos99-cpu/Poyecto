import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Activa la validación automática de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // lanza error si hay propiedades no esperadas
      transform: true, // convierte automáticamente a las clases DTO
    }),
  );

  // 🔧 Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Carshop')
    .setDescription('Documentación de la API del proyecto Carshop')
    .setVersion('1.0')
    .addBearerAuth() // para JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 👈 URL: http://localhost:3000/api

  await app.listen(3000);
  console.log('🚀 Swagger listo en http://localhost:3000/api');
}

bootstrap();