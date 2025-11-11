import { Form, Button, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import useEditarVentaForm from "../../hooks/useEditarVenta";

const EditarVentaForm = () => {
  const {
    formData,
    isSubmit,
    successMessage,
    error,
    handleChange,
    calcularTotal,
    handleSubmit,
  } = useEditarVentaForm();

  return (
    <Container className="pad my-5 mt-1">
      <h2 className="text-center mb-4">Editar factura de compra</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
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
              <Form.Select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="Nota de Débito A">Nota de Débito A</option>
                <option value="Nota de Débito B">Nota de Débito B</option>
                <option value="Nota de Débito C">Nota de Débito C</option>
                <option value="Nota de Crédito A">Nota de Crédito A</option>
                <option value="Nota de Crédito B">Nota de Crédito B</option>
                <option value="Nota de Crédito C">Nota de Crédito C</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>CUIT del cliente</Form.Label>
              <Form.Control
                type="text"
                name="cuit_cliente"
                value={formData.cuit_cliente}
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
                min={1}
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
                readOnly
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
          {isSubmit ? <Spinner animation="border" size="sm" /> : "Actualizar"}
        </Button>
      </Form>
    </Container>
  );
};

export default EditarVentaForm;
