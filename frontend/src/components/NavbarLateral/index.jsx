import { useState, useEffect, useRef } from 'react';
import { Nav, Offcanvas, Button, Navbar, Container, Dropdown, DropdownDivider } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CerrarSesion from '../CerrarSesion';
import PropTypes from 'prop-types';
import '../../styles/navlateral.css';
import logoAmp from '../../logos/logoAmpNav.png';

import { FaBars, FaThumbtack } from 'react-icons/fa';

const NavLateral = ({ setUsuarioLogeado, setIsLogin }) => {
    const [show, setShow] = useState(false);
    const [isPinned, setIsPinned] = useState(false); // Estado para fijar el menú
    const offcanvasRef = useRef(null);

    const handleClose = () =>{if (!isPinned) {setShow(false)}};
    const handleShow = () => setShow(true);
    const togglePin = () => setIsPinned(!isPinned); // Alternar fijación

    const navLinks = [
        { path: "/dashboard", label: "Panel Principal" },
        // { path: "/usuarios", label: "Usuarios" },
        { path: "/compras", label: "Compras" },
        { path: "/ventas", label: "Ventas" },
        { path: "/clientes", label: "Informes de Venta" },
        { path: "/proveedores", label: "Informes de Compra" },
    ];

   // Efecto para cerrar la barra al hacer clic fuera de él
   useEffect(() => {
    const handleClickOutside = (e) => {
        if (offcanvasRef.current && !offcanvasRef.current.contains(e.target) && show && !isPinned) {
            setShow(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [show, isPinned]);

    return (
        <>
            <Navbar bg="light" fixed="top" className="p-1">
                <Container fluid>
                  <Button variant="primary" onClick={handleShow}  aria-controls="offcanvas"aria-expanded={show}><FaBars/></Button>
                  <Navbar.Brand as={Link} to="/dashboard">
                    <span id="tituloPanel">Sistema web del Estudio Contable Ampuero</span>
                    <img className='logonav' src={logoAmp} alt="Logo" />
                  </Navbar.Brand>
                </Container>
            </Navbar>
            <Offcanvas show={show} onHide={handleClose} placement="start"  data-bs-scroll="true" scroll="true" className={isPinned ? "pinned" : ""}>
                <Offcanvas.Header closeButton style={{paddingTop:"6rem"}}>
                    <Offcanvas.Title>
                        <span id="logotitle">Estudio Contable Ampuero & Asoc.</span>
                    </Offcanvas.Title>
                    <Button variant={isPinned ? "success" : "secondary"} onClick={togglePin} className="pinfij ms-2">
                        <FaThumbtack style={{ transform: isPinned ? 'rotate(0deg)' : 'rotate(60deg)' }}/>{' '}
                    </Button>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        {navLinks.map(({ path, label }) => (
                            <Nav.Link key={path} as={Link} to={path}>{label}</Nav.Link>))}
                            <hr id='divider'/>
                            <CerrarSesion setUsuarioLogeado={setUsuarioLogeado} setIsLogin={setIsLogin} />
                            </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

NavLateral.propTypes = {
    setUsuarioLogeado: PropTypes.func.isRequired,
    setIsLogin: PropTypes.func.isRequired
};

export default NavLateral;