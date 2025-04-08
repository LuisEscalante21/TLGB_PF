import React, { useState } from 'react';
import './Register.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logoImage from '../../img/LOGO.png';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    telephone: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos del formulario
    console.log('Datos del formulario:', formData);
  };

  return (
    <div className="login-container">
      <div className="login-content register-content">
        <div className="logo-container">
          {/* Espacio para colocar tu propio logo/imagen */}
          <div className="custom-logo">
            <img src={logoImage} alt="TLGB Logo" />
          </div>
        </div>
        <h2 className="login-title">Crear cuenta</h2>
        
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
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group half">
              <input 
                type="text" 
                id="name" 
                placeholder="Nombre" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group half">
              <input 
                type="text" 
                id="lastName" 
                placeholder="Apellido" 
                value={formData.lastName}
                onChange={handleChange}
                required 
              />
            </div>
          </div>
          <div className="form-group">
            <input 
              type="tel" 
              id="telephone" 
              placeholder="Teléfono" 
              value={formData.telephone}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              id="email" 
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              id="password" 
              placeholder="Contraseña" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-actions">
            <div className="form-link right-align">
              <a href="/login">¿Ya tienes una cuenta? Inicia sesión</a>
            </div>
          </div>
          
          <button type="submit" className="login-btn">Registrarme</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;