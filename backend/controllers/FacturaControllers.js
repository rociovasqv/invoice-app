const {conection} = require("../config/DB")

// Registrar una nueva factura
const registrarFactura = async (req, res) => {
    const { id_cliente, id_subcliente, id_proveedor, tipo, nro_factura, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura } = req.body;

    try {
        const query = `
            INSERT INTO facturas (id_cliente, id_subcliente, id_proveedor, tipo, nro_factura, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query(query, [id_cliente, id_subcliente, id_proveedor, tipo, nro_factura, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura]);

        res.status(201).json({ message: 'Factura registrada con éxito', id_factura: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar la factura' });
    }
};

// Consultar facturas
// const obtenerFacturas = async (req, res) => {
//     const { id_cliente, tipo_factura, fecha_inicio, fecha_fin } = req.query;

//     try {
//         let query = `
//             SELECT f.id_factura, f.nro_factura, f.fecha_factura, f.importe_neto, f.importe_iva, f.importe_total, 
//                    c.razon_social AS cliente, s.razon_social AS subcliente, p.razon_social AS proveedor
//             FROM facturas f
//             LEFT JOIN clientes c ON f.id_cliente = c.id_cliente
//             LEFT JOIN subclientes s ON f.id_subcliente = s.id_subcliente
//             LEFT JOIN proveedores p ON f.id_proveedor = p.id_proveedor
//             WHERE 1=1
//         `;

//         const params = [];
//         if (id_cliente) {
//             query += ' AND f.id_cliente = ?';
//             params.push(id_cliente);
//         }
//         if (tipo_factura) {
//             query += ' AND f.tipo_factura = ?';
//             params.push(tipo_factura);
//         }
//         if (fecha_inicio && fecha_fin) {
//             query += ' AND f.fecha_factura BETWEEN ? AND ?';
//             params.push(fecha_inicio, fecha_fin);
//         }

//         const [rows] = await pool.query(query, params);
//         res.status(200).json(rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error al obtener las facturas' });
//     }
// };

const obtenerFacturasCompras = async (req, res) => {
    const query = `
            SELECT * FROM facturas 
            WHERE tipo_factura = 'compra';`;
    conection.query(query,(err,results)=>{
        if (err) throw err;
        res.json(results)
    })
};
const obtenerFacturasVentas = async (req, res) => {
    const query = `
            SELECT f.id_factura, f.nro_factura, f.fecha_factura, f.importe_neto, f.importe_iva, f.importe_total,f.tipo_factura, 
                   c.razon_social AS cliente, s.razon_social AS subcliente, p.razon_social AS proveedor
            FROM facturas f
            LEFT JOIN clientes c ON f.id_cliente = c.id_cliente
            LEFT JOIN subclientes s ON f.id_subcliente = s.id_subcliente
            LEFT JOIN proveedores p ON f.id_proveedor = p.id_proveedor
            WHERE f.tipo_factura = 'venta'`;
    conection.query(query,(err,results)=>{
        if (err) throw err;
        res.json(results)
    })
};

const cargarComprobante = async (req, res) => {
    const { tipo, nro_factura, id_cliente, id_subcliente, id_proveedor, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura } = req.body;

    try {
        // Validar si ya existe el comprobante
        const [existente] = await pool.query(`
            SELECT * FROM facturas WHERE nro_factura = ? AND id_cliente = ?
        `, [nro_factura, id_cliente]);

        if (existente.length > 0) {
            return res.status(400).json({ error: 'El comprobante ya existe para este cliente' });
        }

        // Insertar el comprobante
        const query = `
            INSERT INTO facturas (tipo, nro_factura, id_cliente, id_subcliente, id_proveedor, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query(query, [tipo, nro_factura, id_cliente, id_subcliente, id_proveedor, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura]);

        res.status(201).json({ message: 'Comprobante cargado exitosamente', id_factura: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al cargar el comprobante' });
    }
};

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

module.exports = { registrarFactura, obtenerFacturasCompras,obtenerFacturasVentas, cargarComprobante, generarInformeIVA };

