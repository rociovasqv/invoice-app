const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rutas = require('./routes');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', rutas);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
