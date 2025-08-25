const express = require('express');

const router = express.Router();

const { listarSubProveedores, buscarSubProveedor, agregarSubProveedor, actualizarSubProveedor, eliminarSubProveedor } = require('../controllers/SubproveedorCrontollers');

router.get('/SubProveedores', listarSubProveedores);
router.get('/SubProveedores/:id', buscarSubProveedor);
router.post('/SubProveedores', agregarSubProveedor);
router.put('/SubProveedores/:id', actualizarSubProveedor);
router.delete('/SubProveedores/:id', eliminarSubProveedor);

module.exports = router;