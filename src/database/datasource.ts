import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
dotenv.config();

export const MySQLDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ['**/*.entity.js'],
    synchronize: false,
    migrations: ['src/migrations/**/*{.ts,.js}'],
  });
