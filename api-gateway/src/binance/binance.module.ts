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
                    url: 'binance-svc:50052',
                    package: BINANCE_PACKAGE_NAME,
                    protoPath: 'node_modules/grpc-nest-binance-proto/proto/binance.proto',
                },
            },
        ]),
    ],
    controllers: [BinanceController],
    providers: [BinanceGateway],
})
export class BinanceModule {}
