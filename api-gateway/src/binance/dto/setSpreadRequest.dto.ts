import { ApiProperty } from '@nestjs/swagger';
import { SetSpreadRequest } from '../binance.pb';

export class SetSpreadRequestDto implements SetSpreadRequest {
    @ApiProperty()
    spread: number;
}
