import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: `${process.env.DATABASE_HOST}`,
    port: parseInt(process.env.DATABASE_PORT as string, 10) ?? 5432,
    username: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    entities: ["src/**/entities/*.entity{.ts,.js}"],
    migrations: ["database/migrations/*{.ts,.js}"],
    synchronize: false,
};

export default registerAs('typeorm', () => dataSourceOptions)
export const connectionSource = new DataSource(dataSourceOptions as DataSourceOptions);
