const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'arriola',
  password: 'naa123',
  database: 'proyecto',
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
    return;
  }
  console.log('¡Conexión con la base de datos exitosa!');
});

module.exports = connection;
