const express = require('express');
const app = express();
const connection = require('./database/connection');

// Importar los routers de comprobantes
const comprobantesRoutes = require('./comprobantes');

app.use(express.json());

app.use('/api/comprobantes', comprobantesRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
