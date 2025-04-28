import React from "react";
import "../../css/styles.css";

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <div className="terms-content">
        <h1>Términos y Condiciones</h1>
        <p>
          Bienvenido a TLGB, una plataforma en línea para la compra de videojuegos.
          Al acceder y utilizar nuestros servicios, aceptas cumplir con los siguientes términos y condiciones.
          Si no estás de acuerdo con alguno de ellos, te recomendamos que no utilices nuestra aplicación.
        </p>

        <h2>1. Aceptación de los Términos</h2>
        <p>
          Al utilizar la aplicación, aceptas estos términos y condiciones, así como nuestra Política de Privacidad.
        </p>

        <h2>2. Registro de Usuario</h2>
        <p>
          Para acceder a ciertos servicios, es necesario registrarse con una cuenta.
          Debes proporcionar información veraz y mantener la confidencialidad de tus credenciales.
          Eres responsable de todas las actividades realizadas en tu cuenta.
        </p>

        <h2>3. Compra de Videojuegos</h2>
        <ul>
          <li>Todos los productos ofrecidos están sujetos a disponibilidad.</li>
          <li>Los precios pueden cambiar sin previo aviso.</li>
          <li>Una vez realizada una compra, no se aceptan devoluciones, excepto en los casos establecidos en nuestra política de reembolsos.</li>
        </ul>

        <h2>4. Métodos de Pago</h2>
        <p>
          Aceptamos pagos por medio de PayPal. El usuario garantiza que tiene autorización para utilizar el método de pago seleccionado.
        </p>

        <h2>5. Entrega de Productos</h2>
        <ul>
          <li>Para productos físicos, se puede entregar por medio de la tienda física.</li>
          <li>Para productos digitales, se proporcionará un código de activación o enlace de descarga después de la confirmación del pago.</li>
        </ul>

        <h2>6. Propiedad Intelectual</h2>
        <p>
          Todo el contenido de la plataforma, incluyendo imágenes, textos y marcas, está protegido por derechos de autor y no puede ser utilizado sin autorización.
        </p>

        <h2>7. Prohibiciones</h2>
        <p>
          Está prohibido el uso de la plataforma para actividades ilícitas, la reventa no autorizada de productos y cualquier acción que comprometa la seguridad del sistema.
        </p>

        <h2>8. Limitación de Responsabilidad</h2>
        <p>
          No somos responsables por daños derivados del uso de la aplicación, interrupciones del servicio o problemas técnicos ajenos a nuestro control.
        </p>

        <h2>9. Modificaciones de los Términos</h2>
        <p>
          Nos reservamos el derecho de modificar estos términos en cualquier momento. Las actualizaciones serán notificadas en la plataforma.
        </p>

        <h2>10. Contacto</h2>
        <p>
          Para cualquier duda o consulta, puedes contactarnos a través de <a href="mailto:tlgb@gmail.com">tlgb@gmail.com</a>.
        </p>

        <p className="terms-footer">
          Al utilizar nuestra aplicación, confirmas haber leído y aceptado estos términos y condiciones.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
