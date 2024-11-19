import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavbarComp from "./components/Navbar";
import Footer from './components/Footer';

import Inicio from "./pages/Inicio";
import QuienesSomos from "./pages/Somos";
import InicioSesion from "./pages/login";
import ServicePage from "./pages/ServicePage";
import UserForm from "./modules/usuarios/UserForm";
import Usuarios from "./modules/usuarios/UsersPage";
import InformesPage from "./modules/informes-iva/InformesPage";
import FacturaPage from "./modules/facturas/FacturasPage";
import FacturaForm from "./modules/facturas/FacturaForm";
import Dashboard from "./pages/Dashboard";
// import { AuthProvider } from "./contexts/authContext";

const App = () => {
  return (
    <Router>
          <header id="navbar">
              <NavbarComp/>
          </header>
          <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/quienes-somos" element={<QuienesSomos/>}/>
              <Route path="/inicio-sesion" element={<InicioSesion/>}/>
              <Route path="/servicios" element={<ServicePage/>}/>
              <Route path="/usuarios" element={<Usuarios/>}/>
              <Route path="/usuarios/crear" element={<UserForm/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/informes" element={<InformesPage />}/>
              <Route path="/facturas" element={<FacturaPage/>}/>
              <Route path="/registrar-factura" element={<FacturaForm />} />
              {/* <Route path="/usuarios/crear" element={<UserForm isEdit={false} />} /> */}
              {/* <Route path="/usuarios/editar/:id" element={<UserForm isEdit={true} />} /> */}
              {/* <Route path="/Contacto" element={<Contacto/>}/> */}
              {/* Agrega más rutas aquí según sea necesario */}
          </Routes>
          <Footer/>
    </Router>
  );
};

export default App;