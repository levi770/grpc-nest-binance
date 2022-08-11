import { ApiProperty } from '@nestjs/swagger';
import { LoginResponse } from '../auth.pb';

export class LoginResponseDto implements LoginResponse {
    @ApiProperty()
    status: number;

    @ApiProperty()
    error: string[];

    @ApiProperty()
    token: string;
}
