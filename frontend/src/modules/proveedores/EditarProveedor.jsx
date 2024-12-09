import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { URL_PROVEEDORES,URL_PROVEEDORES_EDITAR } from "../../constants/constantes";

const EditarProveedorForm = () => {
  
  const [proveedor,setProveedor] = useState({})

  const estadoInicial = {
    id_cliente: "",
    razon_social_proveedor: "",
    cuit_proveedor: "",
  }

  const {id} = useParams()

  const navigate = useNavigate();
  
  const handleSubmit = async (e)=>{
    e.preventDefault()
    let response = await axios.put(URL_PROVEEDORES_EDITAR+"/"+id,{
      id_cliente : proveedor.id_cliente,
      razon_social_proveedor : proveedor.razon_social_proveedor,
      cuit_proveedor : proveedor.cuit_proveedor
    })
    if(response){
      alert("Proovedor Editado")
      navigate("/proveedores")
    }
  }
  const getData = async() => {
    try {
        let response = await axios.get(URL_PROVEEDORES+"/"+id)
        if(response.status === 200){
            setProveedor(response.data[0])
        }
    } catch (error) {
        alert("No se pudieron cargar los datos del proveedor")
    }
  } 
  
  const handleChange = (e) => {
    setProveedor({...proveedor,[e.target.name]:e.target.value})
  };

  useEffect(()=>{
    getData()
  },[])

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Registrar Proveedor</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
        <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="number"
                name="id_cliente"
                value={proveedor.id_cliente}
                onChange={handleChange}
                placeholder="Ej: 1 o 2"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Razón Social</Form.Label>
              <Form.Control
                type="text"
                name="razon_social_proveedor"
                value={proveedor.razon_social_proveedor}
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
                name="cuit_proveedor"
                value={proveedor.cuit_proveedor}
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
            onClick={() => navigate("/proveedores")}
          >
            Cancelar
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditarProveedorForm;
