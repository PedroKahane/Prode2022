require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.USERNAME_DB,
    "password": process.env.PASSWORD_DB,
    "database": process.env.DATABASE_DB,
    "host": process.env.HOST_DB,
    "port": process.env.PORT_DB,
    "dialect": process.env.DB_DIALECT_DB,
  },
  "test": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "port": process.env.PORT,
    "dialect": "mysql",
  },
  "production": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "port": process.env.PORT,
    "dialect": "mysql",
  }
}
