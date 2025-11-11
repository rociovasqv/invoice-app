const {conection} = require("../config/DB")

const listarClientes = async (req,res) => {
    const query = `select * from clientes where disponibleC = 1`
     conection.query(query,(err,results)=>{
        if (err) throw err; 
        res.json(results)
     })
}
const buscarClientes = (req,res)=>{
    const id = req.params.id
    const query = `select * from clientes where id_cliente='${id}'`
    conection.query(query,(err,results)=>{
        if (err) throw err;
        res.json(results)
    })
}
const agregarClientes = (req,res) => {
    const {razon_social_cliente,cuit_cliente,condicion_iva,domicilio_fiscal} =req.body 

    const query = `insert into Clientes (razon_social_cliente,cuit_cliente,condicion_iva,domicilio_fiscal) values ('${razon_social_cliente}','${cuit_cliente}','${condicion_iva}','${domicilio_fiscal}')`

    conection.query(query,(err,results)=> {
        if (err) throw err
        res.send(results)
    })
}
const editarClientes = (req,res) => {

    const id= req.params.id
    const {razon_social_cliente,cuit_cliente,condicion_iva,domicilio_fiscal} =req.body 
    const query = `update clientes set razon_social_cliente='${razon_social_cliente}' ,cuit_cliente='${cuit_cliente}' ,condicion_iva='${condicion_iva}' ,domicilio_fiscal='${domicilio_fiscal}' where id_cliente='${id}'`
    conection.query(query,(err,results)=> {
        if (err) throw err
        res.send(results)
    })
}
const eliminarClientes = (req,res) => {
    const id= req.params.id
    const query= `update clientes set disponibleC= 0 where id_cliente='${id}'`
    conection.query(query,(err,results)=> {
        if (err) throw err
        res.send(results)
    })
}

module.exports = {listarClientes,buscarClientes,agregarClientes,editarClientes,eliminarClientes}