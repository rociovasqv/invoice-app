import useLogin from '../hooks/useLogin';
import { Container, Form, Button, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { useState } from 'react';
import axios from "axios"
import {URL_LOGIN} from ".././constants/constantes"

const InicioSesion = () => {
    const {
    //   submitLogin,
      error,
      loading
    } = useLogin();

    const [user,setuser] = useState("")

    const initialState = {
        nombre: "",
        password: ""
    }

    const navigate = useNavigate();
  
    const onSubmitLogin = async (e) => {
      e.preventDefault();

        let response = await axios.post(URL_LOGIN,{
            nombre : user.nombre,
            password: user.password
        });
        if(response){
            alert(response.data.message)
            navigate("/clientes")
        }else{
            alert(error.response.data.message)
        }
        // console.error("Error en el login:", err);
        // navigate("/not-found", {
        //   state: { isErrorRole: false, message: err.message },
        // });
        e.target.reset();
    };

    const handlechange= (e) =>{
        setuser({ ...user, [e.target.name]: e.target.value})
    }

    return (
        <main className='login-bg'>
            <Container className="pad my-5 login-card">
            <Card className='shadow-lg p-2 mb-1 bg-white rounded' >
                <Card.Body>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xs={12}>
                            <h2 className="mb-4">Iniciar Sesión</h2>
                            <p className=" mb-3 text-primary">¡Por favor, ingresa tu correo y contraseña!</p>
                            {error.error && <Alert variant="danger">{error.message}</Alert>}

                            <Form onSubmit={onSubmitLogin}>
                                <Form.Group className='md-3 text-start' controlId="formEmail">
                                    <Form.Label className='text-secondary'>Correo electrónico</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Ingresa tu correo electrónico"
                                        name='nombre'
                                        // value={email}
                                        onChange={handlechange}
                                        required/>
                                        <br/>
                                </Form.Group>

                                <Form.Group className='md-3 text-start' controlId="formPassword">
                                    <Form.Label className='text-secondary'>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Ingresa tu contraseña"
                                        name='password'
                                        // value={password}
                                        onChange={handlechange}
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

export default InicioSesion;