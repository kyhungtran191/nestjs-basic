import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
// Start app by bootstrap
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get ConfigService
  const configService = app.get(ConfigService);
  // Get env variable
  const PORT = configService.get('PORT');
  await app.listen(PORT || 3000);
}
bootstrap();
