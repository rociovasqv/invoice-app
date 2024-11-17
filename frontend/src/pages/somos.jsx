import { Container, Row, Col, Card } from 'react-bootstrap';

// Importación de imágenes
import MicaelaImg from '../imgs/MicaelaAmpuero.jpg';
import NelsonImg from '../imgs/NelsonJulioCesarAmp.jpg';
import AylenImg from '../imgs/AylenAmp.jpg';
import SalomonImg from '../imgs/Salomon.jpg';

// Estilos
import '../styles/somos.css';

// Datos del equipo
const teamData = [
    {
        id: 1,
        image: MicaelaImg,
        name: 'Micaela Ampuero',
        designation: 'CEO',
        description: 'Micaela tiene más de 10 años de experiencia en gestión de equipos y liderazgo estratégico.'
    },
    {
        id: 2,
        image: NelsonImg,
        name: 'Nelson Julio César',
        designation: 'Contador',
        description: 'Nelson es un experto en tecnología con una sólida trayectoria en desarrollo de software e innovación.'
    },
    {
        id: 3,
        image: AylenImg,
        name: 'Aylen Ampuero',
        designation: 'Contadora',
        description: 'Aylen es responsable de las operaciones diarias y optimización de procesos dentro de la organización.'
    },
    {
        id: 4,
        image: SalomonImg,
        name: 'Salomón Pérez',
        designation: 'Contador',
        description: 'Salomón gestiona las finanzas y la planificación estratégica para asegurar un crecimiento sostenible.'
    }
];

const QuienesSomos = () => {
    return (
        <Container className="pad teams-block my-5">
            <h1 className="text-center mb-4">¿Quiénes somos?</h1>
            <p className="text-center mb-5">
                Somos un equipo apasionado dedicado a proporcionar las mejores soluciones para nuestros clientes. 
                Nuestra misión es ofrecer servicios de alta calidad que superen las expectativas.
            </p>
            <Row>
                {teamData.map((teamMember) => (
                    <Col xs={12} sm={6} md={4} lg={3} key={teamMember.id} className="mb-4">
                        <Card className="image">
                            <Card.Img variant="top" src={teamMember.image} alt={teamMember.name} />
                            <Card.Body>
                                <Card.Title>{teamMember.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted designation">{teamMember.designation}</Card.Subtitle>
                                <Card.Text className='teaminfo'>{teamMember.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default QuienesSomos;

