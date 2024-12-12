import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spinner, Container, Row, Col, Alert, Button} from 'react-bootstrap';
import {useParams } from 'react-router-dom';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import {format} from '@formkit/tempo';
import DateFilter from '../FechasFiltro';

import logoAmpuero from '../../logos/logoAmpNav.png';

import { URL_FACTURAS_COMPRA_INFORME, URL_PROVEEDORES } from '../../constants/constantes';
import '../../styles/informeTabla.css'

const TablaFacturasProveedor = () => {

    const { id } = useParams(); // Obtienes el ID del cliente de la URL

    const [facturas, setFacturas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [proveedor, setProveedor] = useState(null);

    //Para obtener y mostrar los datos del proveedor
    const fetchProveedor = useCallback(async () => {
      try {
          const res = await axios.get(`${URL_PROVEEDORES}/${id}`);
          const proveedorData = res.data[0];
          if (proveedorData) {
              setProveedor(proveedorData);
          } else {
              setError("No se encontraron datos del proveedor.");
          }
      } catch (error) {
          console.error("Error al obtener los datos del proveedor:", error);
          setError("No se pudieron cargar los datos del proveedor.");
      }
  }, [id]);

  //Para filtrar facturas según rango de fechas
  const [filteredFacturas, setFilteredFacturas] = useState(facturas);

  const handleDateFilter = ({ startDate, endDate }) => {
    const filtered = facturas.filter((factura) => {
      const facturaDate = new Date(factura.fecha_factura);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start) {
        start.setHours(0, 0, 0, 0); // Establece la hora de inicio a 00:00
      }
      if (end) {
        end.setHours(23, 59, 59, 9999); // Establece la hora de fin a 23:59
      }
      return (!start || facturaDate >= start) && (!end || facturaDate <= end);
    });

    setFilteredFacturas(filtered);
  };

  useEffect(() => {
    setFilteredFacturas(facturas);
  }, [facturas]);

  //Para limpiar el filtro de fechas
  const handlelimpiarFiltro = () => {
    setFilteredFacturas(facturas); // Restaura todas las facturas al estado inicial
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    if (startDateInput) startDateInput.value = ''; // Limpiar input de fecha de inicio
    if (endDateInput) endDateInput.value = ''; // Limpiar input de fecha de fin
};

  //Para obtener y mostrar las facturas del cliente específico
  const fetchFacturas = useCallback(async () => {
      try {
          const res = await axios.get(`${URL_FACTURAS_COMPRA_INFORME}/${id}`);
          const todasFacturas = res.data;
          setFacturas(todasFacturas);
          console.log(todasFacturas);

        // // Filtrar las facturas correspondientes al cliente actual
        // const facturasProveedor = todasFacturas.filter((factura) => factura.cuit_proveedor === cliente.cuit_proveedor);
        // setFacturas(facturasProveedor);
        // console.log(facturasProveedor)

      } catch (error) {
          console.error("Error al obtener las facturas:", error);
          setError("No se pudieron cargar las facturas.");
      } finally {
          setLoading(false);
      }
  }, [id]);

  useEffect(() => {
      if (id) {
          fetchProveedor();
          fetchFacturas();
      }
  }, [id, fetchProveedor, fetchFacturas]);

    if (loading) {
      return (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Cargando las facturas...</p>
        </div>
      );
    };
    console.log('Supplier state:', proveedor);

    //Para calcular montos
    const totalNeto = filteredFacturas.reduce((acc, factura) => acc + (parseFloat(factura.importe_neto?? 0)), 0);
    const totalIVA = filteredFacturas.reduce((acc, factura) => acc + (parseFloat(factura.importe_iva ?? 0)), 0);
    const total = filteredFacturas.reduce((acc, factura) => acc + (parseFloat(factura.importe_total ?? 0)), 0);

     //Para exportar como Excel
     const ExportExcel = () => {
      const data = filteredFacturas.map(factura => ({
        "N° Factura": factura.nro_factura,
        "Fecha": new Date(format(factura.fecha_factura,'DD/MM/YYYY')).toLocaleDateString('es-AR'),
        "Importe Neto": `$${factura.importe_neto}`,
        "Importe IVA": `$${factura.importe_iva}`,
        "Total": `$${factura.importe_total}`
    }));
    data.push({
      "N° Factura": "Totales",
      "Fecha": "", // Columna vacía
      "Importe Neto": `$${totalNeto.toFixed(2)}`,
      "Importe IVA": `$${totalIVA.toFixed(2)}`,
      "Total": `$${total.toFixed(2)}`,
  });
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Facturas");
        XLSX.writeFile(workbook, "informe_proveedor.xlsx");
    };

    //Para exportar como PDF
    const ExportPDF = () => {
      const doc = new jsPDF();
      // Configuración del logo
      const imgWidth = 40;
      const imgHeight = 35;
      const logoX = doc.internal.pageSize.width - imgWidth - 10; // Posición X
      const logoY = 10; // Posición Y
      // Agregar el logo
      doc.addImage(logoAmpuero, 'PNG', logoX, logoY, imgWidth, imgHeight);

      // Configuración del título
      doc.setFont('Times');
      doc.setFontSize(18);
      doc.setTextColor(38, 54, 234);
      const titleX = logoX - 1; // Ajusta la posición X para que quede al lado del logo
      const titleY = logoY + imgHeight / 2; // Centra verticalmente con el logo

      // Agregar el título de la empresa
      doc.text('Estudio Contable Ampuero & Asoc.', titleX, titleY, { align: 'right' });

      // Agregar subtítulo
      doc.setFontSize(14);
      doc.setFont('Helvetica');
      doc.setTextColor(0, 0, 0); // Color negro para el subtítulo
      doc.text('Informe de Compra', 15, 45);

      //Tabla de los datos del cliente
      if (proveedor) {
        const proveedorData = [
            // ['Nombre', proveedor.nombre_proveedor || 'N/A'],
            // ['ID de cliente', proveedor.id_cliente || 'N/A'],
            ['Razón Social', proveedor.razon_social_proveedor || 'N/A'],
            ['CUIT', proveedor.cuit_proveedor || 'N/A'],
        ];
        doc.autoTable({
            body: proveedorData,
            startY: 55,
            styles: { fontSize: 10, cellPadding: 2, cellWidth: 'wrap'},
            theme: 'grid',
            headStyles: { fillColor: [217, 217, 217], textColor: [33, 33, 33] },
            columnStyles: {
              0: { cellWidth: 35 }, // Ancho fijo para el encabezado
              1: { cellWidth: 'auto' }, // Relleno dinámico para la celda de datos
          },
        });
    }
    // Mostrar las fechas del filtro si están disponibles
    const startDate =  document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    if (startDate && endDate) {
      const filterText = `Rango de fechas: desde ${format(startDate, 'DD/MM/YYYY')} hasta ${format(endDate, 'DD/MM/YYYY')}`;
      doc.setFontSize(8);
      doc.text(filterText, 15, doc.previousAutoTable.finalY + 6); // Ajusta la posición según sea necesario
    }
    //Tabla principal (facturas)
      const headers = [['N° Factura', 'Fecha', 'Monto Neto', 'IVA', 'Total']];
      const data = filteredFacturas.map(factura => [
          factura.nro_factura,
          format(factura.fecha_factura,'DD/MM/YYYY'),
          `$${factura.importe_neto}`,
          `$${factura.importe_iva}`,
          `$${factura.importe_total}`
      ]);
      data.push([
        {
          content: 'Totales',
          colSpan: 2,
          styles: { halign: 'right', fontStyle: 'bold' },
        },
        `$${totalNeto.toFixed(2)}`,
        `$${totalIVA.toFixed(2)}`,
        `$${total.toFixed(2)}`,
    ]);
    // data.push([
    //   'Totales', '', `$${totalNeto.toFixed(2)}`, `$${totalIVA.toFixed(2)}`, `$${total.toFixed(2)}`
    // ]);
      doc.autoTable({
          head: headers,
          body: data,
          startY: doc.previousAutoTable ? doc.previousAutoTable.finalY + 10 : 75,
          styles: { fontSize: 10, cellPadding: 2 },
          headStyles: { fillColor: [217, 217, 217], textColor: [33, 33, 33] }, 
          didDrawCell: (data) => 
            {
            if (data.row.raw && data.row.raw.content === 'Totales') {
                doc.setFontStyle('bold');
            }}
      });
      doc.save('informe_compra.pdf');
  };
    return (
      <Container className="pad py-5">
        <Row className="mb-4">
          <Col>
            <h2 className="mb-4 text-center">Informe de Compra</h2>
          </Col>
        </Row>
        {proveedor ? (
          <div className="mb-4">
            <h3 className="text-start">Datos del proveedor</h3>
            <Table responsive bordered className='tableData justify-content-start'>
              <tbody>
                {/* <tr>
                  <th>Nombre</th>
                  <td>{proveedor.nombre_proveedor}</td>
                </tr> */}
                <tr>
                  <th>Razón Social</th>
                  <td>{proveedor.razon_social_proveedor}</td>
                </tr>
                <tr>
                  <th>CUIT</th>
                  <td>{proveedor.cuit_proveedor}</td>
                </tr>
              </tbody>
            </Table>
            <Row>
                    <Col md={10}>
                        <DateFilter onFilter={handleDateFilter} />
                    </Col>
                    <Col md={2} className="text-end">
                        <Button variant="secondary" onClick={handlelimpiarFiltro}>
                            Limpiar Filtro
                        </Button>
                    </Col>
                </Row>
          </div>
    ): (<Alert variant="warning" className="text-center">Cargando datos del proveedor...</Alert>)}
        {/* {error && (<Alert variant="danger" className="text-center">{error}</Alert>)} */}
        {filteredFacturas.length === 0 ? (
          <Alert variant="info" className="text-center">
          No se encontraron facturas del proveedor.
        </Alert>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>N° de Factura</th>
                <th>Fecha</th>
                <th>Monto Neto</th>
                <th>IVA</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredFacturas.map((factura) => (
                <tr key={factura.id_factura}>
                  <td>{factura.nro_factura}</td>
                  <td>{format(factura.fecha_factura,'DD/MM/YYYY')}</td>
                  <td>${factura.importe_neto}</td>
                  <td>${factura.importe_iva}</td>
                  <td>${factura.importe_total}</td>
                </tr>
              ))}
               <tr>
                <td colSpan="2" className="text-end fw-bold">Totales:</td>
                <td>${totalNeto.toFixed(2)}</td>
                <td>${totalIVA.toFixed(2)}</td>
                <td>${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </Table>
        )}
 
        <div className="mt-3 d-flex justify-content-end gap-2">
              <Button variant="success" onClick={ExportExcel}>Exportar a Excel</Button>
              <Button variant="danger" onClick={ExportPDF}>Exportar a PDF</Button>
         </div>
      </Container>
    );
}

export default TablaFacturasProveedor;