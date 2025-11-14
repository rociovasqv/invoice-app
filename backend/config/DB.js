const mysql = require ("mysql2")
require('dotenv').config()

const conection = mysql.createConnection(
    {
        host: process.env.DATABASE_LOCAL_HOST,
        port: process.env.DATABASE_LOCAL_PORT,
        user: process.env.DATABASE_LOCAL_USERNAME,
        password: process.env.DATABASE_LOCAL_PASSWORD,
        database: process.env.DATABASE_LOCAL_DB
    }
)

module.exports = {conection}