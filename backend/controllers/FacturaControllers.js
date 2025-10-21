const {conection} = require("../config/DB")

// Registrar una nuevas facturas
const registrarFacturaCompra = async (req, res) => {
    const { cuit_proveedor,tipo, nro_factura, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura} = req.body;

        const query = `
        INSERT INTO facturas (id_proveedor, tipo, nro_factura, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura)
        VALUES (
        (SELECT id_proveedor FROM proveedores WHERE cuit_proveedor ='${cuit_proveedor}'),'${tipo}','${nro_factura}','${fecha_factura}',${importe_neto},${importe_iva},${importe_total},'${tipo_factura}');`;
        conection.query(query,(err,results)=>{
            if(err) throw err;
            res.send(results)
        })
};

const registrarFacturaVenta = async (req, res) => {
    const { cuit_cliente, tipo, nro_factura, fecha_factura, importe_neto, importe_iva, importe_total,tipo_factura } = req.body;

        const query = `
        INSERT INTO facturas (id_cliente, tipo, nro_factura, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura)
        VALUES ((SELECT id_cliente FROM clientes WHERE cuit_cliente ='${cuit_cliente}'),'${tipo}','${nro_factura}','${fecha_factura}',${importe_neto},${importe_iva},${importe_total},'${tipo_factura}');`;
        conection.query(query,(err,results)=>{
            if(err) throw err;
            res.send(results)
        })
};

const obtenerFacturasCompras = async (req, res) => {
    const query = `
            SELECT f.id_factura, f.nro_factura,  DATE_FORMAT(f.fecha_factura, '%Y-%m-%d') AS fecha_factura, f.importe_neto, f.importe_iva, f.importe_total,f.tipo, 
                   p.razon_social_proveedor,p.cuit_proveedor
            FROM facturas f
            JOIN proveedores p ON f.id_proveedor = p.id_proveedor
            WHERE f.tipo_factura = 'compra' and disponibleF=1`;
    conection.query(query,(err,results)=>{
        if (err) throw err;
        res.json(results)
    })
};
const obtenerFacturasVentas = async (req, res) => {
    const query = `
            SELECT f.id_factura, f.nro_factura,  DATE_FORMAT(f.fecha_factura, '%Y-%m-%d') AS fecha_factura, f.importe_neto, f.importe_iva, f.importe_total,f.tipo, 
                   c.razon_social_cliente,c.cuit_cliente
            FROM facturas f
            LEFT JOIN clientes c ON f.id_cliente = c.id_cliente
            LEFT JOIN proveedores p ON f.id_proveedor = p.id_proveedor
            WHERE f.tipo_factura = 'venta' and disponibleF=1`;
    conection.query(query,(err,results)=>{
        if (err) throw err;
        res.json(results)
    })
};

