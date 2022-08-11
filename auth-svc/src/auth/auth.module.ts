import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthController } from './auth.controller'
import { User } from './model/user.entity'
import { AuthService } from './service/auth.service'
import { JwtService } from './service/jwt.service'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get('JWT_SECRET'),
                    expiresIn: configService.get('JWT_EXPIRE'),
                }
            },
            inject: [ConfigService],
        }),
        SequelizeModule.forFeature([User]),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtService, JwtStrategy],
})
export class AuthModule {}
