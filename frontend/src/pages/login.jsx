import { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { URL_LOGIN } from "../constants/constantes";
import '../styles/login.css';

const InicioSesion = () => {
    const [user, setUser] = useState({ nombre: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmitLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Realiza la solicitud de login
            let response = await axios.post(URL_LOGIN, {
                nombre: user.nombre,
                password: user.password
            }, { withCredentials: true }); // Asegura que las cookies se envíen con la solicitud

            if (response && response.data.message) {
                alert(response.data.message);

                // Si el login es exitoso, guarda el token en localStorage (si aplica)
                if (response.data.token) {
                    localStorage.setItem('authToken', response.data.token); // Guarda el token en localStorage
                }

                // Redirige a la página de clientes
                navigate("/clientes");
            }
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }

        // Limpiar formulario
        e.target.reset();
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <main className='login-bg'>
            <Container className="pad my-5 login-card">
                <Card className='shadow-lg p-2 mb-1 bg-white rounded'>
                    <Card.Body>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xs={12}>
                                <h2 className="mb-4">Iniciar Sesión</h2>
                                <p className="mb-3 text-primary">¡Por favor, ingresa tu correo y contraseña!</p>

                                {error && <Alert variant="danger">{error}</Alert>}

                                <Form onSubmit={onSubmitLogin}>
                                    <Form.Group className='md-3 text-start' controlId="formEmail">
                                        <Form.Label className='text-secondary'>Correo electrónico</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Ingresa tu correo electrónico"
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
