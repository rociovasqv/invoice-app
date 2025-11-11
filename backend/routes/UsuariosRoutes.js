const express = require ("express")

const router = express.Router()

const {AllUsers,register,login} = require ("../controllers/UsuarioControllers")
// peticiones http
router.get("/Usuarios",AllUsers)
router.post("/Usuarios/inicio-sesion",login)
router.post("/Usuarios/registrar",register)


module.exports = router