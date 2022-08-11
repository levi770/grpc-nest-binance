/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'binance';

export interface Empty {}

export interface GetSpreadResponse {
    status: number;
    error: string[];
    spread: number;
}

export interface SetSpreadRequest {
    spread: number;
}

export interface SetSpreadResponse {
    status: number;
    error: string[];
}

export interface SubscribeFeedRequest {
    market: string;
    clientId: string;
}

export interface SubscribeFeedResponse {
    symbol: string;
    realBid: number;
    realAsk: number;
    spread: number;
    bid: number;
    bidVolume: number;
    ask: number;
    askVolume: number;
    timestamp: number;
}

export interface UnsubscribeFeedRequest {
    clientId: string;
}

export interface UnsubscribeFeedResponse {
    result: boolean;
    error: string[];
}

export const BINANCE_PACKAGE_NAME = 'binance';

export interface BinanceServiceClient {
    getSpread(request: Empty): Observable<GetSpreadResponse>;

    setSpread(request: SetSpreadRequest): Observable<SetSpreadResponse>;

    subscribeFeed(request: SubscribeFeedRequest): Observable<SubscribeFeedResponse>;

    unsubscribeFeed(request: UnsubscribeFeedRequest): Observable<UnsubscribeFeedResponse>;
}

export interface BinanceServiceController {
    getSpread(request: Empty): Promise<GetSpreadResponse> | Observable<GetSpreadResponse> | GetSpreadResponse;

    setSpread(
        request: SetSpreadRequest,
    ): Promise<SetSpreadResponse> | Observable<SetSpreadResponse> | SetSpreadResponse;

    subscribeFeed(request: SubscribeFeedRequest): Observable<SubscribeFeedResponse>;

    unsubscribeFeed(
        request: UnsubscribeFeedRequest,
    ): Promise<UnsubscribeFeedResponse> | Observable<UnsubscribeFeedResponse> | UnsubscribeFeedResponse;
}

export function BinanceServiceControllerMethods() {
    return function (constructor: Function) {
        const grpcMethods: string[] = ['getSpread', 'setSpread', 'subscribeFeed', 'unsubscribeFeed'];
        for (const method of grpcMethods) {
            const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            GrpcMethod('BinanceService', method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods: string[] = [];
        for (const method of grpcStreamMethods) {
            const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            GrpcStreamMethod('BinanceService', method)(constructor.prototype[method], method, descriptor);
        }
    };
}

export const BINANCE_SERVICE_NAME = 'BinanceService';
