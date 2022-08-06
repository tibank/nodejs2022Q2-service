import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  entities: [],
  //migrations: ['./src/migrations/*.ts'],
  migrationsRun: false,
  autoLoadEntities: true,
  synchronize: true,
  logNotifications: true,
  logging: false,
  dropSchema: false,
  retryAttempts: 3,
});
