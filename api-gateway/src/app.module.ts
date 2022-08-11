import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BinanceModule } from './binance/binance.module';

@Module({
    imports: [AuthModule, BinanceModule],
})
export class AppModule {}
