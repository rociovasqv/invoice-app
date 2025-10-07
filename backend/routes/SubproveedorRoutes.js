const express = require('express');

const router = express.Router();

const { listarSubProveedores, buscarSubProveedor, agregarSubProveedor, actualizarSubProveedor, eliminarSubProveedor } = require('../controllers/SubproveedorCrontollers');

router.get('/Clientes/:idCliente/SubProveedores', listarSubProveedores);
router.get('/Clientes/:idCliente/SubProveedores/:id', buscarSubProveedor);
router.post('/Clientes/:idCliente/SubProveedores/AgregarSubProveedor', agregarSubProveedor);
router.put('/Clientes/:idCliente/SubProveedores/EditarSubProveedor/:id', actualizarSubProveedor);
router.delete('/Clientes/:idCliente/SubProveedores/BorrarSubProveedor/:id', eliminarSubProveedor);

module.exports = router;