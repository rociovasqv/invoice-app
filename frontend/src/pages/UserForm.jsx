import useLogin from '../hooks/useLogin';
import { Container, Form, Button, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/userForm.css';

const UserForm = () => {
    const {
      email,
      setEmail,
      password,
      setPassword,
      submitLogin,
      error,
      loading
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
        <main className='user-bg'>
            <Container className="pad my-5 user-card">
            <Card className='shadow-lg p-2 mb-1 bg-white rounded' >
                <Card.Body>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xs={12}>
                            <h2 className="mb-4">Editar usuario</h2>
                            <p className=" mb-3 text-primary">¡Por favor, ingresa los datos que necesitas editar!</p>
                            {error.error && <Alert variant="danger">{error.message}</Alert>}

                            <Form onSubmit={onSubmitLogin}>
                                <Form.Group className='md-3 text-start' controlId="formEmail">
                                    <Form.Label className='text-secondary'>Correo electrónico</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Ingresa tu correo electrónico"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required/>
                                        <br/>
                                </Form.Group>

                                <Form.Group className='md-3 text-start' controlId="formPassword">
                                    <Form.Label className='text-secondary'>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Ingresa tu contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required/>
                                        <br/>
                                </Form.Group>
                                <div className="mb-3">
                                    <p className="small">
                                    <a className="text-primary" href="#!">
                                        ¿Te olvidaste tu contraseña?
                                    </a>
                                    </p>
                                </div>
                                <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm"/> : "Ingresar"}
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

export default UserForm;