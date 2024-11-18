const express = require("express")

const router = express.Router()

const {listarClientes,buscarClientes,agregarClientes,editarClientes,eliminarClientes} = require("../controllers/ClienteControllers")

router.get("/Clientes",listarClientes)
router.get("/Clientes/:id",buscarClientes)
router.post("/Clientes/AgregarClientes",agregarClientes)
router.put("/Clientes/EditarClientes/:id",editarClientes)
router.delete("/Clientes/BorrarClientes/:id",eliminarClientes)

module.exports = router