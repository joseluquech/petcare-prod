// NestJS
import { Module } from '@nestjs/common'

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm'

// Controllers
import { OwnersController } from './owners.controller'

// Services
import { OwnersService } from './owners.service'

// Entities
import { Owner } from './entities/owner.entity'
import { AuthModule } from 'src/auth/auth.module'

@Module({
	imports: [TypeOrmModule.forFeature([Owner]), AuthModule],
	controllers: [OwnersController],
	providers: [OwnersService],
	exports: [TypeOrmModule],
})
export class OwnersModule {}
