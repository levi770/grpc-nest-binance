import { Body, Controller, Inject, Post, Put } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { AuthServiceClient, AUTH_SERVICE_NAME } from './auth.pb';
import { LoginRequestDto } from './dto/loginRequest.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { RegisterRequestDto } from './dto/registerRequest.dto';
import { RegisterResponseDto } from './dto/registerResponse.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    private svc: AuthServiceClient;

    constructor(
        @Inject(AUTH_SERVICE_NAME)
        private readonly client: ClientGrpc,
    ) {
        this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    }

    @ApiOperation({ summary: 'REGISTER' })
    @ApiResponse({ type: RegisterResponseDto })
    @Post('register')
    private async register(@Body() body: RegisterRequestDto): Promise<Observable<RegisterResponseDto>> {
        return this.svc.register(body);
    }

    @ApiOperation({ summary: 'LOGIN' })
    @ApiResponse({ type: LoginResponseDto })
    @Put('login')
    private async login(@Body() body: LoginRequestDto): Promise<Observable<LoginResponseDto>> {
        return this.svc.login(body);
    }
}
