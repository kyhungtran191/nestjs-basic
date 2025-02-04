import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { CustomValidationPipe } from './pipes/CustomValidationPipe';
// Start app by bootstrap
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get ConfigService
  const configService = app.get(ConfigService);
  // Error Pipe for validation listener
  app.useGlobalPipes(new CustomValidationPipe());
  // Get env variable
  const PORT = configService.get('PORT');
  await app.listen(PORT || 3000);
}
bootstrap();
