import { Table, Button, Container, Spinner, Alert, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/facturaTabla.css";

import { URL_SUBPROVEEDORES , URL_SUBPROVEEDORES_ELIMINAR } from "../../constants/constantes";

const TablaSubproveedores = () => {
    const [subproveedores, setSubproveedores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const getSubproveedores = async () => {
        try {
            const response = await axios.get(URL_SUBPROVEEDORES);
            setSubproveedores(response.data);
        } catch (error) {
            setError("Error al cargar los subproveedores.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getSubproveedores();
    }, []);

    const handleEliminar = async (id_subproveedor) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este proveedor?")) {
            try {
                await axios.delete(`${URL_SUBPROVEEDORES_ELIMINAR}/${id_subproveedor}`);
                alert("Proveedor eliminado exitosamente.");
                getSubproveedores();
            } catch (error) {
                alert("Error al eliminar el subproveedor.");
            }
        }
    };

  return (
    <Container className="pad my-5">
      <h2 className="mb-4 text-center">Gestión de subproveedores</h2>
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
                onClick={() => navigate("/registrar-subproveedor")}
              >
                Registrar subproveedor
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>idSubproveedor</th>
                <th>Razón Social</th>
                <th>CUIT</th>
                <th>Clientes</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {subproveedores && subproveedores.length > 0 ? (
                subproveedores.map((subproveedor) => (
                  <tr key={subproveedor.id_subproveedor}>
                    <td>{subproveedor.id_subproveedor}</td>
                    <td>{subproveedor.razon_social_subproveedor}</td>
                    <td>{subproveedor.cuit_subproveedor}</td>
                    <td>{subproveedor.id_cliente}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => navigate(`/editar-subcliente/${subproveedor.id_subproveedor}`)} // Navegar a la edición
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleEliminar(subproveedor.id_subproveedor)} // Pasar ID del cliente
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No hay subproveedores registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
}

export default TablaSubproveedores;