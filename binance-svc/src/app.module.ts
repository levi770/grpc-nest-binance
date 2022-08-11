import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { BinanceModule } from './binance/binance.module';
import { Spread } from './binance/model/spread.entity';

@Module({
    imports: [
        ConfigModule.forRoot(),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [Spread],
            autoLoadModels: true,
            synchronize: true,
            logging: true,
        }),
        BinanceModule,
    ],
})
export class AppModule {}
