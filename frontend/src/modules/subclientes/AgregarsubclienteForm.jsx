import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { URL_SUBCLIENTES_AGREGAR } from "../../constants/constantes";

const AgregarSubclienteForm = () => {
  const [subcliente, setSubliente] = useState({
    id_cliente: "",
    razon_social_subcliente: "",
    cuit_subcliente: "",
  });


const {id} = useParams();

 useEffect(() => {
    if (id) {
      setSubliente((prev) => ({ ...prev, id_cliente: id }));
    }
  }, [id]);


const navigate = useNavigate();

const handleSubmit = async (e)=>{
  e.preventDefault()
  let response = await axios.post(URL_SUBCLIENTES_AGREGAR,{
    id_cliente : subcliente.id_cliente,
    razon_social_subcliente : subcliente.razon_social_subcliente,
    cuit_subcliente : subcliente.cuit_subcliente
  })
  if(response){
    alert("Subcliente agregado con éxitos")
    navigate(`/cliente/${subcliente.id_cliente}/subclientes`)
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
          <Button variant="primary" type="submit">
            Agregar
          </Button>
          <Button
            variant="secondary"
            className="ms-3"
            onClick={() => navigate(`/cliente/${subcliente.id_cliente}/subclientes`)}
            // disabled={isSubmit}
          >Cancelar
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AgregarSubclienteForm;


 // const [subcliente, setSubliente] = useState({
  //   razon_social: "",
  //   cuit: "",
  // });

  // const [error, setError] = useState(null);
  // const [isSubmit, setIsSubmit] = useState(false);
  // const navigate = useNavigate();

  // // Manejar los cambios en los campos del formulario
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setSubliente((prev) => ({
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
  //     if (subcliente) {
  //       // Editar cliente
  //       await axios.put(`${URL_SUBCLIENTES_EDITAR}/${subcliente.id_subcliente}`, subcliente);
  //       alert("Subcliente editado exitosamente.");
  //     } else {
  //       // Crear cliente
  //       await axios.post(URL_SUBCLIENTES_AGREGAR, subcliente);
  //       alert("Subcliente registrado exitosamente.");
  //     }
  //     navigate("/subclientes"); // Redirigir a la lista de clientes
  //   } catch (err) {
  //     setError("Error al guardar los datos del cliente.");
  //   } finally {
  //     setIsSubmit(false);
  //   }
  // };
