import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    allowedHeaders: '*'
  });
  await app.listen(3000, '0.0.0.0');
}
bootstrap();