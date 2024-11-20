import { Table, Button, Container, Spinner, Alert, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useFacturasCompra from "../../hooks/useFacturasCompra";
import "../../styles/facturaTabla.css";
import axios from "axios"
import { URL_FACTURAS_COMPRA } from "../../constants/constantes";
import { useEffect, useState } from "react";

const TablaCompraComp = () => {
  const {
    loading,
    error
  } = useFacturasCompra();
  const [facturasCompra,setFacturasCompra]= useState([])

  const navigate = useNavigate();

  const getFacturasCompra = async()=>{
    let response = await axios.get(URL_FACTURAS_COMPRA);
    console.log(response.data)
    setFacturasCompra(response.data)
  }
useEffect(()=>{
  getFacturasCompra()
},[])

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta facturasCompra?")) {
      try {
        await eliminarFactura(id);
        alert("Factura eliminada exitosamente");
      } catch (error) {
        alert("Error al eliminar la facturasCompra");
      }
    }
  };

  return (
    <Container className="pad my-5">
      <h2 className="mb-4 text-center">Gestión de facturas de compra</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Row className="mb-1 align-content-around">
            <Col md={2}>
            <p>Si quieres registrar uno nuevo: </p>
            </Col>
            <Col md={2}>
              <Button
                variant="primary"
                className="mt-3"
                onClick={() => navigate("/registrar-compra")} // Navegar a la página para registrar facturasCompra
              >
                Nueva factura
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Número de Factura</th>
                <th>Fecha de Emisión</th>
                <th>Proveedor</th>
                <th>CUIT</th>
                <th>Tipo de Factura</th>
                <th>Importe Neto</th>
                <th>IVA</th>
                <th>Importe Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {facturasCompra && facturasCompra.length > 0 ? (
                facturasCompra.map((facturasCompra,index) => (
                  <tr key={facturasCompra.idFactura}>
                    <td>{index + 1}</td>
                    <td>{facturasCompra.nro_factura}</td>
                    <td>{facturasCompra.fecha_factura}</td>
                    <td>{facturasCompra.razon_social_proveedor}</td>
                    <td>{facturasCompra.cuit_proveedor}</td>
                    <td>{facturasCompra.tipo}</td>
                    <td>{facturasCompra.importe_neto}</td>
                    <td>{facturasCompra.importe_iva}</td>
                    <td>{facturasCompra.importe_total}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => navigate(`/editar-compra/${facturasCompra.id}`)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleEliminar(facturasCompra.id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">
                    No hay facturas de compras registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default TablaCompraComp;
