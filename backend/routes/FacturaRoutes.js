const express = require('express');
const {obtenerFacturasCompras,obtenerFacturasVentas,eliminarFactura, generarInformeIVA, registrarFacturaCompra,registrarFacturaVenta } = require('../controllers/FacturaControllers');
const router = express.Router();

router.get('/facturas/compras', obtenerFacturasCompras);   // Consultar facturas
router.get('/facturas/ventas', obtenerFacturasVentas);   // Consultar facturas
router.post('/facturas/compras/agregar', registrarFacturaCompra); // Registrar compra/venta
router.post('/facturas/ventas/agregar',registrarFacturaVenta)
router.delete('/facturas/eliminar/:id',eliminarFactura);

router.get('/informes/iva', generarInformeIVA); // Informe de IVA

module.exports = router;
