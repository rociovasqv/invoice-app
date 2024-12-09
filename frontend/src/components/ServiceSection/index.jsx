import { Container, Row, Col, Card } from "react-bootstrap";
import { FaUserTie, FaCalculator, FaFileInvoice, FaChartLine } from "react-icons/fa";
import fondoLateral from "../../imgs/fondoAmp.jpg";
import '../../styles/serviciosSection.css';

// Array de datos para las cartas
const valores = [
  { title: "Asesoramiento contable", desc: "Gestión integral para personas y empresas.", icon: <FaUserTie /> },
  { title: "Liquidación de impuestos", desc: "Cumplimiento normativo óptimo.", icon: <FaCalculator /> },
  { title: "Gestión de sueldos", desc: "Cálculo y liquidación precisa de salarios.", icon: <FaFileInvoice /> },
  { title: "Análisis financiero", desc: "Reportes y estrategias para decisiones clave.", icon: <FaChartLine /> },
];

const ServiceSection = () => (
  <Container fluid className="services-section vh-100 mb-5">
    <Row className="h-100 justify-content-center">
      {/* Imagen del lado izquierdo */}
      <Col md={4} className="p-5">
        <div
          className="service-bg"
          style={{
            backgroundImage: `url(${fondoLateral})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "35%",
            height: "100%",
          }}
        ></div>
      </Col>

      {/* Contenido del lado derecho */}
      <Col md={8}className="d-flex flex-column justify-content-center align-items-center" 
      style={{paddingLeft: "16%"}}>
        <h2 className="text-service text-center text-uppercase mb-5 mt-3">Nuestros Servicios</h2>
        <Row className="w-100 justify-content-md-start g-3">
          {valores.map((service, index) => (
            <Col md={7} lg={5} className="mb-4 d-flex justify-content-center" key={index}>
              <Card className="carta-servicio text-center">
                <Card.Body>
                  <div className="icon mb-3" style={{ fontSize: "2rem" }}>
                    {service.icon}
                  </div>
                  <Card.Title className="mb-2">{service.title}</Card.Title>
                  <Card.Text className="mb-0" style={{ fontSize: "0.95rem" }}>{service.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  </Container>
);

export default ServiceSection;

