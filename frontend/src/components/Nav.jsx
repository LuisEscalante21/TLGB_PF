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
  const hidePlatformNavRoutes = ["/AboutUs", "/news", "/support", "/login", "/register"];

  const shouldHideNav = hideNavRoutes.includes(location.pathname);
  const shouldHidePlatformNav = hidePlatformNavRoutes.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  if (shouldHideNav) {
    return null;
  }

  return (
    <>
      {/* NAV SUPERIOR */}
      <nav style={{
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "#222",
        color: "white",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
        flexWrap: "wrap",
      }}>
        {/* Logo */}
        <NavLink to="/" style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logoTLGB}
            alt="TLGB"
            style={{
              height: "45px",
              objectFit: "contain",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </NavLink>

        {/* Menú */}
        <ul style={{
          display: "flex",
          gap: "20px",
          listStyle: "none",
          margin: 0,
          padding: 0,
          fontSize: "14px",
          fontWeight: 500,
          flexWrap: "wrap",
        }}>
          <li>
            <NavLink
              to="/AboutUs"
              style={({ isActive }) => ({
                color: isActive ? "#FFA500" : "white",
                textDecoration: "none",
              })}
            >
              Sobre Nosotros
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/news"
              style={({ isActive }) => ({
                color: isActive ? "#FFA500" : "white",
                textDecoration: "none",
              })}
            >
              Contacto
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/support"
              style={({ isActive }) => ({
                color: isActive ? "#FFA500" : "white",
                textDecoration: "none",
              })}
            >
              Términos y Condiciones
            </NavLink>
          </li>
        </ul>

        {/* Iconos */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          <ShoppingCart size={26} style={{ color: "white", cursor: "pointer" }} />
          <NavLink to="/login">
            <User size={28} style={{ color: "white", cursor: "pointer" }} />
          </NavLink>
        </div>
      </nav>

      {/* NAV INFERIOR DE CONSOLAS */}
      {!shouldHidePlatformNav && (
        <div style={{
          position: "fixed",
          top: "70px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#333",
          borderRadius: "9999px",
          padding: "10px 18px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
          zIndex: 999,
          flexWrap: "wrap",
        }}>
          {/* Botones de consolas */}
          <NavLink
            to="/PagePc"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#4B00FF" : "transparent",
              padding: "6px 12px",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "white",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "14px",
            })}
          >
            <img src={monitorIcon} alt="PC" style={{ height: "20px" }} /> PC
          </NavLink>

          <NavLink
            to="/PagePS4"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#0070F3" : "transparent",
              padding: "6px 12px",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "white",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "14px",
            })}
          >
            <img src={ps4Icon} alt="PlayStation" style={{ height: "20px" }} /> PlayStation
          </NavLink>

          <NavLink
            to="/PageXbox"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#00FF00" : "transparent",
              padding: "6px 12px",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "white",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "14px",
            })}
          >
            <img src={xboxIcon} alt="Xbox" style={{ height: "20px" }} /> Xbox
          </NavLink>

          <NavLink
            to="/PageNintendo"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#E60012" : "transparent",
              padding: "6px 12px",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "white",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "14px",
            })}
          >
            <img src={nintendoIcon} alt="Nintendo" style={{ height: "20px" }} /> Nintendo
          </NavLink>

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
            <Search size={20} color="white" />
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
