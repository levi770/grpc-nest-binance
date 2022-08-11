import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './common/pipe/validation.pipe';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

    app.register(helmet, {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [`'self'`],
                styleSrc: [`'self'`, `'unsafe-inline'`],
                imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
                scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
            },
        },
    });

    app.register(cors, {
        origin: true,
        credentials: true,
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'X-HTTP-Method-Override',
            'Accept',
            'Content-Type',
            'Authorization',
        ],
        methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    });

    app.useGlobalPipes(new ValidationPipe());

    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
        .addApiKey(
            {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
                description: 'ex: "Bearer <YOUR_JWT_TOKEN>"',
            },
            'Authorization',
        )
        .setTitle('BINANCE-API-GATEWAY')
        .setDescription(`REST API documentation & testing interface`)
        .setVersion('v0.0.1')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);

    await app.listen(5000, '127.0.0.1', async () => console.log(`Server started on port ${await app.getUrl()}`));
}
bootstrap();
