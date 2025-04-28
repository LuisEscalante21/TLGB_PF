import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{
      width: "100%",
      backgroundColor: "#111", 
      color: "#ccc",
      padding: "40px 20px 20px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "40px",
      borderTop: "1px solid #333",
    }}>
      
      {/* Nombre de la tienda */}
      <h3 style={{
        margin: "0",
        fontSize: "24px",
        color: "white",
        marginBottom: "8px",
      }}>
        TLGB Gaming Store
      </h3>

      {/* Derechos reservados */}
      <p style={{
        margin: "0",
        fontSize: "14px",
        marginBottom: "20px",
      }}>
        © 2025 Todos los derechos reservados.
      </p>

      {/* Links abajo */}
      <div style={{
        display: "flex",
        gap: "32px",
        marginTop: "10px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
        <NavLink to="/AboutUs" style={{
          textDecoration: "none",
          color: "#ccc",
          fontSize: "14px",
        }}>
          Sobre Nosotros
        </NavLink>
        <NavLink to="/news" style={{
          textDecoration: "none",
          color: "#ccc",
          fontSize: "14px",
        }}>
          Contacto
        </NavLink>
        <NavLink to="/support" style={{
          textDecoration: "none",
          color: "#ccc",
          fontSize: "14px",
        }}>
          Términos y Condiciones
        </NavLink>
      </div>

    </footer>
  );
};

export default Footer;
