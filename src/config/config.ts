import { registerAs } from '@nestjs/config'

export default registerAs('config', () => {
	return {
		postgres: {
			database: process.env.POSTGRES_DB,
			user: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			port: Number(process.env.POSTGRES_PORT),
			host: process.env.POSTGRES_HOST,
			ssl: process.env.POSTGRES_SSL === 'true',
			extra: {
				ssl:
					process.env.POSTGRES_SSL === 'true'
						? {
								rejectUnauthorized: false,
							}
						: null,
			},
		},
		nestPort: Number(process.env.NEST_PORT),
	}
})
