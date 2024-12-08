import { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { URL_PROVEEDORES_AGREGAR } from "../../constants/constantes";

const AgregarProveedorForm = () => {
  
  const [proveedor,setProveedor] = useState()

  const estadoInicial = {
    id_cliente: "",
    razon_social_proveedor: "",
    cuit_proveedor: "",
  }

  const navigate = useNavigate();
  
  const handleSubmit = async (e)=>{
    e.preventDefault()
    let response = await axios.post(URL_PROVEEDORES_AGREGAR,{
      id_cliente : proveedor.id_cliente,
      razon_social_proveedor : proveedor.razon_social_proveedor,
      cuit_proveedor : proveedor.cuit_proveedor
    })
    if(response){
      alert("Se agrego Proveedor")
      navigate("/proveedores")
    }
  }
  
  const handleChange = (e) => {
    setProveedor({...proveedor,[e.target.name]:e.target.value})
  };
  // const [proveedor, setProveedor] = useState({
  //   razon_social: "",
  //   cuit: "",
  // });

  // const [error, setError] = useState(null);
  // const [isSubmit, setIsSubmit] = useState(false);
  // const navigate = useNavigate();

  // // Manejar los cambios en los campos del formulario
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setProveedor((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // // Manejar la acción de envío (crear o editar)
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(null);
  //   setIsSubmit(true);

  //   try {
  //     if (proveedor) {
  //       // Editar proveedor
  //       await axios.put(`${URL_PROVEEDORES_EDITAR}/${proveedor.id_proveedor}`, proveedor);
  //       alert("Proveedor editado exitosamente.");
  //     } else {
  //       // Crear proveedor
  //       await axios.post(URL_PROVEEDORES_AGREGAR, proveedor);
  //       alert("Proveedor registrado exitosamente.");
  //     }
  //     navigate("/proveedores"); // Redirigir a la lista de proveedores
  //   } catch (err) {
  //     setError("Error al guardar los datos del proveedor.");
  //   } finally {
  //     setIsSubmit(false);
  //   }
  // };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Registrar Proveedor</h2>
      {/* {error && <Alert variant="danger">{error}</Alert>} */}
      <Form onSubmit={handleSubmit}>
        <Row>
        <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="number"
                name="id_cliente"
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
            {/* {isSubmit ? "Guardando..." : proveedor ? "Guardar Cambios" : "Registrar proveedor"} */}
          </Button>
          <Button
            variant="secondary"
            className="ms-3"
            onClick={() => navigate("/proveedores")}
            // disabled={isSubmit}
          >
            Cancelar
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AgregarProveedorForm;
