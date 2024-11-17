const express = require ("express")
const {conection} = require("./config/DB")
const cors = require("cors")
const bodyParser = require('body-parser')

const Usuarios = require ("./routes/UsuariosRoutes")

const app = express();

const port = 8000;

app.use(express.json())
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use("/",Usuarios)

app.get("/",(req,res)=>{
    console.log("Bienvenido");
    res.send({message:"Welcome to my API"})
})

conection.connect(()=>{
    console.log("conectado a mi DB");
})

app.listen(port,()=>{
    console.log("Escuchando en el puerto"+port);
})