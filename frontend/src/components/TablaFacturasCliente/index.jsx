import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spinner, Container, Row, Col, Alert, Button} from 'react-bootstrap';
import {useParams } from 'react-router-dom';
import {jsPDF} from 'jspdf';
import autotable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import {format} from '@formkit/tempo';
import DateFilter from '../FechasFiltro';

import logoAmpuero from '../../logos/logoAmpNav.png';


// import Totales from '../Totales';
import { URL_FACTURAS_VENTA } from '../../constants/constantes';
import { URL_CLIENTES } from '../../constants/constantes';
import '../../styles/informeTabla.css'

const TablaFacturasCliente = () => {

    const { clienteId } = useParams(); // Obtienes el clienteId de la URL
    const {cuitCliente} = useParams();
    const [facturas, setFacturas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cliente, setCliente] = useState(null);

    //Para calcular montos
    const totalNeto = facturas.reduce((acc, factura) => acc + (parseFloat(factura.neto ?? 0)), 0);
    const totalIVA = facturas.reduce((acc, factura) => acc + (parseFloat(factura.iva ?? 0)), 0);
    const total = facturas.reduce((acc, factura) => acc + (parseFloat(factura.total ?? 0)), 0);

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
        doc.text('Facturas del Cliente', 15, 45);

        //Tabla de los datos del cliente
        if (cliente) {
          const clienteData = [
              // ['Nombre', cliente.nombre_cliente || 'N/A'],
              ['Razón Social', cliente.razon_social_cliente || 'N/A'],
              ['CUIT', cliente.cuit_cliente || 'N/A'],
              ['Domicilio Fiscal', cliente.domicilio_fiscal || 'N/A'],
              ['Condición IVA', cliente.condicion_iva || 'N/A'],
          ];
          doc.autoTable({
              body: clienteData,
              startY: 55,
              styles: { fontSize: 10, cellPadding: 2, cellWidth: 'wrap'},
              theme: 'grid',
              headStyles: { fillColor: [217, 217, 217], textColor: [33, 33, 33] },
              columnStyles: {
                0: { cellWidth: 35 }, // Ancho fijo para el encabezado (Nombre, Razón Social, etc.)
                1: { cellWidth: 'auto' }, // Relleno dinámico para la celda de datos
            },
          });
      }
        //Tabla principal (facturas)
        const headers = [['N° Factura', 'Fecha', 'Monto Neto', 'IVA', 'Total']];
        const data = filteredFacturas.map(factura => [
            factura.nro_factura,
            format(factura.fecha_factura,'DD/MM/YYYY'),
            factura.neto?.toFixed(2) ?? '0.00', 
            factura.iva?.toFixed(2) ?? '0.00', 
            factura.total?.toFixed(2) ?? '0.00'
        ]);
        data.push([
          {
            content: 'Totales',
            colSpan: 2,
            styles: { halign: 'right', fontStyle: 'bold' },
          },
          totalNeto,
          totalIVA,
          total,
      ]);
        doc.autoTable({
            head: headers,
            body: data,
            startY: doc.previousAutoTable.finalY + 10,
            styles: { fontSize: 10, cellPadding: 2 },
            headStyles: { fillColor: [217, 217, 217], textColor: [33, 33, 33] }, 
            didDrawCell: (data) => 
              {
              if (data.row.raw && data.row.raw.content === 'Totales') {
                  doc.setFontStyle('bold');
              }}
        });
        doc.save('facturas_cliente.pdf');
    };
      
    //Para exportar como Excel
    const ExportExcel = () => {
      const data = facturas.map(factura => ({
        "N° Factura": factura.nro_factura,
        "Fecha": new Date(format(factura.fecha_factura,'DD/MM/YYYY')).toLocaleDateString('es-AR'),
        "Monto Neto": factura.neto?.toFixed(2) ?? '0.00',
        "IVA": factura.iva?.toFixed(2) ?? '0.00',
        "Total": factura.total?.toFixed(2) ?? '0.00'
    }));
    data.push({
      "N° Factura": "Totales",
      "Fecha": "", // Columna vacía
      "Monto Neto": totalNeto,
      "IVA": totalIVA,
      "Total": total,
  });
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Facturas");
        XLSX.writeFile(workbook, "facturas_cliente.xlsx");
    };

    //Para obtener y mostrar los datos del cliente
    const fetchCliente = useCallback(async () => {
      try {
          const res = await axios.get(`${URL_CLIENTES}/${clienteId}`);
          const clienteData = res.data[0];
          if (clienteData) {
              setCliente(clienteData);
          } else {
              setError("No se encontraron datos del cliente.");
          }
      } catch (error) {
          console.error("Error al obtener los datos del cliente:", error);
          setError("No se pudieron cargar los datos del cliente.");
      }
  }, [clienteId]);

  //Para filtrar facturas según rango de fechas
  const [filteredFacturas, setFilteredFacturas] = useState(facturas);

  const handleDateFilter = ({ startDate, endDate }) => {
    const filtered = facturas.filter((factura) => {
      const facturaDate = new Date(factura.fecha_factura);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      return (!start || facturaDate >= start) && (!end || facturaDate <= end);
    });

    setFilteredFacturas(filtered);
  };

  useEffect(() => {
    setFilteredFacturas(facturas);
  }, [facturas]);

  //Para limpiar el filtro de fechas
  const handlelimpiarFiltro = () => {
    setFilteredFacturas(facturas); // Restaura todas las facturas al estado filtrado
};


  //Para obtener y mostrar las facturas del cliente específico
  const fetchFacturas = useCallback(async () => {
      try {
          const res = await axios.get(`${URL_FACTURAS_VENTA}?cuitCliente=${cuitCliente}`);
          const todasFacturas = res.data;
          setFacturas(todasFacturas);
          console.log(todasFacturas);

        // Filtrar las facturas correspondientes al cliente actual
        // const facturasCliente = todasFacturas.filter((factura) => factura.cuit_cliente === cliente.cuit_cliente);
        // setFacturas(facturasCliente);
        // console.log(facturasCliente)

      } catch (error) {
          console.error("Error al obtener las facturas:", error);
          setError("No se pudieron cargar las facturas.");
      } finally {
          setLoading(false);
      }
  }, [cuitCliente]);

  useEffect(() => {
      if (clienteId) {
          fetchCliente();
          fetchFacturas();
      }
  }, [clienteId, cuitCliente, fetchCliente, fetchFacturas]);

    if (loading) {
      return (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Cargando las facturas...</p>
        </div>
      );
    };
    console.log('Cliente state:', cliente);

    return (
      <Container className="pad py-5">
        <Row className="mb-4">
          <Col>
            <h2 className="mb-4 text-center">Facturas del cliente</h2>
          </Col>
        </Row>
        {cliente ? (
          <div className="mb-4">
            <h3 className="text-start">Datos del Cliente</h3>
            <Table responsive bordered className='tableData justify-content-start'>
              <tbody>
                {/* <tr>
                  <th>Nombre</th>
                  <td>{cliente.nombre_cliente}</td>
                </tr> */}
                <tr>
                  <th>Razón Social</th>
                  <td>{cliente.razon_social_cliente}</td>
                </tr>
                <tr>
                  <th>CUIT</th>
                  <td>{cliente.cuit_cliente}</td>
                </tr>
                <tr>
                  <th>Domicilio</th>
                  <td>{cliente.domicilio_fiscal}</td>
                </tr>
                <tr>
                  <th>Condición IVA</th>
                  <td>{cliente.condicion_iva}</td>
                </tr>
              </tbody>
            </Table>
            <Row>
                    <Col md={6}>
                        <DateFilter onFilter={handleDateFilter} />
                    </Col>
                    <Col md={6} className="text-end">
                        <Button variant="secondary" onClick={handlelimpiarFiltro}>
                            Limpiar Filtro
                        </Button>
                    </Col>
                </Row>
          </div>
    ): (<Alert variant="warning" className="text-center">Cargando datos del cliente...</Alert>)}
        {error && (<Alert variant="danger" className="text-center">{error}</Alert>)}
        {filteredFacturas.length === 0 ? (
          <Alert variant="info" className="text-center">
          No se encontraron facturas del cliente.
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
                </tr>
              ))}
               <tr>
                <td colSpan="2" className="text-end fw-bold">Totales:</td>
                <td>{totalNeto.toFixed(2)}</td>
                <td>{totalIVA.toFixed(2)}</td>
                <td>{total.toFixed(2)}</td>
                {/* <Totales data={facturas} /> */}
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

export default TablaFacturasCliente;