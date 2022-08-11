import { IsNumber } from 'class-validator'
import { SetSpreadRequest } from '../binance.pb'

export class SetSpreadRequestDto implements SetSpreadRequest {
    @IsNumber()
    public spread: number
}
