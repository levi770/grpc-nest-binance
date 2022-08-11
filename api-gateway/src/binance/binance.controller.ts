import { Controller, Inject, Post, UseGuards, Body, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from '../common/guard/auth.guard';
import { SetSpreadRequestDto } from './dto/setSpreadRequest.dto';
import { SetSpreadResponceDto } from './dto/setSpreadResponce.dto';
import { GetSpreadResponceDto } from './dto/getSpreadResponce.dto';
import { BinanceServiceClient, BINANCE_SERVICE_NAME } from './binance.pb';

@ApiTags('Binance')
@Controller('binance')
export class BinanceController {
    private svc: BinanceServiceClient;

    constructor(
        @Inject(BINANCE_SERVICE_NAME)
        private readonly client: ClientGrpc,
    ) {
        this.svc = this.client.getService<BinanceServiceClient>(BINANCE_SERVICE_NAME);
    }

    @ApiOperation({ summary: 'GET SPREAD' })
    @ApiResponse({ type: GetSpreadResponceDto })
    @ApiSecurity('Authorization', ['Authorization'])
    @Get('spread')
    @UseGuards(AuthGuard)
    private async getSpread(): Promise<Observable<GetSpreadResponceDto>> {
        return this.svc.getSpread({});
    }

    @ApiOperation({ summary: 'SET SPREAD' })
    @ApiResponse({ type: SetSpreadResponceDto })
    @ApiSecurity('Authorization', ['Authorization'])
    @Post('spread')
    @UseGuards(AuthGuard)
    private async setSpread(@Body() body: SetSpreadRequestDto): Promise<Observable<SetSpreadResponceDto>> {
        return this.svc.setSpread(body);
    }
}
