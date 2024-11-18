const express = require('express');
const { registrarFactura, obtenerFacturas, cargarComprobante, generarInformeIVA } = require('./comprasventas');
const router = express.Router();

router.post('/facturas', registrarFactura); // Registrar compra/venta
router.get('/facturas', obtenerFacturas);   // Consultar facturas

router.post('/comprobantes', cargarComprobante); // Cargar comprobantes

router.get('/informes/iva', generarInformeIVA); // Informe de IVA

module.exports = router;
