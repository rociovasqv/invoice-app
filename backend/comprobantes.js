const express = require('express');
const router = express.Router();
const app = express();
const connection = require('./database/connection');

// Endpoint para cargar un comprobante
app.post('/facturas', (req, res) => {
  const {
    id_cliente,
    id_subcliente,
    id_proveedor,
    tipo,
    nro_factura,
    fecha_factura,
    importe_neto,
    importe_iva,
    importe_total,
    tipo_factura,
  } = req.body;

  // Validación de datos
  if (!id_cliente || !tipo || !nro_factura || !fecha_factura || !importe_total || !tipo_factura) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  const query = `
    INSERT INTO facturas (id_cliente, id_subcliente, id_proveedor, tipo, nro_factura, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    id_cliente,
    id_subcliente || null,
    id_proveedor || null,
    tipo,
    nro_factura,
    fecha_factura,
    importe_neto,
    importe_iva,
    importe_total,
    tipo_factura,
  ];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al insertar el comprobante:', err);
      return res.status(500).json({ error: 'Error al insertar el comprobante' });
    }
    res.status(201).json({ message: 'Comprobante cargado exitosamente', id: result.insertId });
  });
});

// Endpoint para obtener la lista de facturas
app.get('/facturas', (req, res) => {
    const query = 'SELECT * FROM facturas';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener las facturas:', err);
        return res.status(500).json({ error: 'Error al obtener las facturas' });
      }
      res.json(results);
    });
  });

  // Endpoint para eliminar una factura por id
app.delete('/facturas/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM facturas WHERE id_factura = ?';

  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar la factura:', err);
      return res.status(500).json({ error: 'Error al eliminar la factura' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }

    res.json({ message: 'Factura eliminada exitosamente' });
  });
});

module.exports = router;