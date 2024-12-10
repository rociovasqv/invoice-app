import { CDBSidebar, CDBSidebarHeader, CDBSidebarMenuItem, CDBSidebarContent, CDBSidebarMenu} from "cdbreact";
import { Link } from "react-router-dom";
import CerrarSesion from "../CerrarSesion";
import "../../styles/sidebar.css";
import PropTypes from "prop-types";

const Sidebar = ({ setUsuarioLogeado, setIsLogin }) => {
  return (
    <CDBSidebar textColor="#333" backgroundColor="#f0f0f0" className="sidebar">
      <CDBSidebarHeader prefix={<i className="fa fa-bars"/>}>
        <div className="container" style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://seeklogo.com/images/B/butterfly-logo-0A00378822-seeklogo.com.png"
            alt=""
            style={{ width: "30px" }}
          />
          <h6 className="ms-2">BABYCARE ™</h6>
        </div>
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <CDBSidebarMenuItem icon="th-large" as={Link} to="/dashboard">
            Panel Principal
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="user" as={Link} to="/usuarios">
            Usuarios
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="shopping-cart" as={Link} to="/compras">
            Compras
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="chart-line" as={Link} to="/ventas">
            Ventas
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="users" as={Link} to="/clientes">
            Clientes
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="handshake" as={Link} to="/proveedores">
            Proveedores
          </CDBSidebarMenuItem>
          <CerrarSesion setUsuarioLogeado={setUsuarioLogeado} setIsLogin={setIsLogin} />
        </CDBSidebarMenu>
      </CDBSidebarContent>
    </CDBSidebar>
  );
};
export default Sidebar;

Sidebar.propTypes = {
    setUsuarioLogeado: PropTypes.func.isRequired,
    setIsLogin: PropTypes.func.isRequired,
};
  