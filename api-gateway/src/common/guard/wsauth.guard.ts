import { Injectable, CanActivate, ExecutionContext, HttpStatus, Inject } from '@nestjs/common';
import { ValidateResponse } from '../../auth/auth.pb';
import { AuthService } from '../../auth/auth.service';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsAuthGuard implements CanActivate {
    constructor(
        @Inject(AuthService)
        public readonly service: AuthService,
    ) {}

    public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
        const client: Socket = ctx.switchToWs().getClient();
        const authorization: any = client.handshake.headers['authorization'];

        if (!authorization) {
            throw new WsException('Unauthorized.');
        }

        const bearer: string[] = authorization.split(' ');

        if (!bearer || bearer.length < 2) {
            throw new WsException('Unauthorized.');
        }

        const token: string = bearer[1];

        const { status, userId }: ValidateResponse = await this.service.validate(token);

        if (status !== HttpStatus.OK) {
            throw new WsException('Internal error.');
        }

        if (!userId) {
            throw new WsException('Invalid credentials.');
        }
        client.data['user'] = userId;

        return true;
    }
}
