// components/PublicOnlyRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';



export const PublicOnlyRoute = ({ children }) => {
  const { auth } = useAuth();

  if (auth.userId) {
    // Si está autenticado, redirige según su tipo
    return auth.userType === 'Client' 
      ? <Navigate to="/" replace /> 
      : <Navigate to="/social" replace />;
  }

  return children;
};