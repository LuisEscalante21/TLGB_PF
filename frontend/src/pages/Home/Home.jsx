import React from "react";
import assassinImage from "../../img/assasin.png";

const Home = () => {
  const games = [
    { name: "Marvel Rivals", price: "$15.99", discount: "-10%", img: assassinImage },
    { name: "Rocket League", price: "FREE", discount: "FREE", img: assassinImage },
    { name: "The Witcher 3", price: "$39.99", discount: "-30%", img: assassinImage },
    { name: "Cyberpunk 2077", price: "$29.99", discount: "-50%", img: assassinImage },
    { name: "Hogwarts Legacy", price: "$59.99", discount: "-20%", img: assassinImage },
    { name: "Resident Evil", price: "$39.99", discount: "-15%", img: assassinImage },
  ];

  return (
    <div
      style={{
        minHeight: "200vh",
        paddingTop: "150px",
        width: "100vw",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
        backgroundColor: "#222",
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
        }}
      ></div>

      {/* Contenido */}
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "32px 16px",
        }}
      >
        {/* Tendencias - ahora es un link */}
        <a
          href="#"
          style={{
            color: "white",
            fontSize: "40px",
            marginBottom: "24px",
            display: "inline-block",
            textDecoration: "none",
            fontWeight: "bold",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#FF4500")}
          onMouseLeave={(e) => (e.target.style.color = "white")}
        >
          Tendencias ➔
        </a>

        <hr style={{ borderColor: "white", margin: "24px 0" }} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "32px",
          }}
        >
          {games.map((game, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#333",
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                boxShadow: "0 6px 10px rgba(0,0,0,0.6)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              {/* Imagen ahora más alta */}
              <div style={{ width: "100%", height: "280px", overflow: "hidden" }}>
                <img
                  src={game.img}
                  alt={game.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Nombre + Precio */}
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  color: "white",
                  textShadow: "0 2px 5px rgba(0,0,0,0.8)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
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
                    <span style={{ fontSize: "14px", color: "#ccc" }}>{game.price}</span>
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
