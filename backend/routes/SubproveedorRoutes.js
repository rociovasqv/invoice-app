const express = require('express');

const router = express.Router();

const { listarSubProveedores, buscarSubProveedor, agregarSubProveedor, actualizarSubProveedor, eliminarSubProveedor } = require('../controllers/SubproveedorCrontollers');

router.get('/SubProveedores', listarSubProveedores);
router.get('/SubProveedores/:id', buscarSubProveedor);
router.post('/SubProveedores/AgregarSubProveedor', agregarSubProveedor);
router.put('/SubProveedores/EditarSubProveedor/:id', actualizarSubProveedor);
router.delete('/SubProveedores/BorrarSubProveedor/:id', eliminarSubProveedor);

module.exports = router;