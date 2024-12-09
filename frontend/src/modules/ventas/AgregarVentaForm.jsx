import { Form, Button, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import useVentaForm from "../../hooks/useVentaForm";

const AgregarVentaForm = () => {
    const {
        formData,
        isSubmit,
        successMessage,
        error,
        handleChange,
        calcularTotal,
        handleSubmit,
      } = useVentaForm()
  return (
    <Container className="pad my-5 mt-1">
      <h2 className="text-center mb-4">Registrar factura de venta</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        {/* <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="number"
                name="id_cliente"
                value={formData.id_cliente}
                onChange={handleChange}
                placeholder="ID del cliente"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Subcliente</Form.Label>
              <Form.Control
                type="text"
                name="id_subcliente"
                value={formData.id_subcliente}
                onChange={handleChange}
                placeholder="ID del subcliente"
              />
            </Form.Group>
          </Col>
        </Row> */}
          <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Número de Factura</Form.Label>
              <Form.Control
                type="text"
                name="nro_factura"
                value={formData.nro_factura}
                onChange={handleChange}
                placeholder="Número de factura"
                required
              />
            </Form.Group>
          </Col>
        <Col md={4}>
          <Form.Group>
              <Form.Label>Fecha de Factura</Form.Label>
              <Form.Control
                type="date"
                name="fecha_factura"
                value={formData.fecha_factura}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
          <Form.Group>
              <Form.Label>Tipo de Factura</Form.Label>
              <Form.Select name="tipo" value={formData.tipo} onChange={handleChange}>
                <option value="compra">A</option>
                <option value="venta">B</option>
                <option value="venta">C</option>
                <option value="venta">E</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                name="cliente"
                value={formData.nombre_cliente}
                onChange={handleChange}
                placeholder="Nombre del cliente"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>CUIT del cliente</Form.Label>
              <Form.Control
                type="number"
                name="cuit"
                value={formData.cuit}
                onChange={handleChange}
                placeholder="CUIT del cliente"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Importe Neto</Form.Label>
              <Form.Control
                type="number"
                name="importe_neto"
                value={formData.importe_neto}
                onChange={handleChange}
                onBlur={calcularTotal}
                step="0.01"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Importe IVA</Form.Label>
              <Form.Control
                type="number"
                name="importe_iva"
                value={formData.importe_iva}
                onChange={handleChange}
                onBlur={calcularTotal}
                step="0.01"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Importe Total</Form.Label>
              <Form.Control
                type="number"
                name="importe_total"
                value={formData.importe_total}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary" disabled={isSubmit}>
          {isSubmit ? <Spinner animation="border" size="sm" /> : "Registrar"}
        </Button>
      </Form>
    </Container>
  );
};

export default AgregarVentaForm;