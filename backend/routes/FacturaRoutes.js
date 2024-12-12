const express = require('express');
const {obtenerFacturasCompras,obtenerFacturasVentas,eliminarFactura, informeFacturasCompras,informeFacturasVentas, registrarFacturaCompra,registrarFacturaVenta } = require('../controllers/FacturaControllers');
const router = express.Router();

router.get('/facturas/compras', obtenerFacturasCompras);   // Consultar facturas
router.get('/facturas/ventas', obtenerFacturasVentas);   // Consultar facturas
router.post('/facturas/compras/agregar', registrarFacturaCompra); // Registrar compra/venta
router.post('/facturas/ventas/agregar',registrarFacturaVenta)
router.delete('/facturas/eliminar/:id',eliminarFactura);

router.get('/facturas/compras/informe/:id',informeFacturasCompras); // Informe de Facturas de Compra
router.get('/facturas/ventas/informe/:id',informeFacturasVentas)

module.exports = router;
