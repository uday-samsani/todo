import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppDataSource } from './app.datasource';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await AppDataSource.initialize();
    const config = new DocumentBuilder()
        .setTitle('Todo API')
        .setDescription('The Todo List API Documnentation')
        .setVersion('1.0')
        .addTag('todo')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}

bootstrap();
