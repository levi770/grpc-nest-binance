import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import { JwtService } from './jwt.service'
import { LoginResponse, RegisterResponse, ValidateResponse } from '../auth.pb'
import { InjectModel } from '@nestjs/sequelize'
import { User } from '../model/user.entity'
import { RegisterRequestDto } from '../dto/registerRequest.dto'
import { LoginRequestDto } from '../dto/loginRequest.dto'
import { ValidateRequestDto } from '../dto/validateRequest.dto'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User)
        private readonly userRepo: typeof User,

        @Inject(JwtService)
        private readonly jwtService: JwtService,
    ) {}

    public async register({ email, password }: RegisterRequestDto): Promise<RegisterResponse> {
        try {
            let user: User = await this.userRepo.findOne({ where: { email } })

            if (user) {
                return { status: HttpStatus.CONFLICT, error: ['User with this email already exists'] }
            }

            user = await this.userRepo.create({ email, password: this.jwtService.encodePassword(password) })

            return { status: HttpStatus.CREATED, error: null }
        } catch (error) {
            return { status: HttpStatus.INTERNAL_SERVER_ERROR, error: [error.message] }
        }
    }

    public async login({ email, password }: LoginRequestDto): Promise<LoginResponse> {
        try {
            const user: User = await this.userRepo.findOne({ where: { email } })

            if (!user) {
                return { status: HttpStatus.NOT_FOUND, error: ['User with this email not found'], token: null }
            }

            const isPasswordValid: boolean = this.jwtService.isPasswordValid(password, user.password)

            if (!isPasswordValid) {
                return { status: HttpStatus.NOT_FOUND, error: ['Password wrong'], token: null }
            }

            const token: string = this.jwtService.generateToken(user)

            return { token, status: HttpStatus.OK, error: null }
        } catch (error) {
            return { status: HttpStatus.INTERNAL_SERVER_ERROR, error: [error.message], token: null }
        }
    }

    public async validate({ token }: ValidateRequestDto): Promise<ValidateResponse> {
        try {
            const decoded: User = await this.jwtService.verify(token)

            if (!decoded) {
                return { status: HttpStatus.FORBIDDEN, error: ['Token is invalid'], userId: null }
            }

            const user: User = await this.jwtService.validateUser(decoded)

            if (!user) {
                return { status: HttpStatus.CONFLICT, error: ['User not found'], userId: null }
            }

            return { status: HttpStatus.OK, error: null, userId: decoded.id }
        } catch (error) {
            return { status: HttpStatus.INTERNAL_SERVER_ERROR, error: [error.message], userId: null }
        }
    }
}
