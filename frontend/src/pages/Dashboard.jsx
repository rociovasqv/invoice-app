import { Container, Row, Col, Card} from "react-bootstrap";
import { Link } from "react-router-dom"; 
import "../styles/dashboard.css";

const Dashboard = () => {
  const modules = [
    // { title: "Gestión de Compras", icon: "🛒", description: "Administra las compras realizadas.", path: "/compras" },
    { title: "Gestión de Compras y Ventas", icon: "💰", description: "Registra y gestiona las compras y ventas.", path: "/facturas" },
    { title: "Carga de Comprobantes", icon: "📄", description: "Simplifica la carga de comprobantes.", path: "/comprobantes" },
    { title: "Informes Impositivos", icon: "📊", description: "Genera informes de impuestos automáticamente.", path: "/informes" },
    { title: "Usuarios y Seguridad", icon: "🔒", description: "Administra roles y permisos.", path: "/usuarios" },
    // { title: "Gestión de Compras", icon: "🛒", description: "Administra las compras realizadas." },
    // { title: "Gestión de Ventas", icon: "💰", description: "Registra y gestiona las ventas." },
    // { title: "Carga de Comprobantes", icon: "📄", description: "Simplifica la carga de comprobantes." },
    // { title: "Informes Impositivos", icon: "📊", description: "Genera informes de impuestos automáticamente." },
    // { title: "Usuarios y Seguridad", icon: "🔒", description: "Administra roles y permisos." },
  ];

  return (
    <Container fluid className="pad dashboard-container">
      <Row className="text-center mb-4">
        <Col>
          <h1 className="dashboard-title">Panel Principal</h1>
        </Col>
      </Row>
      <Row>
        {modules.map((module, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Link to={module.path} style={{ textDecoration: 'none' }}>
            <Card className="dashboard-card" style={{ cursor: 'pointer' }}>
              <Card.Body>
                <div className="icon-container">{module.icon}</div>
                <Card.Title>{module.title}</Card.Title>
                <Card.Text>{module.description}</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
