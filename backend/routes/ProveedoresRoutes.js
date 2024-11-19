const express = require("express")

const router = express.Router()

const {listarProveedores,buscarProveedor,agregarProveedor,editarProveedor,eliminarProveedor} = require("../controllers/ProveedoresControllers")

router.get("/Proveedores",listarProveedores)
router.get("/Proveedores/:id",buscarProveedor)
router.post("/Proveedores/AgregarProveedor",agregarProveedor)
router.put("/Proveedores/EditarProveedor/:id",editarProveedor)
router.delete("/Proveedores/BorrarProveedor/:id",eliminarProveedor)

module.exports = router