const express = require ("express")
const {conection} = require("./config/DB")

const app = express();

const port = 8000;

app.use(express.json())

app.get("/",(req,res)=>{
    console.log("Bienvenido");
    res.send({message:"Welcome to my API"})
})

app.listen(port,()=>{
    console.log("Escuchando en el puerto"+port);
})