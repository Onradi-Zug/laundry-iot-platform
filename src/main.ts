import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation for DTOs: strips unknown properties and transforms payloads to DTO types
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Hide excluded properties (e.g., @Exclude on entities) when serializing responses
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(3000);
}
bootstrap();
