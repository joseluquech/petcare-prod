// NestJS
import { Module } from '@nestjs/common'

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm'

// Controllers
import { AppointmentsController } from './appointments.controller'

// Services
import { AppointmentsService } from './appointments.service'

// Entities
import { Appointment } from './entities/appointment.entity'
import { User } from 'src/users/entities/user.entity'
import { Pet } from 'src/pets/entities/pet.entity'
import { AuthModule } from 'src/auth/auth.module'

@Module({
	imports: [TypeOrmModule.forFeature([Appointment, User, Pet]), AuthModule],
	controllers: [AppointmentsController],
	providers: [AppointmentsService],
	exports: [TypeOrmModule],
})
export class AppointmentsModule {}
