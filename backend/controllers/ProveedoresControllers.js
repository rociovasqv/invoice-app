const {conection} = require("../config/DB")

const listarProveedores = async (req,res) => {
    const query = `select * from proveedores where disponibleP = 1`
     conection.query(query,(err,results)=>{
        if (err) throw err;
        res.json(results)
     })
}
const buscarProveedor = (req,res)=>{
    const id = req.params.id
    const query = `select * from proveedores where id_proveedor='${id}'`
    conection.query(query,(err,results)=>{
        if (err) throw err;
        res.json(results)
    })
}
const agregarProveedor = (req,res) => {
    const {idCliente,razonSocial,cuit} =req.body 

    const query = `insert into proveedores (id_cliente,razon_social,cuit) values ('${idCliente}','${razonSocial}','${cuit}')`

    conection.query(query,(err,results)=> {
        if (err) throw err
        res.send(results)
    })
}
const editarProveedor = (req,res) => {

    const id= req.params.id
    const {idCliente,razonSocial,cuit} =req.body 
    const query = `update proveedores set id_cliente='${idCliente}' , razon_social='${razonSocial}' ,cuit='${cuit}' where id_proveedor='${id}'`
    conection.query(query,(err,results)=> {
        if (err) throw err
        res.send(results)
    })
}
const eliminarProveedor = (req,res) => {
    const id= req.params.id
    const query= `update proveedores set disponibleP= 0 where id_proveedor='${id}'`
    conection.query(query,(err,results)=> {
        if (err) throw err
        res.send(results)
    })
}

module.exports = {listarProveedores,buscarProveedor,agregarProveedor,editarProveedor,eliminarProveedor}