const {conection} = require("../config/DB")

const listarSubClientes = async (req,res) => {
    const query = `select * from subclientes where disponibleS = 1`
     conection.query(query,(err,results)=>{
        if (err) throw err;
        res.json(results)
     })
}
const buscarSubCliente = (req,res)=>{
    const id = req.params.id
    const query = `select * from subclientes where id_subcliente='${id}'`
    conection.query(query,(err,results)=>{
        if (err) throw err;
        res.json(results)
    })
}
const agregarSubCliente = (req,res) => {
    const {idCliente,razonSocial,cuit} =req.body 

    const query = `insert into subclientes (id_cliente,razon_social,cuit) values ('${idCliente}','${razonSocial}','${cuit}')`

    conection.query(query,(err,results)=> {
        if (err) throw err
        res.send(results)
    })
}
const editarSubCliente = (req,res) => {

    const id= req.params.id
    const {idCliente,razonSocial,cuit} =req.body 
    const query = `update subclientes set id_cliente='${idCliente}' , razon_social='${razonSocial}' ,cuit='${cuit}' where id_subcliente='${id}'`
    conection.query(query,(err,results)=> {
        if (err) throw err
        res.send(results)
    })
}
const eliminarSubCliente = (req,res) => {
    const id= req.params.id
    const query= `update subclientes set disponibleS= 0 where id_subcliente='${id}'`
    conection.query(query,(err,results)=> {
        if (err) throw err
        res.send(results)
    })
}

module.exports = {listarSubClientes,buscarSubCliente,agregarSubCliente,editarSubCliente,eliminarSubCliente}