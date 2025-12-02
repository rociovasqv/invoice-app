const mysql = require ("mysql2")
require('dotenv').config()

const conection = mysql.createConnection(
    {
        host: process.env.MYSQLHOST,
        port: process.env.MYSQLPORT,
        user: process.env.MYSQLUSER,
        password: process.env.MYSQLPASSWORD,
        database: process.env.MYSQLDATABASE,
        ssl: {
            rejectUnauthorized: false
        }
    }
)

module.exports = {conection}