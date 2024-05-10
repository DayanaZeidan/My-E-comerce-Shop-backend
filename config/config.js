const dotenv = require("dotenv");
dotenv.config();

const dbconfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  encrypt: false,
  trustServerCertificate: true,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

module.exports = dbconfig;