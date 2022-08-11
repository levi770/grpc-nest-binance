import { IsEmail, IsString, MinLength } from 'class-validator'
import { LoginRequest } from '../auth.pb'

export class LoginRequestDto implements LoginRequest {
    @IsEmail({}, { message: 'must be valid email' })
    email: string

    @IsString()
    @MinLength(8, { message: 'must bemore than 8 symbols' })
    password: string
}
