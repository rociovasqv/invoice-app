const express = require("express");
const {conection} = require("./config/DB")
const cors = require("cors")
const bodyParser = require('body-parser')

const Usuarios = require ("./routes/UsuariosRoutes")
const Clientes = require("./routes/ClienteRoutes")
const Facturas = require ("./routes/FacturaRoutes")
const SubClientes = require("./routes/SubClienteRoutes")
const subproveedores = require("./routes/SubproveedorRoutes")
const Proveedores = require("./routes/ProveedoresRoutes")

const app = express();

const port = 8000;

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use("/",Usuarios)
app.use("/",Clientes)
app.use("/",Facturas)
app.use("/",Proveedores)
app.use("/",SubClientes)
app.use("/",subproveedores)

app.get("/",(req,res)=>{
    console.log("Bienvenido");
    res.send({message:"Welcome to my API"})
})

conection.connect((err) => {
    if (err) {
        console.error('❌ Error al conectar a la DB:', err);
        return;
    }
    console.log('✅ Conectado a la base de datos MySQL en Railway');
});

app.listen(port,()=>{
    console.log("Escuchando en el puerto"+port);
})