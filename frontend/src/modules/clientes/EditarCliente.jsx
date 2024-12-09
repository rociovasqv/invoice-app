import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {URL_CLIENTES ,URL_CLIENTES_EDITAR} from "../../constants/constantes";

const EditarClienteForm = () => {

  const [cliente,setCliente] = useState({})

  const estadoInicial = {
    razon_social_cliente: "",
    cuit_cliente: "",
    condicion_iva: "",
    domicilio_fiscal: "",
  }

  const {id} = useParams()

  const navigate = useNavigate();
  
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      
      let response = await axios.put(URL_CLIENTES_EDITAR+"/"+id,{
        razon_social_cliente : cliente.razon_social_cliente,
        cuit_cliente : cliente.cuit_cliente,
        condicion_iva : cliente.condicion_iva,
        domicilio_fiscal : cliente.domicilio_fiscal
      })
      if(response.status === 200){
        alert("Cliente editado")
        navigate("/clientes")
      }
    } catch (error) {
      console.error("Error al editar el cliente: ", error);
      alert("hubo un error al editar el cliente")
    }
  }
  
  
  const getData = async() => {
    try {
      let response = await axios.get(URL_CLIENTES+"/"+id)
      console.log(response.data)
      if(response.status === 200) {
        setCliente(response.data[0])
      }  
    } catch (error) {
      alert("no se pudieron cargar los datos del cliente")    
    }
  }
  const handleChange = (e) => {
    setCliente({...cliente,[e.target.name]:e.target.value})
  };

  useEffect(()=>{
    getData()
  },[])      

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Editar Cliente</h2>
      {/* {error && <Alert variant="danger">{error}</Alert>} */}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Razón Social</Form.Label>
              <Form.Control
                type="text"
                name="razon_social_cliente"
                value={cliente.razon_social_cliente || ""}
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
                name="cuit_cliente"
                value={cliente.cuit_cliente || ""}
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
                value={cliente.condicion_iva || ""}
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
                value={cliente.domicilio_fiscal || ""}
                onChange={handleChange}
                placeholder="Ej: Calle Falsa 123"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="text-center">
          <Button variant="warning" type="submit">
            Editar
            {/* {isSubmit ? "Guardando..." : clienteInicial ? "Guardar Cambios" : "Registrar Cliente"} */}
          </Button>
          <Button
            variant="secondary"
            className="ms-3"
            onClick={() => navigate("/clientes")}
            // disabled={isSubmit}
          >
            Cancelar
          </Button>
        </div>
      </Form>
      
    </Container>
  );
};

export default EditarClienteForm;
