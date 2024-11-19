const express = require("express")

const router = express.Router()

const {listarSubClientes,buscarSubCliente,agregarSubCliente,editarSubCliente,eliminarSubCliente} = require("../controllers/SubClienteControllers")

router.get("/SubClientes",listarSubClientes)
router.get("/SubClientes/:id",buscarSubCliente)
router.post("/SubClientes/AgregarSubCliente",agregarSubCliente)
router.put("/SubClientes/EditarSubCliente/:id",editarSubCliente)
router.delete("/SubClientes/BorrarSubCliente/:id",eliminarSubCliente)

module.exports = router