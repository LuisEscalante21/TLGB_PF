import React, { useEffect, useState } from "react";
import { ShoppingCart, User, Search } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import logoTLGB from "../img/LOGO.png";
import monitorIcon from "../img/monitor.png";
import nintendoIcon from "../img/nintendo.png";
import ps4Icon from "../img/ps4.png";
import xboxIcon from "../img/xbox.png";

const Nav = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const hideNavRoutes = ["/login", "/register"];
  const shouldHideNav = hideNavRoutes.includes(location.pathname);

  const platforms = [
    { name: "PC", icon: monitorIcon },
    { name: "PlayStation", icon: ps4Icon },
    { name: "Xbox", icon: xboxIcon },
    { name: "Nintendo", icon: nintendoIcon }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  if (shouldHideNav) {
    return null;
  }

  return (
    <nav style={{
      width: "100vw",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 50,
      backgroundColor:
        location.pathname !== "/"
          ? "#333"
          : isScrolled
          ? "#333"
          : "transparent",
      color: "white",
      transition: "background-color 0.3s ease",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      {/* NAV SUPERIOR - TODO EL ANCHO */}
      <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        boxSizing: "border-box"
      }}>
        {/* Logo */}
        <NavLink to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={logoTLGB} alt="TLGB" style={{ height: "45px", objectFit: "contain" }} />
        </NavLink>

        {/* Menú */}
        <ul style={{
          display: "flex",
          gap: "24px",
          listStyle: "none",
          margin: 0,
          padding: 0,
          fontSize: "15px",
          fontWeight: 500
        }}>
          {[
            { name: "Sobre Nosotros", to: "/AboutUs" },
            { name: "Contacto", to: "/news" },
            { name: "Términos y condiciones", to: "/support" }
          ].map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                style={({ isActive }) => ({
                  color: isActive ? "#FFA500" : "white",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                  fontSize: "15px",
                  fontWeight: 500
                })}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Iconos */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px"
        }}>
          <ShoppingCart size={26} style={{ color: "white", cursor: "pointer" }} />
          <NavLink to="/login">
            <User size={28} style={{ color: "white", cursor: "pointer" }} />
          </NavLink>
        </div>
      </div>

      {/* NAV INFERIOR: Círculo Plataformas */}
      {location.pathname === "/" && (
        <div style={{
          marginTop: "12px",
          backgroundColor: "#333",
          borderRadius: "9999px",
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
        }}>
          {platforms.map((platform, i) => (
            <button key={i} style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: "6px 12px",
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s ease"
            }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = "#444"; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = "transparent"; }}
            >
              <img src={platform.icon} alt={platform.name} style={{ height: "20px" }} />
              {platform.name}
            </button>
          ))}

          {/* Botón de búsqueda */}
          <div style={{
            background: "linear-gradient(135deg, #f12711, #f02f17)",
            borderRadius: "9999px",
            padding: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Search size={22} color="white" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