const obtenerFacturasComprasSubProveedor = async (req, res) => {
    const id = req.params.id
    const query = `
            SELECT f.id_factura, f.nro_factura, DATE_FORMAT(f.fecha_factura, '%Y-%m-%d') AS fecha_factura, f.importe_neto, f.importe_iva, f.importe_total,f.tipo,f.id_cliente, 
                   sp.razon_social_subproveedor,sp.cuit_subproveedor
            FROM facturas f
            JOIN subproveedores sp ON f.id_subproveedor = sp.id_subproveedor
            WHERE f.tipo_factura = 'compra' and disponibleF=1 and f.id_cliente=${id}`;
    conection.query(query,(err,results)=>{
        if (err) throw err;
        res.json(results)
    })
};
const obtenerFacturasVentaSubCliente = async (req, res) => {
    const id = req.params.id
    const query = `
            SELECT f.id_factura, f.nro_factura, DATE_FORMAT(f.fecha_factura, '%Y-%m-%d') AS fecha_factura, f.importe_neto, f.importe_iva, f.importe_total,f.tipo,f.id_cliente, 
                   sc.razon_social_subcliente,sc.cuit_subcliente
            FROM facturas f
            JOIN subclientes sc ON f.id_subcliente = sc.id_subcliente
            WHERE f.tipo_factura = 'venta' and disponibleF=1 and f.id_cliente=${id}`;
    conection.query(query,(err,results)=>{
        if (err) throw err;
        res.json(results)
    })
};
const filtrarFacturasCompras = async (req, res) => {
    const id = req.params.id
    const query = `
            SELECT f.id_factura, f.nro_factura,  DATE_FORMAT(f.fecha_factura, '%Y-%m-%d') AS fecha_factura, f.importe_neto, f.importe_iva, f.importe_total,f.tipo, 
                   p.razon_social_proveedor,p.cuit_proveedor
            FROM facturas f
            JOIN proveedores p ON f.id_proveedor = p.id_proveedor
            WHERE f.tipo_factura = 'compra' and disponibleF=1 and f.id_factura = ${id}`;
    conection.query(query,(err,results)=>{
        if (err) throw err;
        res.json(results)
    })
};
const filtrarFacturasVentas = async (req, res) => {
    const id =req.params.id
    const query = `
            SELECT f.id_factura, f.nro_factura,  DATE_FORMAT(f.fecha_factura, '%Y-%m-%d') AS fecha_factura, f.importe_neto, f.importe_iva, f.importe_total,f.tipo, 
                   c.razon_social_cliente,c.cuit_cliente
            FROM facturas f
            LEFT JOIN clientes c ON f.id_cliente = c.id_cliente
            LEFT JOIN subclientes s ON f.id_subcliente = s.id_subcliente
            LEFT JOIN proveedores p ON f.id_proveedor = p.id_proveedor
            WHERE f.tipo_factura = 'venta' and disponibleF=1 and f.id_factura = ${id}`;
    conection.query(query,(err,results)=>{
        if (err) throw err;
        res.json(results)
    })
};
const editarFacturaCompra = async (req, res) => {
    const id = req.params.id
    const {cuit_proveedor, tipo, nro_factura, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura } = req.body;

    const query = `
        UPDATE facturas
        SET 
            id_proveedor = (SELECT id_proveedor FROM proveedores WHERE cuit_proveedor = '${cuit_proveedor}'),
            tipo = '${tipo}',
            nro_factura = '${nro_factura}',
            fecha_factura = '${fecha_factura}',
            importe_neto = ${importe_neto},
            importe_iva = ${importe_iva},
            importe_total = ${importe_total},
            tipo_factura = '${tipo_factura}'
        WHERE id_factura = ${id};
    `;

    conection.query(query, (err, results) => {
        if (err) {
            console.error("Error al actualizar la factura:", err);
            res.status(500).send({ error: "Error al actualizar la factura" });
            return;
        }
        res.send({ message: "Factura actualizada correctamente", results });
    });
};
const editarFacturaVenta = async (req, res) => {
    const id = req.params.id
    const { cuit_cliente, tipo, nro_factura, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura } = req.body;

    const query = `
        UPDATE facturas
        SET 
            id_cliente = (SELECT id_cliente FROM clientes WHERE cuit_cliente = '${cuit_cliente}'),
            tipo = '${tipo}',
            nro_factura = '${nro_factura}',
            fecha_factura = '${fecha_factura}',
            importe_neto = ${importe_neto},
            importe_iva = ${importe_iva},
            importe_total = ${importe_total},
            tipo_factura = '${tipo_factura}'
            WHERE id_factura = ${id};
    `;

    conection.query(query, (err, results) => {
        if (err) {
            console.error("Error al actualizar la factura:", err);
            res.status(500).send({ error: "Error al actualizar la factura" });
            return;
        }
        res.send({ message: "Factura actualizada correctamente", results });
    });
};


// 
const informeFacturasCompras = async (req, res) => {
    const id = req.params.id
    const query = `
            SELECT f.id_factura, f.nro_factura, f.fecha_factura, f.importe_neto, f.importe_iva, f.importe_total,f.tipo, 
                   p.razon_social_proveedor,p.cuit_proveedor
            FROM facturas f
            JOIN proveedores p ON f.id_proveedor = p.id_proveedor
            WHERE f.tipo_factura = 'compra' and disponibleF=1 and p.id_proveedor=${id}`;
    conection.query(query,(err,results)=>{
        if (err) throw err;
        res.json(results)
    })
};
const informeFacturasVentas = async (req, res) => {
    const id = req.params.id
    const query = `
			SELECT f.id_factura, f.nro_factura, f.fecha_factura, f.importe_neto, f.importe_iva, f.importe_total,f.tipo, 
                   c.razon_social_cliente,c.cuit_cliente
            FROM facturas f
            JOIN clientes c ON f.id_cliente = c.id_cliente
            WHERE f.tipo_factura = 'venta' and disponibleF=1 and c.id_cliente=${id}`;
    conection.query(query,(err,results)=>{
        if (err) throw err;
        res.json(results)
    })
};
const eliminarFactura = (req,res) => {
    const id= req.params.id
    const query= `update facturas set disponibleF= 0 where id_factura='${id}'`
    conection.query(query,(err,results)=> {
        if (err) throw err
        res.send(results)
    })
}

module.exports = { registrarFacturaCompra,registrarFacturaVenta, obtenerFacturasCompras,obtenerFacturasVentas,obtenerFacturasVentaSubCliente,obtenerFacturasComprasSubProveedor,filtrarFacturasCompras,filtrarFacturasVentas,editarFacturaCompra,editarFacturaVenta,eliminarFactura,informeFacturasCompras,informeFacturasVentas};

