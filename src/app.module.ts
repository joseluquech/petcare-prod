// NestJS
import { Module } from '@nestjs/common'

// Modules
import { AppointmentsModule } from './appointments/appointments.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { HttpModule } from '@nestjs/axios'
import { OwnersModule } from './owners/owners.module'
import { PetsModule } from './pets/pets.module'
import { UsersModule } from './users/users.module'
import { WorkspacesModule } from './workspaces/workspaces.module'

// Controllers
import { AppController } from './app.controller'

// Config
import { enviroments } from './config/enviroments'
import config from './config/config'
import configSchema from './config/configSchema'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: enviroments[process.env.NODE_ENV] || '.env',
			load: [config],
			isGlobal: true,
			validationSchema: configSchema,
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
		DatabaseModule,
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
