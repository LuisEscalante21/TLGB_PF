import React from "react";
import { ShoppingCart, User, Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import logoTLGB from "../img/LOGO.png";
import monitorIcon from "../img/monitor.png";
import nintendoIcon from "../img/nintendo.png";
import ps4Icon from "../img/ps4.png";
import xboxIcon from "../img/xbox.png";
import assasinBackground from "../img/assasin.png"; // 👈 Agregado el fondo

const Nav = () => {
  const location = useLocation();

  // Nuevas rutas donde NO se mostrará el navbar
  const hideNavRoutes = ["/login", "/register", "/AboutUs", "/news", "/support"];

  const shouldHideNav = hideNavRoutes.includes(location.pathname);

  const platforms = [
    { name: "PC", icon: monitorIcon },
    { name: "PlayStation", icon: ps4Icon },
    { name: "Xbox", icon: xboxIcon },
    { name: "Nintendo", icon: nintendoIcon }
  ];

  // Si estamos en una ruta donde se oculta el navbar, no renderizar nada
  if (shouldHideNav) {
    return null;
  }

  return (
    <nav style={{
      width: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 50,
      backgroundImage: `url(${assasinBackground})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "white",
      display: "flex",
      flexDirection: "column",
      paddingBottom: "20px" // 👈 Para que no corte el fondo
    }}>
      {/* NAV SUPERIOR */}
      <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px"
      }}>
        {/* IZQUIERDA: Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={logoTLGB} alt="TLGB" style={{ height: "45px", objectFit: "contain" }} />
        </a>

        {/* CENTRO: Menú */}
        <ul style={{
          display: "flex",
          gap: "24px",
          listStyle: "none",
          margin: 0,
          padding: 0,
          fontSize: "15px",
          fontWeight: 500
        }}>
          <li><a href="/AboutUs" style={{ color: "white", textDecoration: "none" }}>Sobre Nosotros</a></li>
          <li><a href="/news" style={{ color: "white", textDecoration: "none" }}>Contacto</a></li>
          <li><a href="/support" style={{ color: "white", textDecoration: "none" }}>Términos y condiciones</a></li>
        </ul>

        {/* DERECHA: Íconos */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px"
        }}>
          <ShoppingCart size={26} style={{ color: "white", cursor: "pointer" }} />
          <a href="/login">
            <User size={28} style={{ color: "white", cursor: "pointer" }} />
          </a>
        </div>
      </div>

      {/* NAV INFERIOR: Plataformas CENTRADAS */}
      <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "12px"
      }}>
        <div style={{
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
      </div>
    </nav>
  );
};

export default Nav;
