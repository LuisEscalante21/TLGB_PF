import React from "react";
import "../SobreNosotros/NosotrosPage.css";
import imgBri from "../../img/brizuela.png";
import imgGerar from "../../img/gerardo.png";
import imgLuisin from "../../img/luis.png";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Daniel Oswaldo Brizuela Aquino",
      role: "Fundador & CEO",
      image: imgBri
    },
    {
      name: "Luis Ernesto Escalante Calderon",
      role: "Director de Operaciones",
      image: imgLuisin
    },
    {
      name: "Gerardo Steven Quintanilla Lopez",
      role: "Jefe de Soporte Técnico",
      image: imgGerar
    }
  ];

  return (
    <div className="about-us-wrapper">
    <div className="about-us-container">
      <div className="about-content">
        <h1 className="about-title">¿Quienes somos nosotros?</h1>
        
        <div className="about-description">
          <p>
            En TLGB, compartimos tu pasión por los videojuegos. Somos una 
            tienda especializada en la venta de juegos en formato digital y 
            físico, con un enfoque principal en la distribución virtual para que 
            puedas acceder a tus títulos favoritos de manera rápida, segura y 
            al mejor precio.
          </p>
          
          <p>
            Nos asociamos con los principales distribuidores para garantizar 
            que todas nuestras claves digitales sean 100% originales y 
            seguras, permitiéndote activar y jugar sin preocupaciones. 
            Además, para los coleccionistas y amantes del formato físico, 
            ofrecemos una selección especial de juegos en caja, ediciones de 
            colección y títulos difíciles de encontrar.
          </p>
          
          <p>
            Nuestra misión es brindarte una experiencia de compra sencilla y 
            confiable. Sabemos lo importante que es para un gamer tener 
            acceso inmediato a sus juegos, por eso hemos creado una 
            plataforma intuitiva donde puedes explorar, comprar y recibir tu 
            clave en segundos.
          </p>
          
          <p>
            En TLGB, no solo vendemos juegos, sino que también formamos 
            una comunidad de jugadores apasionados. Si tienes dudas o 
            necesitas ayuda, nuestro equipo de soporte está siempre 
            disponible para asistirte y garantizar que disfrutes de la mejor 
            experiencia posible.
          </p>
          
          <p className="slogan">
            TLGB – Juega sin límites, cuando y donde quieras.
          </p>
        </div>
      </div>
      
      <div className="team-section">
        {teamMembers.map((member, index) => (
          <div className="team-member" key={index}>
            <div className="member-card">
              <div className="member-avatar">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AboutUs;