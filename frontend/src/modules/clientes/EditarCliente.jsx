import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {URL_CLIENTES, URL_CLIENTES_EDITAR } from "../../constants/constantes";

const EditarClienteForm = ({ clienteInicial = null }) => {
  const [cliente, setCliente] = useState({
    razon_social: "",
    cuit: "",
    condicion_iva: "",
    domicilio_fiscal: "",
    ...clienteInicial,
  });

  const [error, setError] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  // Manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejar la acción de envío (crear o editar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmit(true);

    try {
      if (clienteInicial) {
        // Editar cliente
        await axios.put(`${URL_CLIENTES_EDITAR}/${clienteInicial.id_cliente}`, cliente);
        alert("Cliente editado exitosamente.");
      } else {
        // Crear cliente
        await axios.post(URL_CLIENTES_AGREGAR, cliente);
        alert("Cliente registrado exitosamente.");
      }
      navigate("/clientes"); // Redirigir a la lista de clientes
    } catch (err) {
      setError("Error al guardar los datos del cliente.");
    } finally {
      setIsSubmit(false);
    }
  };

  const getData = async()=> {
    let response = await axios.get(`${URL_CLIENTES}/${id_cliente}`)
    if(response.status === 200){
      setCliente(response.data[0])
    }
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">{clienteInicial ? "Editar Cliente" : "Registrar Cliente"}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Razón Social</Form.Label>
              <Form.Control
                type="text"
                name="razon_social"
                value={cliente.razon_social}
                onChange={handleChange}
                placeholder="Ej: Empresa XYZ"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>CUIT</Form.Label>
              <Form.Control
                type="text"
                name="cuit"
                value={cliente.cuit}
                onChange={handleChange}
                placeholder="Ej: 20-12345678-9"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Condición IVA</Form.Label>
              <Form.Control
                as="select"
                name="condicion_iva"
                value={cliente.condicion_iva}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una opción</option>
                <option value="Responsable Inscripto">Responsable Inscripto</option>
                <option value="Monotributista">Monotributista</option>
                <option value="Exento">Exento</option>
                <option value="Consumidor Final">Consumidor Final</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Domicilio Fiscal</Form.Label>
              <Form.Control
                type="text"
                name="domicilio_fiscal"
                value={cliente.domicilio_fiscal}
                onChange={handleChange}
                placeholder="Ej: Calle Falsa 123"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="text-center">
          <Button variant="primary" type="submit" disabled={isSubmit}>
            {isSubmit ? "Guardando..." : clienteInicial ? "Guardar Cambios" : "Registrar Cliente"}
          </Button>
          <Button
            variant="secondary"
            className="ms-3"
            onClick={() => navigate("/clientes")}
            disabled={isSubmit}
          >
            Cancelar
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditarClienteForm;