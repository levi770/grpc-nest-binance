import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { protobufPackage } from './binance/binance.pb';

async function bootstrap() {
    const app: INestMicroservice = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.GRPC,
        options: {
            url: 'binance-svc:50052',
            package: protobufPackage,
            protoPath: join('node_modules/grpc-nest-binance-proto/proto/binance.proto'),
        },
    });

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    await app.listen();
}

bootstrap();
