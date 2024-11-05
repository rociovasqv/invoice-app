import mysql from "mysql"

const connect = mysql.createConnection(
    {
        host: "localhost",
        user: "user",
        password: "1234"
    }
)

