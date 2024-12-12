import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import useUsuario from '../../hooks/useUsuario';
import '../../styles/userForm.css'

const UserForm = () => {
    const { 
        loading, 
        error, 
        handleSubmit,
        handleChange
    } = useUsuario();
  
    return (
        <main className='user-bg'>
            <Container className="pad my-5 user-card">
                <Card className='shadow-lg p-2 mb-1 bg-white rounded' >
                    <Card.Body>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xs={12}>
                                {/* {error.error && <Alert variant="danger">{error.message}</Alert>} */}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className='md-3 text-start'>
                                        <Form.Label className='text-secondary'>Nombre Usuario</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name='nombre'
                                            placeholder="Ingrese su nombre de usuario"
                                            onChange={handleChange}
                                            required/>
                                            <br/>
                                    </Form.Group>

                                    <Form.Group className='md-3 text-start'>
                                        <Form.Label className='text-secondary'>Contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name='password'
                                            placeholder="Ingresa la contraseña"
                                            onChange={handleChange}
                                            required/>
                                            <br/>
                                    </Form.Group>                    
                                    <Form.Group className='md-3 text-start' >
                                        <Form.Label className='text-secondary'>Rol</Form.Label>
                                        <Form.Select name='rol_id' onChange={handleChange} required>
                                        <option value="">Seleccione un Rol</option>
                                        <option value="1">Contador</option>
                                        <option value="2">Empleado</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
                                    {"Registrar"}
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