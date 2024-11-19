import { Table, Button, Container, Spinner, Alert, Form, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useFacturas from "../../hooks/useFacturas";
import "../../styles/facturaTabla.css";


const TablaFacturaComp = () => {
  const {
    filteredFacturas,
    loading,
    error,
    filtro,
    handleFilterChange,
    eliminarFactura,
  } = useFacturas();

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta factura?")) {
      try {
        await eliminarFactura(id);
        alert("Factura eliminada exitosamente");
      }
      catch(error){
        alert("Error al eliminar la factura");
      }
  }}

  const navigate = useNavigate()

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Gestión de Facturas</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Row className="mb-3">
            <Col md={4}>
            <h4>Tipo de facturas:</h4>
              <Form.Select value={filtro} onChange={(e) => handleFilterChange(e.target.value)}>
                <option value="todas">Todas</option>
                <option value="compra">Facturas de Compras</option>
                <option value="venta">Facturas de Ventas</option>
              </Form.Select>
            </Col>
            <Col>
            <Button
                variant="primary"
                className="mt-3"
                onClick={() => navigate("/registrar-factura")} // Navegar a la página para crear una nueva factura
            >
                Crear Nueva Factura
            </Button>
            </Col>
          </Row>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Fecha</th>
                <th>Número</th>
                <th>Tipo</th>
                <th>Cliente/Proveedor</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredFacturas.length > 0 ? (
                filteredFacturas.map((factura, index) => (
                  <tr key={factura.id}>
                    <td>{index + 1}</td>
                    <td>{factura.fecha}</td>
                    <td>{factura.nro_factura}</td>
                    <td>{factura.tipo === "compra" ? "Compra" : "Venta"}</td>
                    <td>{factura.cliente || factura.proveedor}</td>
                    <td>${factura.importe_total.toLocaleString()}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => console.log("Editar factura", factura.id)}
                      >
                        <FaEdit />
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleEliminar(factura.id)}
                        disabled={loading}
                      >
                        <FaTrash/>
                        {loading ? "Eliminando..." : "Eliminar"}
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No hay facturas registradas.
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

export default TablaFacturaComp;