const express = require('express');
const {obtenerFacturasCompras,obtenerFacturasVentas,obtenerFacturasComprasSubProveedor,filtrarFacturasCompras,filtrarFacturasVentas,eliminarFactura, informeFacturasCompras,informeFacturasVentas, registrarFacturaCompra,registrarFacturaVenta,editarFacturaCompra,editarFacturaVenta } = require('../controllers/FacturaControllers');
const router = express.Router();

router.get('/facturas/compras', obtenerFacturasCompras);   // Consultar facturas
router.get('/facturas/ventas', obtenerFacturasVentas);   // Consultar facturas
router.get('/facturas/compras/subproveedor', obtenerFacturasComprasSubProveedor); // Consultar facturas por subproveedor
router.get('/facturas/compras/:id',filtrarFacturasCompras)
router.get('/facturas/ventas/:id',filtrarFacturasVentas)
router.post('/facturas/compras/agregar', registrarFacturaCompra); // Registrar compra/venta
router.post('/facturas/ventas/agregar',registrarFacturaVenta)
router.put('/facturas/compras/editar/:id',editarFacturaCompra)
router.put('/facturas/ventas/editar/:id',editarFacturaVenta)
router.delete('/facturas/eliminar/:id',eliminarFactura);

router.get('/facturas/compras/informe/:id',informeFacturasCompras); // Informe de Facturas de Compra
router.get('/facturas/ventas/informe/:id',informeFacturasVentas)

module.exports = router;
