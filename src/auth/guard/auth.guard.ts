// NestJS
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'

// Express
import { Request } from 'express'

// Jwt
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const token = this.extractTokenFromHeader(request)

		if (!token) throw new UnauthorizedException('Missing or invalid token')

		try {
			const payload = await this.jwtService.verifyAsync(token)
			// 💡 We're assigning the payload to the request object here
			// so that we can access it in our route handlers
			request['user'] = payload
		} catch {
			throw new UnauthorizedException()
		}
		return true
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? []
		return type === 'Bearer' ? token : undefined
	}
}
