import React from 'react';
import { FaDiscord, FaGift, FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';


const Footer = () => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star" />);
      } else {
        stars.push(<FaRegStar key={i} className="star" />);
      }
    }
    
    return stars;
  };

  return (
    <footer className="footer-container">
      <div className="container">
        {/* Sección superior */}
        <div className="top-section">
          <div className="trustpilot">
            <div className="rating">
              <span className="trustpilot-title">Trustpilot</span>
              <div className="rating-box">
                {renderStars(4.7)}
                <span className="rating-value">4.7</span>
              </div>
            </div>
            <p className="reviews-text">Basado en 2,458 opiniones</p>
          </div>

          <div className="action-buttons">
            <button className="discord-button">
              <FaDiscord className="button-icon" />
              Bot de Discord
            </button>
            <button className="gift-button">
              <FaGift className="button-icon" />
              Canjear tarjeta
            </button>
          </div>
        </div>

        <div className="separator"></div>

        {/* Sección media */}
        <div className="middle-section">
          <div>
            <h3 className="section-title">Legal</h3>
            <ul className="link-list">
              <li><a href="#">Términos y condiciones</a></li>
              <li><a href="#">Política de privacidad</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>

          <div>
            <h3 className="section-title">Empresa</h3>
            <ul className="link-list">
              <li><a href="#">Sobre nosotros</a></li>
              <li><a href="#">Programa de afiliados</a></li>
              <li><a href="#">Trabaja con nosotros</a></li>
            </ul>
          </div>

          <div>
            <h3 className="section-title">Soporte</h3>
            <ul className="link-list">
              <li><a href="#">Centro de ayuda</a></li>
              <li><a href="#">Contacto</a></li>
              <li><a href="#">Estado del servicio</a></li>
            </ul>
          </div>

          <div>
            <h3 className="section-title">Mantente informado</h3>
            <p className="subscribe-text">Suscríbete para recibir las últimas noticias y ofertas</p>
            <div className="subscribe-form">
              <input type="email" placeholder="Tu email" />
              <button>OK</button>
            </div>
          </div>
        </div>

        <div className="separator"></div>

        {/* Copyright */}
        <div className="bottom-section">
          
          <div className="social-icons">
            <a href="#"><span className="sr-only">Facebook</span><i className="fab fa-facebook"></i></a>
            <a href="#"><span className="sr-only">Twitter</span><i className="fab fa-twitter"></i></a>
            <a href="#"><span className="sr-only">Instagram</span><i className="fab fa-instagram"></i></a>
          </div>
        </div>

        <p className="copyright">
            © {new Date().getFullYear()} Instant Gaming. Todos los derechos reservados.
          </p>
      </div>
    </footer>
  );
};

export default Footer;
