import * as bcrypt from 'bcryptjs'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService as Jwt } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/sequelize'
import { User } from '../model/user.entity'

@Injectable()
export class JwtService {
    private readonly jwt: Jwt

    constructor(
        @InjectModel(User)
        private readonly repository: typeof User,
        private readonly configService: ConfigService,
        jwt: Jwt,
    ) {
        this.jwt = jwt
    }

    // Decoding the JWT Token
    public async decode(token: string): Promise<unknown> {
        return this.jwt.decode(token, null)
    }

    // Get User by User ID we get from decode()
    public async validateUser(decoded: any): Promise<User> {
        return this.repository.findOne(decoded.id)
    }

    // Generate JWT Token
    public generateToken(user: User): string {
        return this.jwt.sign({ id: user.id, email: user.email })
    }

    // Validate User's password
    public isPasswordValid(password: string, userPassword: string): boolean {
        return bcrypt.compareSync(password, userPassword)
    }

    // Encode User's password
    public encodePassword(password: string): string {
        const salt: string = bcrypt.genSaltSync(10)

        return bcrypt.hashSync(password, salt)
    }

    // Validate JWT Token, throw forbidden error if JWT Token is invalid
    public async verify(token: string): Promise<any> {
        try {
            return this.jwt.verify(token)
        } catch (err) {}
    }
}
