import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * Cross-origin resource sharing (CORS) is a mechanism that allows resources to be requested from another domain.
   */
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
