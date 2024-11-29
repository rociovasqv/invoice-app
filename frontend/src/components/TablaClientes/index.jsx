import { Table, Button, Container, Spinner, Alert, Row, Col } from "react-bootstrap";
import { FaEye,FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/facturaTabla.css";

import { URL_CLIENTES,URL_CLIENTES_ELIMINAR,URL_CLIENTES_EDITAR } from "../../constants/constantes";

const TablaClientesComp = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Obtener clientes desde la API
  const getClientes = async () => {
    try {
      const response = await axios.get(URL_CLIENTES);
      setClientes(response.data);
    } catch (error) {
      setError("Error al cargar los clientes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClientes();
  }, []);

  // Manejar eliminación de cliente
  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      try {
        await axios.put(`${URL_CLIENTES_ELIMINAR}/${id}`); // URL con el ID del cliente
        alert("Cliente eliminado exitosamente.");
        getClientes(); // Actualizar la lista después de eliminar
      } catch (error) {
        alert("Error al eliminar el cliente.");
      }
    }
  };

  return (
    <Container className="pad my-5">
      <h2 className="mb-4 text-center">Gestión de Clientes</h2>
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
                onClick={() => navigate("/registrar-cliente")}
              >
                Registrar Cliente
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Razón Social</th>
                <th>CUIT</th>
                <th>Condición IVA</th>
                <th>Domicilio Fiscal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes && clientes.length > 0 ? (
                clientes.map((cliente, index) => (
                  <tr key={cliente.id_cliente}>
                    <td>{index + 1}</td>
                    <td>{cliente.razon_social_cliente}</td>
                    <td>{cliente.cuit_cliente}</td>
                    <td>{cliente.condicion_iva}</td>
                    <td>{cliente.domicilio_fiscal}</td>
                    <td>
                      <Button
                      variant="primary"
                      size="sm"
                      className="me-2"
                      onClick={()=> navigate(`/clientes/${cliente.id_cliente}`)}
                      >
                        <FaEye />
                      </Button>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => navigate(`${URL_CLIENTES_EDITAR}/${cliente.id_cliente}`)} // Navegar a la edición
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleEliminar(cliente.id_cliente)} // Pasar ID del cliente
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No hay clientes registrados.
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

export default TablaClientesComp;
