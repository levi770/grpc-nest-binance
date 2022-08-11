import { IsEmail, IsString, MinLength } from 'class-validator'
import { RegisterRequest } from '../auth.pb'

export class RegisterRequestDto implements RegisterRequest {
    @IsEmail({}, { message: 'must be valid email' })
    email: string

    @IsString()
    @MinLength(8, { message: 'must bemore than 8 symbols' })
    password: string
}
