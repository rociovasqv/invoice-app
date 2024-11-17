import { Container, Col, Row, Card} from 'react-bootstrap';
import { FaAward, FaBalanceScale, FaHandshake, FaLightbulb } from 'react-icons/fa';

import '../../styles/valoresSection.css'

// Array de datos para las tarjetas
const valores = [
  { title: "Calidad", desc: "Comprometidos con un servicio de excelencia.", icon: <FaAward /> },
  { title: "Transparencia", desc: "Comunicación clara y directa.", icon: <FaBalanceScale /> },
  { title: "Confianza", desc: "Relaciones basadas en la integridad.", icon: <FaHandshake /> },
  { title: "Innovación", desc: "Soluciones modernas y eficientes.", icon: <FaLightbulb /> }
];

const ValoresSection = () => (
  <Container className="valores-section">
    <h2 className="text-center text-uppercase mb-4">Nuestros Valores</h2>
    <Row className="justify-content-center">
      {valores.map((value, index) => (
        <Col key={index} xs={12} sm={6} md={3} className="d-flex">
          <Card className="carta-valor">
            <Card.Body>
              <div className="icon">{value.icon}</div>
              <Card.Title>{value.title}</Card.Title>
              <Card.Text>{value.desc}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default ValoresSection;