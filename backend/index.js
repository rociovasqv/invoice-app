const express = require("express");
const session = require('express-session');
const { conection } = require("./config/DB");
const cors = require("cors");
const bodyParser = require('body-parser');

const Usuarios = require("./routes/UsuariosRoutes");
const Clientes = require("./routes/ClienteRoutes");
const Facturas = require("./routes/FacturaRoutes");
const SubClientes = require("./routes/SubClienteRoutes");
const Proveedores = require("./routes/ProveedoresRoutes");

const app = express();

const port = 8000;

// Configuración de CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Dominio del frontend
    credentials: true, // Habilita el envío de cookies o credenciales
};

app.use(cors(corsOptions));

// Configuración de sesiones
app.use(session({
    secret: 'clave_secreta_segura', // Cambiar esto en producción
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // Cambiar a true en producción con HTTPS
        httpOnly: true, // Mayor seguridad contra ataques XSS
        sameSite: 'lax', // Cambiar a 'none' si el frontend y el backend están en dominios diferentes
    },
}));

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use("/", Usuarios);
app.use("/", Clientes);
app.use("/", Facturas);
app.use("/", Proveedores);
app.use("/", SubClientes);

// Endpoint raíz
app.get("/", (req, res) => {
    console.log("Bienvenido");
    res.send({ message: "Welcome to my API" });
});

// Conexión a la base de datos
conection.connect(() => {
    console.log("Conectado a mi DB");
});

// Iniciar servidor
app.listen(port, () => {
    console.log("Escuchando en el puerto " + port);
});
