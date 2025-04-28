import React, { useEffect, useState } from 'react';
import { Global } from '../../helpers/Global';
import Swal from 'sweetalert2';
import moment from "moment";

const Suscripcion = ({ platform }) => {
  const [tarjetas, setTarjetas] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    obtenerTarjetas(1, false);
  }, []);

  const obtenerTarjetas = async (nextPage = 1, mostrarNuevas = false) => {
    try {
      if (mostrarNuevas) {
        setTarjetas([]);
        setPage(1);
        nextPage = 1;
        setLastUpdate(new Date());
      }

      const request = await fetch(
        `${Global.url}products/platform/${platform}/Suscripcion/${nextPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!request.ok) throw new Error("Error al obtener las tarjetas");
      
      const data = await request.json();
      
      if (!data || data.status !== "success" || !data.products) {
        throw new Error("Respuesta de la API inválida");
      }

      // Procesar tarjetas para obtener el primer precio disponible
      const tarjetasProcesadas = data.products.map(tarjeta => {
        let primerPrecio = "No disponible";
        
        if (tarjeta.platforms && tarjeta.platforms.length > 0) {
          for (const plataforma of tarjeta.platforms) {
            if (plataforma.consoles && plataforma.consoles.length > 0) {
              primerPrecio = `$${plataforma.consoles[0].price.toFixed(2)}`;
              break;
            }
          }
        }
        
        return {
          ...tarjeta,
          precioMostrado: primerPrecio
        };
      });

      if (mostrarNuevas) {
        setTarjetas(tarjetasProcesadas);
      } else {
        setTarjetas(tarjetasPrevias => {
          const nuevasTarjetas = tarjetasProcesadas.filter(
            nuevaTarjeta => !tarjetasPrevias.some(tarjeta => tarjeta._id === nuevaTarjeta._id)
          );
          return [...tarjetasPrevias, ...nuevasTarjetas];
        });
      }

      setPages(data.totalPages);

      if (data.products.length === 0 && tarjetas.length === 0 && !mostrarNuevas) {
        Swal.fire({
          title: "¡Vaya!",
          text: "No hay tarjetas para mostrar.",
          icon: "info",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error al obtener tarjetas:", error.message);
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar las tarjetas. Inténtalo de nuevo más tarde.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="tarjeta-seccion">
      <h1 className="tarjeta-titulo">Suscripciones  {platform}</h1>
      
      <div className="tarjeta-contenedor">
        {tarjetas.length > 0 ? (
          <div className="tarjeta-lista">
            {tarjetas.map((tarjeta) => {
              const imagenValida = tarjeta.images?.[0]?.storedName !== "default.png" 
                ? tarjeta.images[0] 
                : null;

              const urlImagen = imagenValida 
                ? `${Global.url}products/media/${imagenValida.storedName}` 
                : null;

              return (
                <div key={tarjeta._id} className="tarjeta-card">
                  <div className="tarjeta-imagen-contenedor">
                    {urlImagen ? (
                      <img
                        src={urlImagen}
                        alt={tarjeta.name}
                        className="tarjeta-imagen"
                        onError={(e) => {
                          e.target.src = '/default-product.png';
                          e.target.onerror = null;
                        }}
                      />
                    ) : (
                      <div className="tarjeta-imagen-placeholder">
                        Sin imagen
                      </div>
                    )}
                  </div>

                  <div className="tarjeta-info">
                    <h3 className="tarjeta-nombre">{tarjeta.name}</h3>
                    <span className="tarjeta-precio">
                      {tarjeta.precioMostrado}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="tarjeta-cargando">
            Cargando tarjetas...
          </p>
        )}
      </div>
    </div>
  );
};

export default Suscripcion;