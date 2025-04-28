import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export const PublicRoute = ({ children }) => {
  const { auth } = useAuth();

  if (auth.userId) {
    // Si el usuario está autenticado, redirige al home
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};