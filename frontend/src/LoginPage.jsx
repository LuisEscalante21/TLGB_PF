import React from 'react';
import './LoginPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logoImage from './img/LOGO.png';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-content">
        <div className="logo-container">
          {/* Espacio para colocar tu propio logo/imagen */}
          <div className="custom-logo">
          <img src={logoImage} alt="TLGB Logo" />
          </div>
        </div>
        <h2 className="login-title">Inicia sesión</h2>
        
        <div className="social-login">
          <button className="social-btn facebook">
            <i className="fab fa-facebook-f"></i>
          </button>
          <button className="social-btn google">
            <i className="fab fa-google"></i>
          </button>
          <button className="social-btn apple">
            <i className="fab fa-apple"></i>
          </button>
        </div>
        
        <div className="divider">
          <span className="divider-line"></span>
          <span className="divider-text">o</span>
          <span className="divider-line"></span>
        </div>
        
        <form className="login-form">
          <div className="form-group">
            <input type="email" id="email" placeholder="Email" required />
          </div>
          <div className="form-group">
            <input type="password" id="password" placeholder="Contraseña" required />
          </div>
          
          <div className="form-actions">
            <div className="form-link">
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
            <div className="form-link right-align">
              <a href="#">¿Aún no tienes cuenta?</a>
            </div>
          </div>
          
          <button type="submit" className="login-btn">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;