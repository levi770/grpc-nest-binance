import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { BINANCE_SERVICE_NAME, GetSpreadResponse, SetSpreadResponse } from './binance.pb'
import { BinanceService } from './binance.service'
import { SetSpreadRequestDto } from './dto/spread.dto'

@Controller('binance')
export class BinanceController {
    constructor(private readonly service: BinanceService) {}

    @GrpcMethod(BINANCE_SERVICE_NAME, 'SetSpread')
    private async setSpread(data: SetSpreadRequestDto): Promise<SetSpreadResponse> {
        return this.service.setSpread(data)
    }

    @GrpcMethod(BINANCE_SERVICE_NAME, 'GetSpread')
    private async getSpread(): Promise<GetSpreadResponse> {
        return this.service.getSpread()
    }
}
