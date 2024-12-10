const {conection} = require("../config/DB")

// Registrar una nuevas facturas
const registrarFacturaCompra = async (req, res) => {
    const { cuit_proveedor,tipo, nro_factura, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura} = req.body;

        const query = `
        INSERT INTO facturas (id_proveedor, tipo, nro_factura, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura)
        VALUES (
        (SELECT id_proveedor FROM proveedores WHERE cuit_proveedor ='${cuit_proveedor}'),
        '${tipo}'
        ,${nro_factura},
        '${fecha_factura}',
        ${importe_neto},
        ${importe_iva},
        ${importe_total},
        '${tipo_factura}');
        `;
        conection.query(query,(err,results)=>{
            if(err) throw err;
            res.send(results)
        })
};

const registrarFacturaVenta = async (req, res) => {
    const { cuit_cliente, tipo, nro_factura, fecha_factura, importe_neto, importe_iva, importe_total,tipo_factura } = req.body;

        const query = `
        INSERT INTO facturas (id_cliente, tipo, nro_factura, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura)
        VALUES (
        (SELECT id_cliente FROM clientes WHERE cuit_cliente ='${cuit_cliente}'),
        '${tipo}',
        ${nro_factura},
        '${fecha_factura}',
        ${importe_neto},
        ${importe_iva},
        ${importe_total},
        '${tipo_factura}'
        );
        `;
        conection.query(query,(err,results)=>{
            if(err) throw err;
            res.send(results)
        })
};

const obtenerFacturasCompras = async (req, res) => {
    const query = `
            SELECT f.id_factura, f.nro_factura, f.fecha_factura, f.importe_neto, f.importe_iva, f.importe_total,f.tipo, 
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
            SELECT f.id_factura, f.nro_factura, f.fecha_factura, f.importe_neto, f.importe_iva, f.importe_total,f.tipo, 
                   c.razon_social_cliente,c.cuit_cliente
            FROM facturas f
            LEFT JOIN clientes c ON f.id_cliente = c.id_cliente
            LEFT JOIN subclientes s ON f.id_subcliente = s.id_subcliente
            LEFT JOIN proveedores p ON f.id_proveedor = p.id_proveedor
            WHERE f.tipo_factura = 'venta' and disponibleF=1`;
    conection.query(query,(err,results)=>{
        if (err) throw err;
        res.json(results)
    })
};
// const editarFacturaCompra = async(req,res) => {

// }

const generarInformeIVA = async (req, res) => {
    const { fecha_inicio, fecha_fin } = req.query;

    if (!fecha_inicio || !fecha_fin) {
        return res.status(400).json({ error: 'Se deben especificar las fechas de inicio y fin' });
    }

    try {
        const query = `
            SELECT 
                c.razon_social AS cliente,
                f.tipo_factura,
                SUM(f.importe_neto) AS total_neto,
                SUM(f.importe_iva) AS total_iva,
                SUM(f.importe_total) AS total_facturado
            FROM facturas f
            JOIN clientes c ON f.id_cliente = c.id_cliente
            WHERE f.fecha_factura BETWEEN ? AND ?
            GROUP BY c.razon_social, f.tipo_factura
        `;
        const [rows] = await pool.query(query, [fecha_inicio, fecha_fin]);

        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al generar el informe' });
    }
};
const eliminarFactura = (req,res) => {
    const id= req.params.id
    const query= `update facturas set disponibleF= 0 where id_factura='${id}'`
    conection.query(query,(err,results)=> {
        if (err) throw err
        res.send(results)
    })
}

module.exports = { registrarFacturaCompra,registrarFacturaVenta, obtenerFacturasCompras,obtenerFacturasVentas,eliminarFactura, generarInformeIVA };

