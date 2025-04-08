import React from "react";
import { ShoppingCart, User, Search, X } from "lucide-react"; 
import { useLocation } from "react-router-dom"; 
import logoTLGB from "../img/LOGO.png";

const Nav = () => {
  const location = useLocation();

  // Ocultar completamente el nav en la página de registro
  if (location.pathname === "/register") {
    return (null) // No renderizar nada cuando estamos en la página de registro
  }

  if (location.pathname === "/login") {
    return (
      <nav style={{ backgroundColor: "#000", color: "white", width: "100%", position: "fixed", top: 0, left: 0, zIndex: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px" }}>
          {/* Icono de la "X" para deolverse al home*/}
          <a href="/" style={{ color: "white", textDecoration: "none" }}>
            <X size={40} style={{ cursor: "pointer", color: "white" }} />
          </a>
        </div>
      </nav>
    );
  }

  return (
    <nav style={{ backgroundColor: "#000", color: "white", width: "100%", position: "fixed", top: 0, left: 0, zIndex: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px" }}>
        {/* Logo */}
        <div style={{
          display: "flex",
          alignItems: "center",
          height: "60px",
          overflow: "hidden"
        }}>
          <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img
              src={logoTLGB}
              alt="TLGB"
              style={{
                height: "150px",
                objectFit: "contain",
                objectPosition: "left center"
              }}
            />
          </a>
        </div>

        {/* Central Navigation Menu */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ul style={{ 
            display: "flex", 
            gap: "32px", 
            listStyle: "none", 
            padding: 0, 
            margin: 0,
            fontSize: "18px",
            fontWeight: "500"
          }}>
            <li>
              <a href="/AboutUs" style={{ 
                color: location.pathname === "/AboutUs" ? "#E85D04" : "white", 
                textDecoration: "none",
                transition: "color 0.3s ease"
              }}>
                Sobre Nosotros
              </a>
            </li>
            <li>
              <a href="/news" style={{ 
                color: location.pathname === "/news" ? "#E85D04" : "white", 
                textDecoration: "none",
                transition: "color 0.3s ease"
              }}>
                Contactanos
              </a>
            </li>
            <li>
              <a href="/support" style={{ 
                color: location.pathname === "/support" ? "#E85D04" : "white", 
                textDecoration: "none",
                transition: "color 0.3s ease"
              }}>
                Terminos y Condiciones
              </a>
            </li>
          </ul>
        </div>

        {/* Icono de carrito de compras */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <ShoppingCart size={34} style={{ color: "white", cursor: "pointer" }} />
          {/* Icono de User para ir al login*/}
          <a href="/login" style={{ color: "white", textDecoration: "none" }}>
            <User size={38} style={{ cursor: "pointer" }} />
          </a>
        </div>
      </div>

      {/* Platform Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px 12px 16px" }}>
        <ul style={{ display: "flex", gap: "24px", listStyle: "none", padding: 0, margin: 0 }}>
          <li>
            <a href="/" style={{ color: "white", textDecoration: "none" }}>PC</a>
          </li>
        </ul>

      {/* Search Button */}
        <div style={{ padding: "8px", borderRadius: "9999px", cursor: "pointer" }}>
          <Search size={35} />
        </div>

      </div>
    </nav>
  );
};

export default Nav;