import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CustomValidationPipe } from './pipes/CustomValidationPipe';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
// Start app by bootstrap
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Config global JWT Guard- https://github.com/nestjs/nest/issues/964#issuecomment-413563009
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  // Get ConfigService
  const configService = app.get(ConfigService);
  // Error Pipe for validation listener
  app.useGlobalPipes(new CustomValidationPipe());
  //Config CORS
  app.enableCors();
  // Get env variable
  const PORT = configService.get('PORT');
  await app.listen(PORT || 3000);
}

bootstrap();
