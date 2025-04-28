import React from 'react'
import { ShoppingCart, User, X } from "lucide-react";
import logoTLGB from "../../img/Logo.png";
import { NavLink } from 'react-router-dom';
import ConsoleNav from './ConsoleNav';
import useAuth from '../../hooks/useAuth';

const HeaderPublic = () => {

  const { auth, logout } = useAuth();

  return (
    <header className="nav-container">
      <div className="nav-content">
        <div className="nav-logo-container">
          <NavLink to="/">
            <img src={logoTLGB} alt="TLGB" className="nav-logo" />
          </NavLink>
        </div>

        <ul className="nav-menu">
          <li>
            <NavLink 
              to="/AboutUs" 
              className={({ isActive }) => 
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Sobre Nosotros
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/news" 
              className={({ isActive }) => 
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Contactanos
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/support" 
              className={({ isActive }) => 
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Terminos y Condiciones
            </NavLink>
          </li>
        </ul>

        <div className="nav-icons">
          <ShoppingCart size={34} className="nav-icon" />
          {auth.userId ? (
            <NavLink to="/logout" className="list-end__link">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span className="list-end__name">Cerrar sesión</span>
          </NavLink>) : (
          <NavLink to="/login" className="nav-icon">
            <User size={38} />
          </NavLink>) 
          }
        </div>
      </div>
      <ConsoleNav />
    </header>
  )
}

export default HeaderPublic