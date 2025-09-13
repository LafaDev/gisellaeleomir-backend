import 'dotenv/config';
import type { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER || 'raziel',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'wedding_db',
  host: process.env.DB_HOST || 'wedding-db.database.windows.net',
  port: Number(process.env.DB_PORT) || 1433, // important!
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true, // required for Azure MySQL SSL
    },
    timezone: 'Z',
  },
  logging: false,
};

export = config;
