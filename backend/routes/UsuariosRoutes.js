const express = require ("express")

const router = express.Router()

const {AllUsers,login} = require ("../controllers/UsuarioControllers")
// peticiones http
router.get("/Usuarios",AllUsers)
router.post("/Usuarios/inicio-sesion",login)


module.exports = router