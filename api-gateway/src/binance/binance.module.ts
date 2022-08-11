import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BinanceController } from './binance.controller';
import { BinanceGateway } from './binance.gateway';
import { BINANCE_PACKAGE_NAME, BINANCE_SERVICE_NAME } from './binance.pb';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: BINANCE_SERVICE_NAME,
                transport: Transport.GRPC,
                options: {
                    url: '0.0.0.0:50052',
                    package: BINANCE_PACKAGE_NAME,
                    protoPath: '../proto/binance.proto',
                },
            },
        ]),
    ],
    controllers: [BinanceController],
    providers: [BinanceGateway],
})
export class BinanceModule {}
