import { WebsocketClient, DefaultLogger } from 'binance';
import { HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Spread } from './model/spread.entity';
import {
    GetSpreadResponse,
    SetSpreadRequest,
    SetSpreadResponse,
    SubscribeFeedRequest,
    UnsubscribeFeedRequest,
    UnsubscribeFeedResponse,
} from './binance.pb';
import { Subject } from 'rxjs';

@Injectable()
export class BinanceService implements OnModuleInit {
    private readonly binanceClient: WebsocketClient;
    private readonly logger = { ...DefaultLogger };
    private feeds = new Map();
    private listeners = new Map();
    private currSpread = 0;

    constructor(
        @InjectModel(Spread)
        private readonly spreadRepo: typeof Spread,
    ) {
        this.binanceClient = new WebsocketClient({ beautify: true }, this.logger);
        this.binanceClient.subscribeSpotSymbol24hrTicker('BTCUSDT');
    }

    async onModuleInit() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [s, _] = await this.spreadRepo.findOrCreate({ where: { name: 'base' } });
        this.currSpread = s.spread ? +s.spread : 0;
    }

    //#region BINANCE

    public async subscribe(request: SubscribeFeedRequest) {
        const feed$ = new Subject<any>();
        this.feeds.set(request.clientId, feed$);

        this.logger.info('Client connected ' + request.clientId);

        const listener = (data: any) => {
            const formatedData = {
                symbol: data.symbol,
                realBid: data.bestBid,
                realAsk: data.bestAskPrice,
                spread: this.currSpread,
                bid: data.bestBid * (1 - this.currSpread / 2 / 100),
                bidVolume: data.bestBidQuantity,
                ask: data.bestAskPrice * (1 + this.currSpread / 2 / 100),
                askVolume: data.bestAskQuantity,
                timestamp: Date.now(),
            };
            //this.logger.info('feed for ' + request.clientId);
            feed$.next(formatedData);
        };

        this.binanceClient.on('formattedMessage', listener);

        this.listeners.set(request.clientId, listener);

        return feed$.asObservable();
    }

    public async unsubscribe(request: UnsubscribeFeedRequest): Promise<UnsubscribeFeedResponse> {
        try {
            const feed: Subject<any> = this.feeds.get(request.clientId);
            this.feeds.delete(request.clientId);
            feed.complete();

            const listener = this.listeners.get(request.clientId);
            this.binanceClient.removeListener('formattedMessage', listener);
            this.listeners.delete(request.clientId);

            this.logger.info('Client disconnected ' + request.clientId);

            return { result: true, error: null };
        } catch (error) {
            return { result: false, error: [error.message] };
        }
    }

    //#endregion

    //#region SPREAD

    public async setSpread(data: SetSpreadRequest): Promise<SetSpreadResponse> {
        try {
            this.currSpread = data.spread;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [s, _] = await this.spreadRepo.findOrCreate({ where: { name: 'base' } });
            s.spread = data.spread;
            await s.save();

            return { status: HttpStatus.OK, error: null };
        } catch (error) {
            return { status: HttpStatus.INTERNAL_SERVER_ERROR, error: [error.message] };
        }
    }

    public async getSpread(): Promise<GetSpreadResponse> {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [s, _] = await this.spreadRepo.findOrCreate({ where: { name: 'base' } });
            this.currSpread = s.spread;

            return { status: HttpStatus.OK, error: null, spread: s.spread };
        } catch (error) {
            return { status: error.INTERNAL_SERVER_ERROR, error: error.message, spread: null };
        }
    }

    //#endregion
}
