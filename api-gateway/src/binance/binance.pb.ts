/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Empty } from './google/protobuf/empty.pb';

export const protobufPackage = 'binance';

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

export const BINANCE_PACKAGE_NAME = 'binance';

export interface BinanceServiceClient {
    getSpread(request: Empty): Observable<GetSpreadResponse>;

    setSpread(request: SetSpreadRequest): Observable<SetSpreadResponse>;
}

export interface BinanceServiceController {
    getSpread(request: Empty): Promise<GetSpreadResponse> | Observable<GetSpreadResponse> | GetSpreadResponse;

    setSpread(
        request: SetSpreadRequest,
    ): Promise<SetSpreadResponse> | Observable<SetSpreadResponse> | SetSpreadResponse;
}

export function BinanceServiceControllerMethods() {
    return function (constructor: Function) {
        const grpcMethods: string[] = ['getSpread', 'setSpread'];
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
