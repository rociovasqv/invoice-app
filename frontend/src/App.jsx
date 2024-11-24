import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from "axios";

import { AuthProvider } from "./contexts/authContext";
import ProtectedRoute from './components/ProtectedRoutes';

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

import ClientesPage from "./modules/clientes/CLientes";
import ClienteForm from "./modules/clientes/ClienteForm";

import InformesPage from "./modules/informes-iva/InformesPage";

import Dashboard from "./pages/Dashboard";

// Configuración global de axios
axios.defaults.withCredentials = true; // Habilita las cookies en todas las solicitudes
axios.defaults.baseURL = "http://localhost:8000";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <header id="navbar">
          <NavbarComp />
        </header>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/Contacto" element={<ContactoPage />} />
          <Route path="/inicio-sesion" element={<InicioSesion />} />
          <Route path="/servicios" element={<ServicePage />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/usuarios/crear" element={<UserForm isEdit={false} />} />
          <Route path="/usuarios/editar/:id" element={<UserForm isEdit={true} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/compras" element={<ComprasPage />} />
          <Route path="/registrar-compra" element={<CompraForm />} />
          <Route path="/ventas" element={<VentaPage />} />
          <Route path="/registrar-venta" element={<VentaForm />} />
          <Route path="/informes" element={<InformesPage />} />
          {/* Rutas protegidas */}
          <Route 
            path="/clientes" 
            element={
              <ProtectedRoute>
                <ClientesPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/registrar-cliente" element={<ClienteForm />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;