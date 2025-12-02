const express = require('express');
const {obtenerFacturasCompras,obtenerFacturasVentas,
obtenerFacturasComprasSubProveedor,agregarFacturasComprasSubProveedor,
editarFacturaComprasSubProveedor,obtenerFacturasVentaSubCliente,
agregarFacturasVentaSubCliente,editarFacturaVentaSubCliente,
filtrarFacturasCompras,filtrarFacturasVentas,eliminarFactura, 
informeFacturasCompras,informeFacturasVentas, registrarFacturaCompra,
registrarFacturaVenta,editarFacturaCompra,editarFacturaVenta } = require('../controllers/FacturaControllers');
const router = express.Router();

router.get('/facturas/compras', obtenerFacturasCompras);   // Consultar facturas
router.get('/facturas/ventas', obtenerFacturasVentas);   // Consultar facturas
router.get('/facturas/compras/:idCp/subproveedor', obtenerFacturasComprasSubProveedor); // Consultar facturas por subproveedor
router.post('/facturas/compras/:idCp/subproveedor', agregarFacturasComprasSubProveedor); // Agregar facturas por subproveedor
router.put('/facturas/compras/:idCp/subproveedor', editarFacturaComprasSubProveedor); // Editar facturas por subproveedor
router.get('/facturas/ventas/:idCs/subcliente', obtenerFacturasVentaSubCliente); // Consultar facturas por subcliente
router.post('/facturas/ventas/:idCs/subcliente', agregarFacturasVentaSubCliente); // Agregar facturas por subcliente
router.put('/facturas/ventas/:idCs/subcliente', editarFacturaVentaSubCliente); // Editar facturas por subcliente
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
