const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'arriola',
    password: 'naa123',
    database: 'proyecto',
});

module.exports = pool;
