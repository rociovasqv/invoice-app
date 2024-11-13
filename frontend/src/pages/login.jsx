import useLogin from '../hooks/useLogin';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const InicioSesion = () => {
    const {
      email,
      setEmail,
      password,
      setPassword,
      submitLogin,
    } = useLogin();

    const navigate = useNavigate();
  
    const onSubmitLogin = async (e) => {
      e.preventDefault();
      try {
        await submitLogin(e);
      } catch (err) {
        console.error("Error en el login:", err);
        navigate("/not-found", {
          state: { isErrorRole: false, message: err.message },
        });
      }
    };
    return (
        <Container className="pad my-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-left mb-4">Iniciar Sesión</h2>
                    <Form onSubmit={onSubmitLogin}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Nombre de Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresa tu nombre de usuario"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            Iniciar Sesión
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default InicioSesion;