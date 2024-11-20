import { Table, Button, Container, Spinner, Alert, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useFacturasVenta from "../../hooks/useFacturasVenta"; // Hook para facturas de venta
import "../../styles/facturaTabla.css";

const TablaVentasComp = () => {
  const {
    loading,
    error,
    facturasVenta,
    eliminarFactura,
  } = useFacturasVenta();

  const navigate = useNavigate();

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta facturasVenta?")) {
      try {
        await eliminarFactura(id);
        alert("Factura eliminada exitosamente");
      } catch (error) {
        alert("Error al eliminar la facturasVenta");
      }
    }
  };

  return (
    <Container className="pad my-5">
      <h2 className="mb-4 text-center">Gestión de facturas de venta</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Row className="mb-1">
          <Col md={2}>
            <p>Si quieres registrar uno nuevo: </p>
            </Col>
            <Col md={2}>
              <Button
                variant="primary"
                className="mt-3"
                onClick={() => navigate("/registrar-venta")} // Navegar a la página para registrar una facturasVenta de venta
              >Nueva factura
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Número de Factura</th>
                <th>Fecha de Emisión</th>
                <th>Cliente</th>
                <th>CUIT</th>
                <th>Tipo de Factura</th>
                <th>Importe Neto</th>
                <th>IVA</th>
                <th>Importe Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {facturasVenta && facturasVenta.length > 0 ? (
                facturasVenta.map((facturasVenta, index) => (
                  <tr key={facturasVenta.id}>
                    <td>{index + 1}</td>
                    <td>{facturasVenta.nro_factura}</td>
                    <td>{facturasVenta.fecha}</td>
                    <td>{facturasVenta.cliente}</td>
                    <td>{facturasVenta.cuit}</td>
                    <td>{facturasVenta.tipo}</td>
                    <td>${facturasVenta.neto.toLocaleString()}</td>
                    <td>${facturasVenta.iva.toLocaleString()}</td>
                    <td>${facturasVenta.importe_total.toLocaleString()}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => navigate(`/editar-venta/${facturasVenta.id}`)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleEliminar(facturasVenta.id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">
                    No hay facturas de ventas registradas.
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

export default TablaVentasComp;
