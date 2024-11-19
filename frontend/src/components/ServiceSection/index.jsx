import { Container, Row, Col, Card } from "react-bootstrap";
import { FaUserTie, FaCalculator, FaFileInvoice, FaChartLine } from "react-icons/fa";

import '../../styles/serviciosSection.css';

// Array de datos para las cartas
const valores = [
  { title: "Asesoramiento contable", desc: "Gestión integral para personas y empresas.", icon: <FaUserTie /> },
  { title: "Liquidación de impuestos", desc: "Cumplimiento normativo óptimo.", icon: <FaCalculator /> },
  { title: "Gestión de sueldos", desc: "Cálculo y liquidación precisa de salarios.", icon: <FaFileInvoice /> },
  { title: "Análisis financiero", desc: "Reportes y estrategias para decisiones clave.", icon: <FaChartLine /> },
];

const ServiceSection = () => (
  <Container className="services-section">
    <h2 className="text-center text-uppercase mb-4">Nuestros Servicios</h2>
    <Row className="justify-content-center">
      {valores.map((service, index) => (
        <Col md={3} key={index}>
          <Card className="carta-servicio text-center">
            <Card.Body>
              <div className="icon mb-3" style={{ fontSize: "2rem" }}>
                {service.icon}
              </div>
              <Card.Title>{service.title}</Card.Title>
              <Card.Text>{service.desc}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default ServiceSection;
