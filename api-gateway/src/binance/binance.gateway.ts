import { Inject, Logger, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { BinanceServiceClient, BINANCE_SERVICE_NAME, SubscribeFeedResponse } from './binance.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { WsAuthGuard } from '../common/guard/wsauth.guard';
import { Observable } from 'rxjs';

@WebSocketGateway(5001, {
    namespace: 'binance',
    cors: {
        origin: '*',
    },
})
export class BinanceGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private svc: BinanceServiceClient;
    private logger: Logger = new Logger('AppGateway');
    private connections = new Map();
    @WebSocketServer() private wss: Server;

    constructor(
        @Inject(BINANCE_SERVICE_NAME)
        private readonly client: ClientGrpc,
    ) {
        this.svc = this.client.getService<BinanceServiceClient>(BINANCE_SERVICE_NAME);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    afterInit(_server: Server) {
        this.logger.log('Initialized .....');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
        this.connections.set(client.id, { market: null });
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
        this.svc.unsubscribeFeed({ clientId: client.id });
        this.connections.delete(client.id);
    }

    @UseGuards(WsAuthGuard)
    @SubscribeMessage('ticker')
    handleMessage(client: Socket, payload: string): void | WsResponse<string> {
        const clientConnnection = this.connections.get(client.id);

        if (clientConnnection.market) {
            return { event: 'ticker', data: 'You already have subscription ' };
        }

        if (payload != 'BTCUSDT') {
            return { event: 'ticker', data: 'Only BTCUSDT supported.' };
        }

        clientConnnection.market = payload;

        const marketFeed: Observable<SubscribeFeedResponse> = this.svc.subscribeFeed({
            market: payload,
            clientId: client.id,
        });

        marketFeed.subscribe({
            next: (feedItem) => {
                console.log(feedItem);
                client.emit('ticker', feedItem);
            },
        });
    }
}
