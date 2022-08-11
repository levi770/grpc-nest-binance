import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BinanceService } from './binance.service';
import { BinanceController } from './binance.controller';
import { Spread } from './model/spread.entity';

@Module({
    imports: [SequelizeModule.forFeature([Spread])],
    controllers: [BinanceController],
    providers: [BinanceService],
})
export class BinanceModule {}
