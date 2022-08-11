import { ApiProperty } from '@nestjs/swagger';
import { RegisterResponse } from '../auth.pb';

export class RegisterResponseDto implements RegisterResponse {
    @ApiProperty()
    status: number;

    @ApiProperty()
    error: string[];
}
