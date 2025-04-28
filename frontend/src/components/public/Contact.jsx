import { useState } from 'react';

import React from 'react'

const Contact = () => {
    const [email, setEmail] = useState('');
  const [motivo, setMotivo] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      height: '70vh',
      margin: 0,
    },
    formSection: {
      width: '45%',
      display: 'flex',
      justifyContent: 'center',
    },
    textSection: {
      width: '45%',
      color: '#ffffff',
      padding: '20px',
    },
    infoText: {
      fontSize: '18px',
      lineHeight: '1.6',
      marginBottom: '20px',
    },
    card: {
      width: '100%',
      maxWidth: '380px',
      padding: '32px',
      borderRadius: '12px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
    formGroup: {
      marginBottom: '24px',
    },
    label: {
      display: 'block',
      marginBottom: '12px',
      fontSize: '18px',
      fontWeight: '500',
      color: '#ffffff',
    },
    input: {
      width: '100%',
      padding: '16px',
      backgroundColor: '#3a3a3a',
      border: '1px solid #4a4a4a',
      borderRadius: '8px',
      color: '#ffffff',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '18px',
      backgroundColor: '#ff6b21',
      color: 'white',
      fontWeight: '600',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      fontSize: '18px',
    },
    successMessage: {
      marginTop: '24px',
      padding: '16px',
      backgroundColor: '#22c55e',
      color: 'white',
      borderRadius: '8px',
      textAlign: 'center',
      fontSize: '16px',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#ffffff',
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, motivo });
    // Aquí normalmente enviarías los datos a tu backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      setMotivo('');
    }, 3000);
  };
  return (
    <div style={styles.container}>
      <div style={styles.formSection}>
        <div style={styles.card}>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="email">Correo</label>
              <input
                style={styles.input}
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="motivo">Motivo</label>
              <textarea
                style={{...styles.input, minHeight: '150px'}}
                id="motivo"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                rows="6"
                placeholder="Escribe tu mensaje aquí..."
                required
              />
            </div>
            
            <button 
              type="submit" 
              style={styles.button}
            >
              {submitted ? 'Enviado!' : 'Enviar'}
            </button>
            
            {submitted && (
              <div style={styles.successMessage}>
                ¡Mensaje enviado con éxito!
              </div>
            )}
          </form>
        </div>
      </div>

      <div style={styles.textSection}>
        <h2 style={styles.title}>Servicio de Contacto</h2>
        <p style={styles.infoText}>
          Si necesitas hacer uso de nuestro servicio de contacto te pedimos
          que te contactes por medio del campo que está en esta
          página, te ayudaremos en un lapso de 15 a 30 minutos.
        </p>
        <p style={styles.infoText}>
          Tratamos de hacer lo mejor para ti y que tengas la mejor experiencia en los videojuegos. 
          Lamentamos cualquier inconveniente que haya pasado, con todo gusto trataremos de
          ayudarte en cualquier duda o reclamo.
        </p>
      </div>
    </div>
  );
}

export default Contact
