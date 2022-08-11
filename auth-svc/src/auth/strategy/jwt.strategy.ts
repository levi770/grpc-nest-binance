import { Injectable, Inject } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from '../model/user.entity'
import { JwtService } from '../service/jwt.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(JwtService)
        public readonly jwtService: JwtService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'JWT_SECRET',
            ignoreExpiration: false,
        })
    }

    private validate(token: string): Promise<User | never> {
        return this.jwtService.validateUser(token)
    }
}
