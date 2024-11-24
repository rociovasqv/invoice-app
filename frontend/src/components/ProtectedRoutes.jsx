import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user === null) {
      navigate("/inicio-sesion", { replace: true });
    }
  }, [loading, user, navigate]);

  if (loading) {
    return null; 
  }

  return children;
};

export default ProtectedRoute;
