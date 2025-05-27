import React from 'react'
import { Navigate, Outlet } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import Navbar from '../Nav/Navbar';
import './PrivateLayout.css'

const PrivateLayout = () => {
  const { auth } = useAuth();

  return (
    <>

      <div className="app-container">
        <Navbar />
        <div >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default PrivateLayout