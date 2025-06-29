import React from 'react';
import '../Nav/Navbar.css';

import { Link, useLocation } from 'react-router-dom';
import { LuApple, LuUsers, LuSettings, LuLayoutDashboard, LuListOrdered } from "react-icons/lu";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className="navbar-admin">
      <div></div> 
      <Link to="/admin-dashboard" className="logo-link">
        
      </Link>
      <div className="admin-nav-options">
        
        <Link 
          to="productos" 
          className={`admin-nav-item ${isActive('/admin-products') ? 'active' : ''}`}
        >
          
          <span>Productos</span>
        </Link>
        
        
        <Link 
          to="empleados" 
          className={`admin-nav-item ${isActive('/admin-users') ? 'active' : ''}`}
        >
          
          <span>Empleados</span>
        </Link>
           
        <Link 
          to="Proveedores" 
          className={`admin-nav-item ${isActive('/admin-account') ? 'active' : ''}`}
        >
          
          <span>Proveedor</span>
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;