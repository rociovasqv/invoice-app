import { Table, Button, Container, Spinner, Alert, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/facturaTabla.css";

import { URL_PROVEEDORES, URL_PROVEEDORES_ELIMINAR } from "../../constants/constantes";

const TablaProveedorComp = () => {
  const [proveedores, setproveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Obtener proveedores desde la API
  const getproveedores = async () => {
    try {
      const response = await axios.get(URL_PROVEEDORES);
      setproveedores(response.data);
    } catch (error) {
      setError("Error al cargar los proveedores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getproveedores();
  }, []);

  // Manejar eliminación de proveedor
  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este proveedor?")) {
      try {
        await axios.put(`${URL_PROVEEDORES_ELIMINAR}/${id}`); // URL con el ID del proveedor
        alert("Proveedor eliminado exitosamente.");
        getproveedores(); // Actualizar la lista después de eliminar
      } catch (error) {
        alert("Error al eliminar el proveedor.");
      }
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Gestión de Proveedores</h2>
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
                onClick={() => navigate("/registrar-proveedor")}
              >
                Registrar Proveedor
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>idProveedor</th>
                <th>Razón Social</th>
                <th>CUIT</th>
                <th>Cliente</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores && proveedores.length > 0 ? (
                proveedores.map((proveedor) => (
                  <tr key={proveedor.id_proveedor}>
                    <td>{proveedor.id_proveedor}</td>
                    <td>{proveedor.razon_social_proveedor}</td>
                    <td>{proveedor.cuit_proveedor}</td>
                    <td>{proveedor.id_cliente}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => navigate(`/editar-proveedor/${proveedor.id_proveedor}`)} // Navegar a la edición
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleEliminar(proveedor.id_proveedor)} // Pasar ID del proveedor
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No hay proveedores registrados.
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

export default TablaProveedorComp;