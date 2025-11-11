import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Image } from "react-bootstrap";

import logoAmp from '../../logos/logoAmpNav.png';
import '../../styles/navbar.css';

const NavbarComp = () => {

    const NavList = () => (
        <>
            <Nav.Link as={Link} to="/" className='' aria-current="page">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/quienes-somos" className="">¿Quiénes somos?</Nav.Link>
            <Nav.Link as={Link} to="/servicios" className="">Servicios</Nav.Link>
            <Nav.Link as={Link} to="/contacto" className="">Contacto</Nav.Link>
            <Nav.Link as={Link} to="/inicio-sesion" className="ms-3">
                <Button variant="outline-primary" className='me-4'>Iniciar Sesión</Button>
            </Nav.Link>

        </>
    );
    return (
        <header>
            <Navbar
                bg="light" data-bs-theme="light"
                expand="md p-3"
                fixed="top">
                <Container fluid id='navbar'>
                    {/* Logo */}
                    <Navbar.Brand as={Link} to="/">
                        <Image className='logonav' src={logoAmp}></Image>
                        <span id="logotitle">Estudio Contable Ampuero & Asoc.</span>
                    </Navbar.Brand>

                    {/* Botón de menú para pantallas pequeñas */}
                    <Navbar.Toggle aria-controls="menu" />

                    {/* Menú colapsable */}
                    <Navbar.Collapse id="menu">
                        <Nav className="ms-auto">
                        <NavList/>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>   
    );
};

export default NavbarComp;
