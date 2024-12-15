// NestJS
import { Module } from '@nestjs/common'

// Jwt
import { JwtModule } from '@nestjs/jwt'

// Modules
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'

// Controllers
import { AuthController } from './auth.controller'

// Services
import { AuthService } from './auth.service'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: { expiresIn: '1d' },
				global: true,
			}),
			inject: [ConfigService],
		}),
		UsersModule,
	],
	providers: [AuthService],
	controllers: [AuthController],
	exports: [AuthService, JwtModule],
})
export class AuthModule {}
