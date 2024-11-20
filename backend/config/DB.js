const mysql = require ("mysql2")

const conection = mysql.createConnection(
    {
        host: "localhost",
        user: "arriola",
        password: "naa123",
        database:"ampuero"
    }
)

module.exports = {conection}