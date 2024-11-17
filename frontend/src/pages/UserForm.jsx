import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import useUsuario from '../hooks/useUsuario';
import '../styles/userForm.css';

const UserForm = () => {
    const {
        usuario, 
        loading, 
        error, 
        isEdit,
        handleSubmitUser,
        actualizarUsuario
    } = useUsuario();
  
    return (
        <main className='user-bg'>
            <Container className="pad my-5 user-card">
                <Card className='shadow-lg p-2 mb-1 bg-white rounded' >
                    <Card.Body>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xs={12}>
                                <h2 className="mb-4">Editar usuario</h2>
                                {isEdit ? "Editar" : "Crear"} usuario
                                <p className=" mb-3 text-primary">¡Por favor, {isEdit ? "actualice" : "rellene"} los datos del usuario!</p>
                                {error.error && <Alert variant="danger">{error.message}</Alert>}
                                <Form onSubmit={handleSubmitUser}>
                                    <Form.Group className='md-3 text-start' controlId="formName">
                                        <Form.Label className='text-secondary'>Nombres</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingresa el/los nombre/s"
                                            value={usuario.nombre}
                                            onChange={actualizarUsuario}
                                            required/>
                                            <br/>
                                    </Form.Group>

                                    <Form.Group className='md-3 text-start' controlId="formLastName">
                                        <Form.Label className='text-secondary'>Apellidos</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingresa el/los apellido/s"
                                            value={usuario.apellido}
                                            onChange={actualizarUsuario}
                                            required/>
                                            <br/>
                                    </Form.Group>

                                    <Form.Group className='md-3 text-start' controlId="formEmail">
                                        <Form.Label className='text-secondary'>Correo electrónico</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Ingresa el correo electrónico"
                                            value={usuario.email}
                                            onChange={actualizarUsuario}
                                            required/>
                                            <br/>
                                    </Form.Group>

                                    <Form.Group className='md-3 text-start' controlId="formDni">
                                        <Form.Label className='text-secondary'>DNI</Form.Label>
                                        <Form.Control
                                            placeholder="Ingresa el DNI"
                                            value={usuario.dni}
                                            onChange={actualizarUsuario}
                                            required/>
                                            <br/>
                                    </Form.Group>
                                    
                                    <Form.Group className='md-3 text-start' controlId="formRol">
                                        <Form.Select className='text-secondary'>Rol</Form.Select>
                                        <Form.Control
                                            placeholder="Ingresa el rol"
                                            value={usuario.rol}
                                            onChange={actualizarUsuario} //Aquí modificar de acuerdo a los roles diseñados para los usuarios según la lógica del backend
                                            required/>
                                            <br/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
                                    {isEdit ? "Actualizar" : "Crear"}
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