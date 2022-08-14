import { Inject, Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { BinanceServiceClient, BINANCE_SERVICE_NAME, SubscribeFeedResponse } from './binance.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

type connectionData = {
    marketFeed?: Observable<SubscribeFeedResponse>;
    userId: string;
    market: string;
};

@WebSocketGateway(5001, {
    namespace: 'binance',
    cors: {
        origin: '*',
    },
})
export class BinanceGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private svc: BinanceServiceClient;
    private logger: Logger = new Logger('AppGateway');
    private connections = new Map<string, connectionData>();
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

        const connection: connectionData = {
            userId: client.data['user'],
            market: null,
        };

        const ticker = client.handshake.query.ticker;

        if (ticker != 'BTCUSDT') {
            return { event: 'feed', data: 'Only BTCUSDT supported.' };
        }

        connection.market = ticker;

        this.connections.set(client.id, { userId: client.data['user'], market: null });

        // can be implemented multiple assets feeds
        const marketFeed: Observable<SubscribeFeedResponse> = this.svc.subscribeFeed({
            market: ticker,
            clientId: client.id,
        });

        marketFeed.subscribe({
            next: (feedItem) => {
                //this.logger.log('feedItem for ' + client.id);
                client.emit('feed', feedItem);
            },
        });
    }

    handleDisconnect(client: Socket) {
        this.svc.unsubscribeFeed({ clientId: client.id }).subscribe({
            next: (res) => {
                this.logger.log(res.result ? `Client ${client.id} disconnected` : res);
            },
        });
        this.connections.delete(client.id);
    }
}
