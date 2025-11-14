const mysql = require ("mysql2")
require('dotenv').config()

const conection = mysql.createConnection(
    {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DB
    }
)

module.exports = {conection}