import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
    BINANCE_SERVICE_NAME,
    GetSpreadResponse,
    SetSpreadRequest,
    SetSpreadResponse,
    SubscribeFeedRequest,
    SubscribeFeedResponse,
    UnsubscribeFeedRequest,
    UnsubscribeFeedResponse,
} from './binance.pb';
import { BinanceService } from './binance.service';

@Controller('binance')
export class BinanceController {
    constructor(private readonly service: BinanceService) {}

    @GrpcMethod(BINANCE_SERVICE_NAME, 'SetSpread')
    private async setSpread(data: SetSpreadRequest): Promise<SetSpreadResponse> {
        return this.service.setSpread(data);
    }

    @GrpcMethod(BINANCE_SERVICE_NAME, 'GetSpread')
    private async getSpread(): Promise<GetSpreadResponse> {
        return this.service.getSpread();
    }

    @GrpcMethod(BINANCE_SERVICE_NAME, 'UnsubscribeFeed')
    private async unsubscribeFeed(request: UnsubscribeFeedRequest): Promise<UnsubscribeFeedResponse> {
        return this.service.unsubscribe(request);
    }

    @GrpcMethod(BINANCE_SERVICE_NAME, 'SubscribeFeed')
    private async subscribeFeed(request: SubscribeFeedRequest): Promise<Observable<SubscribeFeedResponse>> {
        return this.service.subscribe(request);
    }
}
