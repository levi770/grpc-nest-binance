import { Injectable, CanActivate, ExecutionContext, HttpStatus, UnauthorizedException, Inject } from '@nestjs/common';
import { RequestWithUser } from '../interface/reqWithUser.interface';
import { ValidateResponse } from '../../auth/auth.pb';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(AuthService)
        public readonly service: AuthService,
    ) {}

    public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
        const req: RequestWithUser = ctx.switchToHttp().getRequest();
        const authorization: string = req.headers['authorization'];

        if (!authorization) {
            throw new UnauthorizedException();
        }

        const bearer: string[] = authorization.split(' ');

        if (!bearer || bearer.length < 2) {
            throw new UnauthorizedException();
        }

        const token: string = bearer[1];

        const { status, userId }: ValidateResponse = await this.service.validate(token);

        req.user = userId;

        if (status !== HttpStatus.OK) {
            throw new UnauthorizedException();
        }

        return true;
    }
}
