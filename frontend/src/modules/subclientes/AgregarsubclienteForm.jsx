import { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { URL_SUBCLIENTES_AGREGAR } from "../../constants/constantes";

const AgregarSubclienteForm = () => {
 const [subcliente,setSubliente] = useState()

 const estadoInicial = {
  id_cliente: "",
  razon_social_subcliente: "",
  cuit_subcliente: "",
}

const navigate = useNavigate();

const handleSubmit = async (e)=>{
  e.preventDefault()
  let response = await axios.post(URL_SUBCLIENTES_AGREGAR,{
    id_cliente : subcliente.id_cliente,
    razon_social_subcliente : subcliente.razon_social_subcliente,
    cuit_subcliente : subcliente.cuit_subcliente
  })
  if(response){
    alert("Se agrego Proveedor")
    navigate("/subclientes")
  }
}

const handleChange = (e) => {
  setSubliente({...subcliente,[e.target.name]:e.target.value})
};

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Agregar Subcliente</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
            <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="number"
                name="id_cliente"
                onChange={handleChange}
                placeholder="Ej:1,2,3"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Razón Social</Form.Label>
              <Form.Control
                type="text"
                name="razon_social_subcliente"
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
                name="cuit_subcliente"
                onChange={handleChange}
                placeholder="Ej: 20-12345678-9"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="text-center">
          <Button variant="primary" type="submit">
            Agregar
          </Button>
          <Button
            variant="secondary"
            className="ms-3"
            onClick={() => navigate("/subclientes")}
          >Cancelar
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AgregarSubclienteForm;


