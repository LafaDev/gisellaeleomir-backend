import 'dotenv/config';
import type { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER || 'your_admin_user',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'wedding_db',
  host: process.env.DB_HOST || 'wedding-db.database.windows.net',
  port: Number(process.env.DB_PORT) || 1433,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true, // required for Azure
      trustServerCertificate: false,
    },
  },
  logging: false,
};

export = config;
