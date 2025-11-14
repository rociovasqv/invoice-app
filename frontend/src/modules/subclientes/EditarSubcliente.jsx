import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { URL_SUBCLIENTES,URL_SUBCLIENTES_EDITAR } from "../../constants/constantes";

const EditarSubclienteForm = () => {
 const [subcliente,setSubliente] = useState({estadoInicial})

 const estadoInicial = {
  id_cliente: "",
  razon_social_subcliente: "",
  cuit_subcliente: "",
}
const {id} = useParams()

const navigate = useNavigate();

const handleSubmit = async (e)=>{
  e.preventDefault()
  let response = await axios.put(URL_SUBCLIENTES_EDITAR+"/"+id,{
    id_cliente : subcliente.id_cliente,
    razon_social_subcliente : subcliente.razon_social_subcliente,
    cuit_subcliente : subcliente.cuit_subcliente
  })
  if(response){
    alert("Subcliente Editado")
    navigate(`/cliente/${subcliente.id_cliente}/subclientes`)
  }
}
const getData = async() => {
  try {
      let response = await axios.get(URL_SUBCLIENTES+"/"+id)
      if(response.status === 200){
          setSubliente(response.data[0])
      }
  } catch (error) {
      alert("No se pudieron cargar los datos del Subcliente")
  }
} 

const handleChange = (e) => {
  setSubliente({...subcliente,[e.target.name]:e.target.value})
};

useEffect(()=>{
  getData()
},[])

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Editar Subcliente</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
            <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="number"
                name="id_cliente"
                value={subcliente.id_cliente}
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
                value={subcliente.razon_social_subcliente}
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
                value={subcliente.cuit_subcliente}
                onChange={handleChange}
                placeholder="Ej: 20-12345678-9"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="text-center">
          <Button variant="warning" type="submit">
            Editar
          </Button>
          <Button
            variant="secondary"
            className="ms-3"
            onClick={() => navigate(`/cliente/${subcliente.id_cliente}/subclientes`)}
          >Cancelar
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditarSubclienteForm;
