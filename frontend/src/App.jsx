import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavbarComp from "./components/Navbar";
import Footer from './components/Footer';

import Inicio from "./pages/Inicio";
import QuienesSomos from "./pages/Somos";
import ContactoPage from "./pages/Contacto";
import InicioSesion from "./pages/login";
import ServicePage from "./pages/ServicePage";

import Usuarios from "./modules/usuarios/UsersPage";
import UserForm from "./modules/usuarios/UserForm";

import ComprasPage from "./modules/compras/ComprasPage";
import CompraForm from "./modules/compras/CompraForm";

import VentaPage from "./modules/ventas/VentasPage";
import VentaForm from "./modules/ventas/VentaForm";

import ClientesPage from "./modules/clientes/Clientes";
import ClienteForm from "./modules/clientes/ClienteForm";

import SubclientesPage from "./modules/subclientes/subclientesPage";
import SubclienteForm from "./modules/subclientes/subclienteForm";

import ProveedoresPage from "./modules/proveedores/proveedoresPage";
import ProveedorForm from "./modules/proveedores/proveedorForm";

import InformesPage from "./modules/informes-iva/InformesPage";

// import Comprobantes from 

import Dashboard from "./pages/Dashboard";
import { useState } from "react";
// import { AuthProvider } from "./contexts/authContext";

const App = () => {

  const usuario = JSON.parse(sessionStorage.getItem("usuario"));
  const [usuarioLogeado,sertUsuarioLogeado] = useState(usuario)

  return (
    <Router>
          <header id="navbar">
              <NavbarComp
              usuarioLogeado={usuarioLogeado}
              sertUsuarioLogeado= {sertUsuarioLogeado}
              />
          </header>
          <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/quienes-somos" element={<QuienesSomos/>}/>
              <Route path="/servicios" element={<ServicePage/>}/>
              <Route path="/Contacto" element={<ContactoPage/>}/>
              <Route path="/inicio-sesion" element={<InicioSesion/>}/>

              <Route path="/dashboard" element={<Dashboard/>}/>

              <Route path="/usuarios" element={<Usuarios/>}/>
              <Route path="/usuarios/crear" element={<UserForm/>}/>
              {/* <Route path="/usuarios/crear" element={<UserForm isEdit={false} />} />
              <Route path="/usuarios/editar/:id" element={<UserForm isEdit={true} />}/> */}

            
              <Route path="/compras" element={<ComprasPage/>}/>
              <Route path="/registrar-compra" element={<CompraForm />} />

              <Route path="/ventas" element={<VentaPage/>}/>
              <Route path="/registrar-venta" element={<VentaForm/>} />

              <Route path="/informes" element={<InformesPage/>}/>

              <Route path="/clientes" element={<ClientesPage/>}/>
              <Route path="/registrar-cliente" element={<ClienteForm />}/>
               {/* <Route path="/editar-cliente/:id" element={<ClienteForm clienteInicial={cliente}/>}/> */}

              <Route path="/subclientes" element={<SubclientesPage/>}/>
              <Route path="/registrar-subcliente" element={<SubclienteForm/>}/>

              <Route path="/proveedores" element={<ProveedoresPage/>}/>
              <Route path="/registrar-proveedor" element={<ProveedorForm/>}/>

          </Routes>
          <Footer/>
    </Router>
  );
};

export default App;