import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // Serve static files from /uploads
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
      prefix: '/uploads/',
    });

    // Enable CORS
    app.enableCors();

    // Global validation pipe
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
    }));

    // Swagger configuration
    const config = new DocumentBuilder()
        .setTitle('Study Buddy API')
        .setDescription('The Study Buddy API documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT || 3000);
}
bootstrap(); 