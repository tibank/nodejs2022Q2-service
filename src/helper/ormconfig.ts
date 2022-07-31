import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  entities: [],
  migrations: ['./src/migrations/*.ts'],
  migrationsRun: true,
  autoLoadEntities: true,
  synchronize: false,
  logNotifications: true,
  logging: true,
  //dropSchema: true,
  retryAttempts: 3,
});
