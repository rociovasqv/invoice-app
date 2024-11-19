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
    const {razonSocial,cuit,condicionIva,domicilioFiscal} =req.body 

    const query = `insert into Clientes (razon_social,cuit,condicion_iva,domicilio_fiscal) values ('${razonSocial}','${cuit}','${condicionIva}','${domicilioFiscal}')`

    conection.query(query,(err,results)=> {
        if (err) throw err
        res.send(results)
    })
}
const editarClientes = (req,res) => {

    const id= req.params.id
    const {razonSocial,cuit,condicionIva,domicilioFiscal} =req.body 
    const query = `update clientes set razon_social='${razonSocial}' ,cuit='${cuit}' ,condicion_iva='${condicionIva}' ,domicilio_fiscal='${domicilioFiscal}' where id_cliente='${id}'`
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