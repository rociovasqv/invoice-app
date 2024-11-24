import { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext'; // Importa el contexto de autenticación
import { URL_LOGIN } from "../constants/constantes";
import '../styles/login.css';

const InicioSesion = () => {
    const [userInput, setUserInput] = useState({ nombre: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { login } = useAuth(); // Obtiene la función `login` del contexto

    const onSubmitLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Realiza la solicitud de inicio de sesión
            const response = await axios.post(
                URL_LOGIN,
                {
                    nombre: userInput.nombre,
                    password: userInput.password,
                },
                { withCredentials: true } // Asegura que las cookies se envíen con la solicitud
            );

            if (response && response.data.user) {
                // Llama a la función `login` del contexto para almacenar los datos del usuario
                login(response.data.user, true); // Almacenar en localStorage si se necesita persistencia

                // Redirige a la página principal o a una página protegida
                navigate("/clientes");
            } else if (response.data.message) {
                setError(response.data.message); // Muestra cualquier mensaje de error devuelto por el backend
            }
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value });
    };

    return (
        <main className='login-bg'>
            <Container className="pad my-5 login-card">
                <Card className='shadow-lg p-2 mb-1 bg-white rounded'>
                    <Card.Body>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xs={12}>
                                <h2 className="mb-4">Iniciar Sesión</h2>
                                <p className="mb-3 text-primary">¡Por favor, ingresa tu nombre de usuario y contraseña!</p>

                                {error && <Alert variant="danger">{error}</Alert>}

                                <Form onSubmit={onSubmitLogin}>
                                    <Form.Group className='md-3 text-start' controlId="formEmail">
                                        <Form.Label className='text-secondary'>Nombre de usuario</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingresa tu nombre de usuario"
                                            name='nombre'
                                            onChange={handleChange}
                                            required />
                                    </Form.Group>

                                    <Form.Group className='md-3 text-start' controlId="formPassword">
                                        <Form.Label className='text-secondary'>Contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Ingresa tu contraseña"
                                            name='password'
                                            onChange={handleChange}
                                            required />
                                    </Form.Group>

                                    <div className="mb-3">
                                        <p className="small">
                                            <a className="text-primary" href="#!">
                                                ¿Te olvidaste tu contraseña?
                                            </a>
                                        </p>
                                    </div>

                                    <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
                                        {loading ? <Spinner animation="border" size="sm" /> : "Ingresar"}
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </main>
    );
};

export default InicioSesion;
