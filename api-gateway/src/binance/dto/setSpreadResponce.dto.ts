import { ApiProperty } from '@nestjs/swagger';
import { SetSpreadResponse } from '../binance.pb';

export class SetSpreadResponceDto implements SetSpreadResponse {
    @ApiProperty()
    status: number;

    @ApiProperty()
    error: string[];
}
