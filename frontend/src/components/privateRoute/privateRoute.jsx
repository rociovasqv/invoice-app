import { Navigate } from 'react-router-dom';

const RutaPrivada = ({ children, usuarioLogeado }) => {
  return usuarioLogeado ? children : <Navigate to="/inicio-sesion" />;
};

export default RutaPrivada;

