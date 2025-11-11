import  {useState, useEffect } from "react";
import { Table, Button, Container, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/userTabla.css";
import axios from "axios";
import {URL_USUARIOS} from "../../constants/constantes"

const UserTable = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const getAllUsers = async () => {
        let response = await axios.get(URL_USUARIOS)
        console.log(response.data)
        setUsuarios(response.data)
    }

    useEffect(() => {
        getAllUsers()
    }, []);

    const handleEdit = (id) => {
        navigate(`/usuarios/editar/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
            setLoading(true);
            try {
                await usuarios.deleteUser(id);
                setUsuarios((prev) => prev.filter((user) => user.id !== id));
            } catch (err) {
                setError(err.response?.data?.message || "Error al eliminar el usuario.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Container className="my-5">
            <h2 className="mb-4 text-center">Gestión de Usuarios</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre Usuario</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.length > 0 ? (
                            usuarios.map((usuario) => (
                                <tr key={usuario.id_usuario}>
                                    <td>{usuario.id_usuario}</td>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.nombre_rol}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleEdit(usuario.id)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(usuario.id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No hay usuarios registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
            <Button
                variant="primary"
                className="mt-3"
                onClick={() => navigate("/usuarios/registro")}
            >
                Crear Nuevo Usuario
            </Button>
        </Container>
    );
};

export default UserTable;
