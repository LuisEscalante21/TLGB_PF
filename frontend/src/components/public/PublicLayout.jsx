import React from 'react'

import ConsoleNav from './ConsoleNav'
import { Navigate, Outlet } from 'react-router'
import HeaderPublic from './HeaderPublic'
import useAuth from '../../hooks/useAuth'
import Footer from './Footer'

const PublicLayout = () => {
  const { auth } = useAuth();

  return (
    <>
      <HeaderPublic />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout