import React, { useState } from 'react';
import './Register.css';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Asegura que isVerified se envía como false
      const dataToSend = { ...formData, isVerified: false };

      const response = await fetch('http://localhost:4000/api/registerClients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        alert('¡Registro exitoso!');
        setFormData({
          name: '',
          lastName: '',
          telephone: '',
          email: '',
          password: '',
        });
        window.location.href = '/login'; 
      } else {
        const errorData = await response.json();
        alert('Error: ' + (errorData.message || 'No se pudo registrar'));
      }
    } catch (error) {
      alert('Error de red: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content register-content">
        <div className="logo-container">
          <div className="custom-logo">
            <img src={logoImage} alt="TLGB Logo" />
          </div>
        </div>
        <h2 className="login-title">Crear cuenta</h2>
        
        <div className="social-login">
          <button className="social-btn facebook" type="button">
            <i className="fab fa-facebook-f"></i>
          </button>
          <button className="social-btn google" type="button">
            <i className="fab fa-google"></i>
          </button>
          <button className="social-btn apple" type="button">
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