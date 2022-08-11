import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';
import { RegisterRequest } from '../auth.pb';

export class RegisterRequestDto implements RegisterRequest {
    @ApiProperty()
    @IsEmail({}, { message: 'must be a valid email' })
    email: string;

    @ApiProperty()
    @MinLength(8, { message: 'must be 8 or more symbols' })
    password: string;
}
