import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spinner, Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import {format} from '@formkit/tempo'

import logoAmpuero from '../../logos/logoAmpNav.png';


// import Totales from '../Totales';
import { URL_FACTURAS_VENTA } from '../../constants/constantes';
import '../../styles/informeTabla.css'

const TablaFacturasCliente = () => {

    const { clienteId } = useParams(); // Obtienes el clienteId de la URL
    const [facturas, setFacturas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

        //Tabla
        const headers = [['N° Factura', 'Fecha', 'Monto Neto', 'IVA', 'Total']];
        const data = facturas.map(factura => [
            factura.nro_factura,
            factura.fecha_factura,
            factura.neto?.toFixed(2) ?? '0.00', 
            factura.iva?.toFixed(2) ?? '0.00', 
            factura.total?.toFixed(2) ?? '0.00'
            // factura.neto.toFixed(2),
            // factura.iva.toFixed(2),
            // factura.total.toFixed(2)
        ]);
        doc.autoTable({
            head: headers,
            body: data,
            startY: 55,
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: { fillColor: [217, 217, 217], textColor: [33, 33, 33] }, 
        });
        doc.save('facturas_cliente.pdf');
    };
      
    //Para exportar como Excel
    const ExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(facturas);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Facturas");
        XLSX.writeFile(workbook, "facturas_cliente.xlsx");
    };

    //Para mostrar los datos de las facturas
    const fetchFacturas = async () => {
        try {
          const response = await axios.get(`${URL_FACTURAS_VENTA}?clienteId=${clienteId}`);
          setFacturas(response.data);
        } catch (error) {
          console.error("Error al obtener las facturas:", error);
          setError("No se pudieron cargar las facturas.");
        } finally {
          setLoading(false);
        }
      };
    useEffect(() => {
      fetchFacturas();
    }, [clienteId]);
  
    if (loading) {
      return (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Cargando las facturas...</p>
        </div>
      );
    };

    //Para calcular montos
    const totalNeto = facturas.reduce((acc, factura) => acc + (parseFloat(factura.neto ?? 0)), 0);
    const totalIVA = facturas.reduce((acc, factura) => acc + (parseFloat(factura.iva ?? 0)), 0);
    const total = facturas.reduce((acc, factura) => acc + (parseFloat(factura.total ?? 0)), 0);
  
    return (
      <Container className="pad py-5">
        <Row className="mb-4">
          <Col>
            <h2 className="mb-4 text-center">Facturas del cliente</h2>
          </Col>
        </Row>
        {error && (<Alert variant="danger" className="text-center">{error}</Alert>)}
        {facturas.length === 0 ? (
          <Alert variant="info" className="text-center">
            No hay facturas para este cliente.
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
              {facturas.map((factura) => (
                <tr key={factura.id_factura}>
                  <td>{factura.nro_factura}</td>
                  <td>{format(factura.fecha_factura, 'DD/MM/YYYY')}</td>
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