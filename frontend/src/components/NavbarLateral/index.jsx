import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/navlateral.css';


const NavLateral = ({ cerrarSesion }) => (
    <div className="navbar-lateral">
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/dashboard">Panel Principal</Nav.Link>
        <Nav.Link as={Link} to="/usuarios">Usuarios</Nav.Link>
        <Nav.Link as={Link} to="/compras">Compras</Nav.Link>
        <Nav.Link as={Link} to="/ventas">Ventas</Nav.Link>
        <Nav.Link as={Link} to="/clientes">Clientes</Nav.Link>
        <Nav.Link as={Link} to="/proveedores">Proveedores</Nav.Link>
        <Nav.Link onClick={cerrarSesion}>Cerrar Sesión</Nav.Link>
      </Nav>
    </div>
  );

  NavLateral.propTypes = {
    cerrarSesion: PropTypes.func.isRequired,
  };

export default NavLateral;

