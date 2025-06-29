import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import { Global } from '../../helpers/Global';
import Swal from 'sweetalert2';
import { useCart } from "../../context/CartContext";

const ProductDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const initialConsoleId = location.state?.consoleId || null;
    const [product, setProduct] = useState(null);
    const [selectedConsole, setSelectedConsole] = useState(null);
    const [allConsoles, setAllConsoles] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const request = await fetch(Global.url + `products/product/${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (!request.ok) {
              throw new Error('No se pudo obtener el producto');
            }
    
            const data = await request.json();
            if (data.status === 'success') {
              setProduct(data.product);

              // Armar lista combinada de todas las consolas
              const consoles = [];
              data.product.platforms.forEach((platform) => {
                platform.consoles.forEach((console) => {
                  consoles.push({
                    id: console._id, // 👈 Cambiar consoleId por id
                    productId: data.product._id, // 👈 Agregar referencia al producto
                    productName: data.product.name, // 👈 Nombre del producto
                    platformName: platform.name,
                    consoleId: console._id, // 👈 Mantener para compatibilidad
                    consoleName: console.name,
                    price: console.price,
                    // Agregar más información útil para el carrito
                    image: data.product.images?.[0]?.storedName || 'default.png'
                  });
                });
              });
              setAllConsoles(consoles);

              if (initialConsoleId) {
                const selected = consoles.find(c => c.consoleId === initialConsoleId);
                if (selected) {
                  setSelectedConsole(selected);
                }
              }
            } else {
              throw new Error('Producto no encontrado');
            }
          } catch (error) {
            console.error(error);
            Swal.fire('Error', error.message, 'error');
          }
        };
    
        fetchProduct();
    }, [id]);

    if (!product) {
        return <div className="product-page__loading">Cargando producto...</div>;
    }
    
    const productImage = product.images?.[0]?.storedName !== "default.png"
        ? `${Global.url}products/media/${product.images[0].storedName}`
        : null;

    const handleConsoleChange = (event) => {
      const selectedId = event.target.value;
      const consoleSelected = allConsoles.find(c => c.consoleId === selectedId);
      setSelectedConsole(consoleSelected);
    };

    const handleAddToCart = () => {
      if (selectedConsole) {
        // 👈 Crear objeto optimizado para el carrito
        const cartItem = {
          id: selectedConsole.id, // 👈 Usar el id correcto
          productId: selectedConsole.productId,
          productName: selectedConsole.productName,
          platformName: selectedConsole.platformName,
          consoleName: selectedConsole.consoleName,
          price: selectedConsole.price,
          image: selectedConsole.image,
          // Crear un nombre descriptivo para mostrar en el carrito
          displayName: `${selectedConsole.productName} - ${selectedConsole.platformName}`
        };
        
        addToCart(cartItem);
        
        // Mostrar confirmación
        Swal.fire({
          title: '¡Agregado al carrito!',
          text: `${cartItem.displayName}`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    };

    return (
      <div className="product-page">
        <div className="product-page__container">
          
          {/* Imagen del producto */}
          <div className="product-page__image-card">
            {productImage && (
              <img
                src={productImage}
                alt={product.name}
                className="product-page__image"
              />
            )}
          </div>

          {/* Información del producto */}
          <div className="product-page__info-card">
            <h1 className="product-page__title">{product.name}</h1>

            <p className="product-page__description">{product.description}</p>

            {/* Combobox de consolas */}
            <div className="product-page__platforms">
              <h3>Selecciona una versión:</h3>

              <select 
                onChange={handleConsoleChange} 
                value={selectedConsole?.consoleId || ''}
                className="product-page__select"
                >
                <option value="">-- Elige una versión --</option>
                {allConsoles.map((console) => (
                  <option key={console.consoleId} value={console.consoleId}>
                    {console.platformName} - {console.consoleName}
                  </option>
                ))}
              </select>

              {/* Mostrar detalles de la consola seleccionada */}
              {selectedConsole && (
                <div className="product-page__console">
                  <p><strong>Plataforma:</strong> {selectedConsole.platformName}</p>
                  <p><strong>Consola:</strong> {selectedConsole.consoleName}</p>
                  <p><strong>Precio:</strong> ${selectedConsole.price.toFixed(2)}</p>
                  <button
                    className="btn-primary"
                    onClick={handleAddToCart} // 👈 Usar la nueva función
                  >
                    Añadir al carrito
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProductDetail;