import React, { useState } from "react";
import { Global } from "../../helpers/Global";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import './LoginPage.css';
import logoImage from '../../img/LOGO.png';
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    let userToLogin = form;

    try {
      const request = await fetch(Global.url + "login", {
        method: "POST",
        body: JSON.stringify(userToLogin),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      });

      const data = await request.json();

      if (data.status === "success") {
        setSaved("login");
        setAuth({
          userId: data.user.userId,
          userType: data.user.userType,
          email: data.user.email
        });

        Swal.fire({
          title: "¡Inicio de Sesión exitoso!",
          text: "Serás redirigido en breve",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {
          navigate("/");
        });
      } else {
        setSaved("error");
        Swal.fire({
          title: "Error",
          text: data.message || "Credenciales incorrectas",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      setSaved("error");
      console.error("Login error:", error);

      let errorMessage = "Ocurrió un error al intentar iniciar sesión";
      if (error.message.includes("Failed to fetch")) {
        errorMessage = "No se pudo conectar con el servidor";
      }

      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="logo-container">
          <div className="custom-logo">
            <img src={logoImage} alt="TLGB Logo" />
          </div>
        </div>
        <h2 className="login-title">Inicia sesión</h2>
        
        <div className="social-login">
          <button type="button" className="social-btn facebook">
            <i className="fab fa-facebook-f"></i>
          </button>
          <button type="button" className="social-btn google">
            <i className="fab fa-google"></i>
          </button>
          <button type="button" className="social-btn apple">
            <i className="fab fa-apple"></i>
          </button>
        </div>
        
        <div className="divider">
          <span className="divider-line"></span>
          <span className="divider-text">o</span>
          <span className="divider-line"></span>
        </div>
        
        <form className="login-form" onSubmit={loginUser}>
          <div className="form-group">
            <input 
              type="email" 
              name="email" 
              placeholder="Email"
              onChange={changed} 
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              name="password" 
              placeholder="Contraseña"
              onChange={changed} 
              required 
            />
          </div>
          
          <div className="form-actions">
            <div className="form-link">
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
            <div className="form-link right-align">
              <a href="/register">¿Aún no tienes cuenta?</a>
            </div>
          </div>
          
          <button type="submit" className="login-btn">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;