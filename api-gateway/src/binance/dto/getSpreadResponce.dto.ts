import { ApiProperty } from '@nestjs/swagger';
import { GetSpreadResponse } from '../binance.pb';

export class GetSpreadResponceDto implements GetSpreadResponse {
    @ApiProperty()
    status: number;

    @ApiProperty()
    error: string[];

    @ApiProperty()
    spread: number;
}
