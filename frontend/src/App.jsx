import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavbarComp from "./components/Navbar";
import NavLateral from "./components/NavbarLateral";
// import RutaPrivada from "./components/privateRoute/privateRoute";
import Swal from 'sweetalert2';
import Footer from './components/Footer';

import Inicio from "./pages/Inicio";
import QuienesSomos from "./pages/somos";
import ContactoPage from "./pages/Contacto";
import InicioSesion from "./pages/login";
import ServicePage from "./pages/ServicePage";

import Usuarios from "./modules/usuarios/UsersPage";
import UserForm from "./modules/usuarios/UserForm";

import ComprasPage from "./modules/compras/ComprasPage";
import AgregarCompraForm from "./modules/compras/AgregarCompraForm";

import VentaPage from "./modules/ventas/VentasPage";
import AgregarVentaForm from "./modules/ventas/AgregarVentaForm";

import ClientesPage from "./modules/clientes/Clientes";
import AgregarClienteForm from "./modules/clientes/AgregarClienteForm";
import EditarClienteForm from "./modules/clientes/EditarCliente";
import FacturasCliente from "./modules/clientes/FacturasCliente";

import SubclientesPage from "./modules/subclientes/subclientesPage";
import AgregarSubclienteForm from "./modules/subclientes/AgregarsubclienteForm";
import EditarSubclienteForm from "./modules/subclientes/EditarSubcliente";

import ProveedoresPage from "./modules/proveedores/proveedoresPage";
import AgregarProveedorForm from "./modules/proveedores/AgregarproveedorForm";
import EditarProveedorForm from "./modules/proveedores/EditarProveedor";

// import InformesPage from "./modules/informes-iva/InformesPage";


import Dashboard from "./pages/Dashboard";
import { useState } from "react";

const App = () => {

  const usuario = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("usuario"));
    } catch {
      return null;
    }
  })();
  
  const [usuarioLogeado,setUsuarioLogeado] = useState(usuario);
  const [isLogin, setIsLogin] = useState(!!usuarioLogeado)
  const cerrarSesion = () => {
    Swal.fire({
      title: '¿Estás seguro que desear cerrar sesión?',
      text: "Se cerrará tu sesión",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¡Sesión cerrada!',
          text: 'Has cerrado sesión exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        setUsuarioLogeado({});
        sessionStorage.removeItem("usuario");
        setIsLogin(false);
      }
    });
  };

  return (
    <Router>
          <header id="navbar">
          {isLogin ? <NavLateral cerrarSesion={cerrarSesion} /> : <NavbarComp />}
          </header>
          <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/quienes-somos" element={<QuienesSomos/>}/>
              <Route path="/servicios" element={<ServicePage/>}/>
              <Route path="/Contacto" element={<ContactoPage/>}/>
              <Route path="/inicio-sesion" element={<InicioSesion setUsuarioLogeado={setUsuarioLogeado}/>}/>
              
              <Route path="/dashboard" element={<Dashboard/>}/>

              <Route path="/usuarios" element={<Usuarios/>}/>
              <Route path="/usuarios/crear" element={<UserForm/>}/>
              {/* <Route path="/usuarios/crear" element={<UserForm isEdit={false} />} />
              <Route path="/usuarios/editar/:id" element={<UserForm isEdit={true} />}/> */}

            
              <Route path="/compras" element={<ComprasPage/>}/>
              <Route path="/registrar-compra" element={<AgregarCompraForm />} />

              <Route path="/ventas" element={<VentaPage/>}/>
              <Route path="/registrar-venta" element={<AgregarVentaForm/>} />

              {/* <Route path="/informes" element={<InformesPage/>}/> */}

              <Route path="/clientes" element={<ClientesPage/>}/>
              <Route path="/registrar-cliente" element={<AgregarClienteForm />}/>
              <Route path="/editar-cliente/:id" element={<EditarClienteForm/>}/>
              <Route path="/facturas/:clienteId" element={<FacturasCliente/>}/>

              <Route path="/subclientes" element={<SubclientesPage/>}/>
              <Route path="/registrar-subcliente" element={<AgregarSubclienteForm/>}/>
              <Route path="/editar-subcliente/:id" element={<EditarSubclienteForm/>}/>

              <Route path="/proveedores" element={<ProveedoresPage/>}/>
              <Route path="/registrar-proveedor" element={<AgregarProveedorForm/>}/>
              <Route path="/editar-proveedor/:id" element={<EditarProveedorForm/>}/>

          </Routes>
          <Footer/>
    </Router>
  );
};

export default App;