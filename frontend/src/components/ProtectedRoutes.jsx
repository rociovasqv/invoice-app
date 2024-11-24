import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext'; // Asegúrate de importar el contexto

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Obtén el estado `user` y `loading` del contexto
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user === null) {
      navigate("/inicio-sesion", { replace: true }); // Redirige si no hay usuario y ya no estamos en loading
    }
  }, [loading, user, navigate]); // Depende de `loading`, `user` y `navigate`

  // Si estamos "cargando", no renderizamos nada
  if (loading) {
    return null; // O puedes mostrar un spinner de carga si lo prefieres
  }

  // Si hay un usuario, renderizamos los hijos (la ruta protegida)
  return children;
};

export default ProtectedRoute;
