import React, { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global';
import Swal from 'sweetalert2';
import moment from "moment";
import ProductCard from './ProductPlatform';
import TarjetasRegalo from './TarjetasRegalo';
import imagen from "../../img/assasin.png";

const Home = () => {
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
        Global.url + "products/Juego/" + nextPage,
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
  {/* Banner Principal */}
  <div className="relative w-full h-[500px] bg-black">
    {/* Imagen de fondo */}
    <img
      src={imagen}
      alt="Banner Principal"
      className="absolute w-full h-full object-cover opacity-70"
    />
    {/* Contenido del banner */}
    <div className="relative z-10 flex flex-col justify-center h-full pl-10">
      <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
        The Elder Scrolls IV: Oblivion Remastered
      </h2>
      <div className="flex items-center space-x-4">
        <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-semibold">-20%</span>
        <span className="text-3xl md:text-5xl font-bold text-white">43.99€</span>
      </div>
    </div>
  </div>

  {/* Productos */}
  <div className="content__products">
    {products.length > 0 ? (
      products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))
    ) : (
      <p className="products__empty">Cargando productos...</p>
    )}
  </div>
</>

    
  );
};



export default Home;