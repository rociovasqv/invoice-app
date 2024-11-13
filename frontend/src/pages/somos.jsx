import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import MicaelaImg from '../imgs/MicaelaAmpuero.jpg';
import NelsonImg from '../imgs/NelsonJulioCesarAmp.jpg';
import AylenImg from '../imgs/AylenAmp.jpg';
import SalomonImg from '../imgs/Salomon.jpg';

const QuienesSomos = () => {
    return (
        <Container className="pad my-5">
            <h1 className="text-center mb-4">Quiénes Somos</h1>
            <p className="text-center mb-5">
                Somos un equipo apasionado dedicado a proporcionar las mejores soluciones para nuestros clientes. 
                Nuestra misión es ofrecer servicios de alta calidad que superen las expectativas.
            </p>
            <Row>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Img variant="top" src={MicaelaImg} />
                        <Card.Body>
                            <Card.Title>Micaela Ampuero</Card.Title>
                            <Card.Text>
                                Breve descripción del miembro 1. Su experiencia y contribuciones al equipo.
                            </Card.Text>
                            <Button variant="primary">Leer más</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Img variant="top" src={NelsonImg} />
                        <Card.Body>
                            <Card.Title>Nombre del Miembro 2</Card.Title>
                            <Card.Text>
                                Breve descripción del miembro 2. Su experiencia y contribuciones al equipo.
                            </Card.Text>
                            <Button variant="primary">Leer más</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Img variant="top" src={AylenImg}/>
                        <Card.Body>
                            <Card.Title>Nombre del Miembro 3</Card.Title>
                            <Card.Text>
                                Breve descripción del miembro 3. Su experiencia y contribuciones al equipo.
                            </Card.Text>
                            <Button variant="primary">Leer más</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Img variant="top" src={SalomonImg} />
                        <Card.Body>
                            <Card.Title>Micaela Ampuero</Card.Title>
                            <Card.Text>
                                Breve descripción del miembro 1. Su experiencia y contribuciones al equipo.
                            </Card.Text>
                            <Button variant="primary">Leer más</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default QuienesSomos;