require('dotenv').config();

// const pg = require('pg');

module.exports = {
  client: process.env.DATABASE_CONNECTION,
  connection: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: './src/migrations',
    tableName: 'migrations',
  },
};
