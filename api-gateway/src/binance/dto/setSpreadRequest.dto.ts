import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { SetSpreadRequest } from '../binance.pb';

export class SetSpreadRequestDto implements SetSpreadRequest {
    @ApiProperty()
    @IsNumber()
    spread: number;
}
