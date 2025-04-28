import React from "react";
import { ShoppingCart, User, X } from "lucide-react";
import { useLocation, NavLink } from "react-router-dom";
import logoTLGB from "../../img/Logo.png";


const Nav = () => {
  const location = useLocation();

  if (location.pathname === "/register") {
    return null;
  }

  if (location.pathname === "/login") {
    return (
      <nav className="nav-container">
        <div className="nav-content">
          <NavLink to="/" className="nav-icon">
            <X size={40} />
          </NavLink>
        </div>
      </nav>
    );
  }

  return (
    <nav className="nav-container">
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
          <NavLink to="/login" className="nav-icon">
            <User size={38} />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Nav;