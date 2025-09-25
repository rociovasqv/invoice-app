const {conection} = require("../config/DB")

const listarSubClientes = async (req,res) => {
    const id = req.params.id
    const query = `select * from subclientes where disponibleS = 1 and id_cliente='${id}'`
     conection.query(query,(err,results)=>{
        if (err) throw err;
        res.json(results)
     })
}
const buscarSubCliente = (req,res)=>{
    const idCliente =  req.params.idCliente
    const id = req.params.id
    const query = `select * from subclientes where id_subcliente='${id}' and id_cliente='${idCliente}' and disponibleS = 1`
    conection.query(query,(err,results)=>{
        if (err) throw err;
        res.json(results)
    })
}
const agregarSubCliente = (req,res) => {
    const {id_cliente,razon_social_subcliente,cuit_subcliente} =req.body 

    const query = `insert into subclientes (id_cliente,razon_social_subcliente,cuit_subcliente) values ('${id_cliente}','${razon_social_subcliente}','${cuit_subcliente}')`

    conection.query(query,(err,results)=> {
        if (err) throw err
        res.send(results)
    })
}
const editarSubCliente = (req,res) => {

    const id= req.params.id
    const {id_cliente,razon_social_subcliente,cuit_subcliente} =req.body 
    const query = `update subclientes set id_cliente='${id_cliente}' , razon_social_subcliente='${razon_social_subcliente}' ,cuit_subcliente='${cuit_subcliente}' where id_subcliente='${id}'`
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