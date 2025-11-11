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
    const {id_cliente,razon_social_proveedor,cuit_proveedor} =req.body 

    const query = `insert into proveedores (id_cliente,razon_social_proveedor,cuit_proveedor) values ('${id_cliente}','${razon_social_proveedor}','${cuit_proveedor}')`

    conection.query(query,(err,results)=> {
        if (err) throw err
        res.send(results)
    })
}
const editarProveedor = (req,res) => {

    const id= req.params.id
    const {id_cliente,razon_social_proveedor,cuit_proveedor} =req.body 
    const query = `update proveedores set id_cliente='${id_cliente}' , razon_social_proveedor='${razon_social_proveedor}' ,cuit_proveedor='${cuit_proveedor}' where id_proveedor='${id}'`
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