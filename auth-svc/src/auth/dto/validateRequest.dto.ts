import { IsString } from 'class-validator'
import { ValidateRequest } from '../auth.pb'

export class ValidateRequestDto implements ValidateRequest {
    @IsString()
    token: string
}
