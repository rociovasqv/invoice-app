const Totales = ({ facturas }) => {
    const totalNeto = facturas.reduce((acc, factura) => acc + (parseFloat(factura.neto) || 0), 0);
    const totalIVA = facturas.reduce((acc, factura) => acc + (parseFloat(factura.iva) || 0), 0);
    const total = facturas.reduce((acc, factura) => acc + (parseFloat(factura.total) || 0), 0);
    
        return (
            <tr>
                <td colSpan="2" className="text-end fw-bold">Totales:</td>
                <td>${totalNeto.toFixed(2)}</td>
                <td>${totalIVA.toFixed(2)}</td>
                <td>${total.toFixed(2)}</td>
            </tr>
        );
    };
export default Totales;
