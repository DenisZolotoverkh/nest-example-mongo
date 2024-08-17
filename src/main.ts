import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // TODO separate into configs
  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('NestExample')
        .setDescription('NestExample Documentation')
        .setVersion('0.1.2')
        .addTag('NestMongoExample')
        .build(),
    ),
  );
  await app.listen(3000);
}

bootstrap().catch((error) => {
  console.error('Startup failed', error);
  process.exit(1);
});
