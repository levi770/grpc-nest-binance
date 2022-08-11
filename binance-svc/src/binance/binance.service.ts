import { WebsocketClient, DefaultLogger } from 'binance'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Spread } from './model/spread.entity'
import { GetSpreadResponse, SetSpreadResponse } from './binance.pb'
import { SetSpreadRequestDto } from './dto/spread.dto'

@Injectable()
export class BinanceService {
    private readonly binanceClient: WebsocketClient
    private readonly logger = { ...DefaultLogger }
    private currSpread = 0

    constructor(
        @InjectModel(Spread)
        private readonly spreadRepo: typeof Spread,
    ) {
        this.binanceClient = new WebsocketClient({ beautify: true }, this.logger)
        this.init()
    }

    //#region BINANCE

    public async init() {
        this.binanceClient.on('open', (data) => {
            console.log('connection opened open:', data.wsKey, data.ws.target.url)
        })

        this.binanceClient.on('reconnecting', (data) => {
            console.log('ws automatically reconnecting.... ', data?.wsKey)
        })

        this.binanceClient.on('reconnected', (data) => {
            console.log('ws has reconnected ', data?.wsKey)
        })

        this.binanceClient.on('formattedMessage', (data: any) => {
            const formatedData = {
                symbol: data.symbol,
                realBid: data.bestBid,
                bid: data.bestBid * (1 - this.currSpread / 100),
                bidVolume: data.bestBidQuantity,
                ask: data.bestAskPrice * (1 + this.currSpread / 100),
                askVolume: data.bestAskQuantity,
                timestamp: data.eventTime,
            }
            console.log(formatedData)
        })

        this.binanceClient.subscribeSpotSymbol24hrTicker('BTCUSDT')
    }

    //#endregion

    //#region SPREAD

    public async setSpread(data: SetSpreadRequestDto): Promise<SetSpreadResponse> {
        try {
            this.currSpread = data.spread
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [s, _] = await this.spreadRepo.findOrCreate({ where: { name: 'base' } })
            s.spread = data.spread
            await s.save()

            return { status: HttpStatus.OK, error: null }
        } catch (error) {
            return { status: HttpStatus.INTERNAL_SERVER_ERROR, error: [error.message] }
        }
    }

    public async getSpread(): Promise<GetSpreadResponse> {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [s, _] = await this.spreadRepo.findOrCreate({ where: { name: 'base' } })
            this.currSpread = s.spread

            return { status: HttpStatus.OK, error: null, spread: s.spread }
        } catch (error) {
            return { status: error.INTERNAL_SERVER_ERROR, error: error.message, spread: null }
        }
    }

    //#endregion
}
