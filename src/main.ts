import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createOpenAPIdoc } from './utils/createDoc';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .addBearerAuth()
    .addServer('http://localhost:3000', 'localhost')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  createOpenAPIdoc(document);

  await app.listen(3000);
}
bootstrap();
