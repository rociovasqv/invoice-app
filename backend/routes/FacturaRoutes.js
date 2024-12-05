const express = require('express');
const { registrarFactura, obtenerFacturasCompras,obtenerFacturasVentas,eliminarFactura, cargarComprobante, generarInformeIVA } = require('../controllers/FacturaControllers');
const router = express.Router();

router.post('/facturas/agregar', registrarFactura); // Registrar compra/venta
router.get('/facturas/compras', obtenerFacturasCompras);   // Consultar facturas
router.get('/facturas/ventas', obtenerFacturasVentas);   // Consultar facturas
router.delete('/facturas/eliminar/:id',eliminarFactura);

router.post('/comprobantes/cargar', cargarComprobante); // Cargar comprobantes

router.get('/informes/iva', generarInformeIVA); // Informe de IVA

module.exports = router;
