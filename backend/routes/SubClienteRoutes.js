const express = require("express")

const router = express.Router()

const {listarSubClientes,buscarSubCliente,agregarSubCliente,editarSubCliente,eliminarSubCliente} = require("../controllers/SubClienteControllers")

router.get("/Clientes/:idCliente/SubClientes",listarSubClientes)
router.get("/Clientes/:idCliente/SubClientes/:id",buscarSubCliente)
router.post("/Clientes/idCliente/SubClientes/AgregarSubCliente",agregarSubCliente)
router.put("/Clientes/idCliente/SubClientes/EditarSubCliente/:id",editarSubCliente)
router.delete("/Clientes/idCliente/SubClientes/BorrarSubCliente/:id",eliminarSubCliente)

module.exports = router