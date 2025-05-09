import React, { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global';
import Swal from 'sweetalert2';
import moment from "moment";
import ProductCard from './ProductPlatform';
import TarjetasRegalo from './TarjetasRegalo';

const Nintendo = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    getProducts(1, false);
  }, []);

  const getProducts = async (nextPage = 1, showNew = false) => {
    try {
      if (showNew) {
        setProducts([]);
        setPage(1);
        nextPage = 1;
        setLastUpdate(new Date());
      }

      const request = await fetch(
        Global.url + "products/platform/Nintendo/Juego/" + nextPage,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!request.ok) {
        throw new Error("Error al obtener los productos");
      }

      const data = await request.json();
      console.log(data);


      if (!data || data.status !== "success" || !data.products) {
        throw new Error("Respuesta de la API inválida");
      }

      if (showNew) {
        setProducts(data.products);
      } else {
        setProducts((prevProducts) => {
          const newProducts = data.products.filter(
            newProd => !prevProducts.some(prevProd => prevProd._id === newProd._id)
          );
          return [...prevProducts, ...newProducts];
        });
      }

      setPages(data.totalPages);

      if (data.products.length === 0) {
        if (products.length === 0 && !showNew) {
          Swal.fire({
            title: "¡Vaya!",
            text: "No hay productos para mostrar.",
            icon: "info",
            confirmButtonText: "Aceptar",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar los productos. Inténtalo de nuevo más tarde.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  /*const handleImageError = (imageId, isAvatar = false) => (e) => {
    const currentRetryCount = retryCounts[imageId] || 0;
    
    if (currentRetryCount < 3) {
      // Reintentar cargar la imagen
      setTimeout(() => {
        e.target.src = `${e.target.src.split('?')[0]}?retry=${currentRetryCount + 1}&t=${Date.now()}`;
        setRetryCounts(prev => ({
          ...prev,
          [imageId]: currentRetryCount + 1
        }));
      }, 1000 * (currentRetryCount + 1));
    } else {
      // Después de 3 intentos, mostrar avatar por defecto o ocultar
      if (isAvatar) {
        e.target.src = avatar;
      } else {
        e.target.style.display = 'none';
      }
      e.target.onerror = null;
    }
  };*/

  const getUniqueImageUrl = (baseUrl) => {
    return `${baseUrl}?t=${Date.now()}&cache=${Math.random().toString(36).substring(7)}`;
  };

  return (
    <>
      <div className="information-page">
        <h1>Nintendo</h1>
        <p>
        Enjoy our cheap Nintendo games and discover the best games at low price, like Mario, Zelda and other classics, 
        or the new 2025 releases on the Nintendo's console. Check out our discount and promotional offers on action, 
        adventure, sports games and much more!
        </p>
        
        <div className="game-list">
          {/* Tus tarjetas de juegos aquí */}
          <div className="game-card">Switch</div>
          <div className="game-card">Wii U</div>
        </div>
      </div>
      <div className="content__products">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
            
          ))
        ) : (
          <p className="products__empty">Cargando productos...</p>
        )}
      </div>
      <TarjetasRegalo platform={"Nintendo"}/>
    </>
    
  );
};



export default Nintendo;