import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import '../../styles/navbar.css'

const NavbarComp = () => {

    const NavList = () => (
        <>
            <Nav.Link as={Link} to="/" className='active' aria-current="page">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/quienes-somos" className="">¿Quiénes somos?</Nav.Link>
            <Nav.Link as={Link} to="/services" className="">Servicios</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="">Contacto</Nav.Link>
        </>
    );

    return (
        <Navbar
        bg="light" data-bs-theme="light"
        expand="md p-3"
        fixed="top"
        >
            <Container fluid>
                {/* Logo */}
                <Navbar.Brand as={Link} to="/">
                    <span id="logotitle" style={{ color: '#105586', fontWeight: 'bold', fontFamily:'sans-serif' }}>Estudio Contable Ampuero</span>
                </Navbar.Brand>

                {/* Botón de menú para pantallas pequeñas */}
                <Navbar.Toggle aria-controls="menu" />

                {/* Menú colapsable */}
                <Navbar.Collapse id="menu">
                    <Nav className="ms-auto">
                        <NavList/>
                        <Nav to="/login" className="ms-3">
                        <Button variant="outline-primary">Iniciar Sesión</Button>
                        </Nav>
                    </Nav>

                    {/* Enlaces a redes sociales (solo en pantallas pequeñas) */}
                    <div className="d-md-none mt-3">
                        <hr style={{ borderColor: '#b0b0b0' }} />
                        <ul className="navbar-nav flex-row flex-wrap justify-content-around">
                            <li className="nav-item col-5 col-md-3 mb-2 me-1 p-3 text-white">
                                <i className="bi bi-twitter"></i>
                                <a href="#" className="redes"> Twitter</a>
                            </li>
                            <li className="nav-item col-5 col-md-3 mb-2 me-1 p-3 text-white">
                                <i className="bi bi-facebook"></i>
                                <a href="#" className="redes"> Facebook</a>
                            </li>
                            <li className="nav-item col-5 col-md-3 mb-2 me-1 p-3 text-white">
                                <i className="bi bi-instagram"></i>
                                <a href="#" className="redes"> Instagram</a>
                            </li>
                            <li className="nav-item col-5 col-md-3 mb-2 me-1 p-3 text-white">
                                <i className="bi bi-whatsapp"></i>
                                <a href="#" className="redes"> WhatsApp</a>
                            </li>
                        </ul>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComp;
