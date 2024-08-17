import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
