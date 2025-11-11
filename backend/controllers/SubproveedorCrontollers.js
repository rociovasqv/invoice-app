const {conection} = require("../config/DB")

const listarSubProveedores = async (req,res) => {
    const idCliente = req.params.idCliente
    const query = `select * from subproveedores where id_cliente = '${idCliente}' and disponibleSP = 1`
     conection.query(query,(err,results)=>{
        if (err) throw err;
        res.json(results)
     })
}
const buscarSubProveedor = (req,res)=>{
    const idCliente =  req.params.idCliente
    const id = req.params.id
    const query = `select * from subproveedores where id_subproveedor='${id}' and id_cliente = '${idCliente}' and disponibleSP = 1`
    conection.query(query,(err,results)=>{
        if (err) throw err;
        res.json(results)
    })
}
const agregarSubProveedor = (req,res) => {

    const idCliente =  req.params.idCliente
    const {razon_social_subproveedor,cuit_subproveedor} =req.body 

    const query = `insert into subproveedores (id_cliente,razon_social_subproveedor,cuit_subproveedor) values ('${idCliente}','${razon_social_subproveedor}','${cuit_subproveedor}')`

    conection.query(query,(err,results)=> {
        if (err) throw err
        res.send(results)
    })
}
const actualizarSubProveedor = (req,res) => {
    const idCliente =  req.params.idCliente
    const id= req.params.id
    const {razon_social_subproveedor,cuit_subproveedor} =req.body 
    const query = `update subproveedores set id_cliente='${idCliente}',razon_social_subproveedor='${razon_social_subproveedor}',cuit_subproveedor='${cuit_subproveedor}' where id_subproveedor='${id}'`
    conection.query(query,(err,results)=> {
        if (err) throw err
        res.send(results)
    })
}
const eliminarSubProveedor = (req,res) => {
    const idCliente =  req.params.idCliente
    const id= req.params.id
    const query= `update subproveedores set disponibleSP= 0 where id_subproveedor='${id}' and id_cliente = '${idCliente}'`
    conection.query(query,(err,results)=> {
        if (err) throw err
        res.send(results)
    })
}
module.exports = {listarSubProveedores,agregarSubProveedor,actualizarSubProveedor,eliminarSubProveedor,buscarSubProveedor}