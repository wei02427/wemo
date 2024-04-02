import type { Knex } from "knex";
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../../.env' })


const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mssql",
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      server: process.env.DB_SERVER,
      database: 'Wemo',
    }
  },

};

module.exports = config;
