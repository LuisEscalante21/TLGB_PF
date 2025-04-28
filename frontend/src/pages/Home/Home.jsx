import React from "react";
import assassinImage from "../../img/assasin.png";
import ZeldaImage from "../../img/zelda.png";
import WitcherImage from "../../img/theWitcher.png";
import eldenImage from "../../img/Elden Ring.png";

const Home = () => {
  const games = [
    { name: "Marvel Rivals", price: "$15.99", discount: "-10%", img: ZeldaImage },
    { name: "Rocket League", price: "FREE", discount: "FREE", img: eldenImage },
    { name: "The Witcher 3", price: "$39.99", discount: "-30%", img: WitcherImage },
  ];

  return (
    <div
      style={{
        minHeight: "200vh",
        width: "100%",
        overflowX: "hidden",
        backgroundColor: "#222",
        paddingTop: "180px",
        paddingBottom: "60px",
        boxSizing: "border-box",
        margin: 0,
        position: "relative",
      }}
    >
      {/* Imagen principal */}
      <div
        style={{
          width: "100%",
          height: "90vh",
          backgroundImage: `url(${assassinImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>

      {/* Contenido principal */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "32px 16px",
        }}
      >
        {/* Tendencias */}
        <a
          href="#"
          style={{
            color: "white",
            fontSize: "2.5rem",
            marginBottom: "24px",
            display: "inline-block",
            fontWeight: "bold",
            textDecoration: "none",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#FF4500")}
          onMouseLeave={(e) => (e.target.style.color = "white")}
        >
          Tendencias ➔
        </a>

        <hr style={{ borderColor: "white", margin: "24px 0" }} />

        {/* Tarjetas de juegos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
          }}
        >
          {games.map((game, index) => (
            <div
              key={index}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                boxShadow: "0 6px 10px rgba(0,0,0,0.6)",
                transition: "transform 0.3s ease",
                backgroundColor: "#333",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {/* Imagen */}
              <div style={{ width: "100%", height: "300px", overflow: "hidden" }}>
                <img
                  src={game.img}
                  alt={game.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                />
              </div>

              {/* Información del juego */}
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  color: "white",
                  textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  backgroundColor: "rgba(0,0,0,0.6)",
                  padding: "8px 12px",
                  borderRadius: "8px",
                }}
              >
                <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {game.name}
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      backgroundColor: "#FF4500",
                      color: "white",
                      fontSize: "12px",
                      padding: "2px 6px",
                      borderRadius: "6px",
                      fontWeight: "bold",
                    }}
                  >
                    {game.discount}
                  </span>

                  {game.discount !== "FREE" && (
                    <span style={{ fontSize: "14px", color: "#ccc" }}>
                      {game.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
