import { useState,useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { URL_SUBPROVEEDORES,URL_SUBPROVEEDORES_EDITAR } from "../../constants/constantes";

const Editarsubproveedores = () => {
  const [subproovedor,setSubproovedor] = useState({})

  const estadoInicial = {
    id_cliente: "",
    razon_social_subproveedor: "",
    cuit_subproveedor: "",
  }
  const {id} = useParams()

  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault()
    let response = await axios.put(URL_SUBPROVEEDORES_EDITAR+"/"+id,{
      id_cliente : subproovedor.id_cliente,
      razon_social_subproveedor : subproovedor.razon_social_subproveedor,
      cuit_subproveedor : subproovedor.cuit_subproveedor
    })
    if(response) {
      alert("Subproveedor Editado")
      navigate("/subproveedores")
    }
  }
  const getData = async() => {
    try {
        let response = await axios.get(URL_SUBPROVEEDORES+"/"+id)
        if(response.status === 200){
          setSubproovedor(response.data[0])
        }
    } catch (error) {
        alert("No se pudieron cargar los datos del Subproveedor")
    }
  }
  const handleChange = (e) => {
    setSubproovedor({...subproovedor,[e.target.name]:e.target.value})
  };

  useEffect(()=>{
    getData()
  },[])

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Agregar SubProveedor</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
            <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="number"
                name="id_cliente"
                value={subproovedor.id_cliente}
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
                name="razon_social_subproveedor"
                value={subproovedor.razon_social_subproveedor}
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
                name="cuit_subproveedor"
                value={subproovedor.cuit_subproveedor}
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
            onClick={() => navigate("/subproveedores")}
          >Cancelar
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default Editarsubproveedores;