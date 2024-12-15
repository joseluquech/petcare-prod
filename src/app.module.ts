// NestJS
import { Module } from '@nestjs/common'

// Modules
import { AppointmentsModule } from './appointments/appointments.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'
import { OwnersModule } from './owners/owners.module'
import { PetsModule } from './pets/pets.module'
import { UsersModule } from './users/users.module'
import { WorkspacesModule } from './workspaces/workspaces.module'

// Controllers
import { AppController } from './app.controller'

// Config
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: parseInt(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			autoLoadEntities: true,
			synchronize: true,
			ssl: process.env.POSTGRES_SSL === 'true',
			extra: {
				ssl:
					process.env.POSTGRES_SSL === 'true'
						? {
								rejectUnauthorized: false,
							}
						: null,
			},
		}),
		AppointmentsModule,
		AuthModule,
		HttpModule,
		OwnersModule,
		PetsModule,
		UsersModule,
		WorkspacesModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
