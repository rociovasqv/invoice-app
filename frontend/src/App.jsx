import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavbarComp from "./components/Navbar";
import Footer from './components/Footer';

import Inicio from "./pages/Inicio";
import QuienesSomos from "./pages/Somos";
import InicioSesion from "./pages/Login";
import ServicePage from "./pages/ServicePage";
import UserForm from "./modules/usuarios/UserForm";
import Usuarios from "./modules/usuarios/Usuarios";
import Informes from "./pages/Informes";
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
              <Route path="/informes" element={<Informes/>}/>
              <Route path="/inicio-user" element={<Dashboard/>}/>
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