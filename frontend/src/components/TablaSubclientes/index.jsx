import { Table, Button, Container, Spinner, Alert, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/facturaTabla.css";

import { URL_SUBCLIENTES, URL_SUBCLIENTES_EDITAR, URL_SUBCLIENTES_ELIMINAR } from "../../constants/constantes";

const TablaSublientesComp = () => {
  const [subclientes, setSubclientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Obtener subclientes desde la API
  const getSubclientes = async () => {
    try {
      const response = await axios.get(URL_SUBCLIENTES);
      setSubclientes(response.data);
    } catch (error) {
      setError("Error al cargar los subclientes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubclientes();
  }, []);

  // Eliminar subcliente
  const handleEliminar = async (id_subcliente) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      try {
        await axios.delete(`${URL_SUBCLIENTES_ELIMINAR}/${id_subcliente}`); // URL con el ID del subcliente
        alert("Cliente eliminado exitosamente.");
        getSubclientes(); // Actualizar la lista después de eliminar
      } catch (error) {
        alert("Error al eliminar el cliente.");
      }
    }
  };

  return (
    <Container className="pad my-5">
      <h2 className="mb-4 text-center">Gestión de subclientes</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Row className="mb-3">
            <Col md={4}>
              <Button
                variant="primary"
                className="mt-3"
                onClick={() => navigate("/registrar-subcliente")}
              >
                Registrar subliente
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Razón Social</th>
                <th>CUIT</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {subclientes && subclientes.length > 0 ? (
                subclientes.map((subcliente, index) => (
                  <tr key={subcliente.id_subcliente}>
                    <td>{index + 1}</td>
                    <td>{subcliente.razon_social_subcliente}</td>
                    <td>{subcliente.cuit_subcliente}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => navigate(`${URL_SUBCLIENTES_EDITAR}/${subcliente.id_subcliente}`)} // Navegar a la edición
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleEliminar(subcliente.id_subcliente)} // Pasar ID del cliente
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No hay subclientes registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default TablaSublientesComp;