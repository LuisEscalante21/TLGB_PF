// components/private/PrivateRouter.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';


export const PrivateRouter = ({ children }) => {
  const { auth } = useAuth();

  // Si no está autenticado, redirige al login
  if (!auth.userId) {
    return <Navigate to="/login" replace />;
  }

  // Si es un usuario normal (no admin/employee), redirige al home público
  if (auth.userType === 'Client') {
    return <Navigate to="/" replace />;
  }

  // Si es admin o employee, permite el acceso
  return children ? children : <Outlet />;
};