import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Image, Dropdown } from "react-bootstrap";
import { useAuth } from '../../contexts/authContext'; // Importa el contexto de autenticación

import logoAmp from '../../logos/logoAmpNav.png';
import '../../styles/navbar.css';

const NavbarComp = () => {
    const { user, logout } = useAuth(); // Obtiene el usuario actual y la función de logout desde el contexto

    const NavList = () => (
        <>
            <Nav.Link as={Link} to="/" className='' aria-current="page">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/quienes-somos" className="">¿Quiénes somos?</Nav.Link>
            <Nav.Link as={Link} to="/servicios" className="">Servicios</Nav.Link>
            <Nav.Link as={Link} to="/contacto" className="">Contacto</Nav.Link>
        </>
    );

    return (
        <header>
            <Navbar
                bg="light" data-bs-theme="light"
                expand="md p-3"
                fixed="top">
                <Container fluid>
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
                            <NavList />

                            {user ? (
                                // Muestra el nombre del usuario y el botón de cerrar sesión si está logueado
                                <Dropdown align="end" className="ms-3">
                                    <Dropdown.Toggle variant="outline-primary" id="user-menu">
                                        {user.nombre} {/* Nombre del usuario */}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={logout}>Cerrar sesión</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                // Muestra el botón de iniciar sesión si no está logueado
                                <Nav.Link as={Link} to="/inicio-sesion" className="ms-3">
                                    <Button variant="outline-primary">Iniciar Sesión</Button>
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>   
    );
};

export default NavbarComp;
