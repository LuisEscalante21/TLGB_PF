import React, { useEffect, useState } from 'react';
import { Global } from '../../helpers/Global';
import Swal from 'sweetalert2';

// Componente de Card de Producto (ajusta según tus necesidades)
const ProductCard = ({ product }) => {

  const validImage = product.images?.[0]?.storedName !== "default.png" 
  ? product.images[0] 
  : null;

  const productImageUrl = validImage 
  ? `${Global.url}products/media/${validImage.storedName}`
  : null;

  const getFirstPrice = () => {
    // Verificar si hay plataformas y consolas
    if (product.platforms?.length > 0 && product.platforms[0].consoles?.length > 0) {
      return `$${product.platforms[0].consoles[0].price.toFixed(2)}`;
    }
    return "Precio no disponible";
  };

  return (
    <article className="products__product">
      {/* Contenedor de imagen */}
      <div className="product__image-section">
        {productImageUrl ? (
          <div className="product__image-container">
            <img
              src={productImageUrl}
              className="product__image"
              alt={product.name}
              loading="lazy"
              onError={(e) => {
                e.target.src = '/default-product.png';
                e.target.onerror = null;
              }}
            />
          </div>
        ) : (
          <div className="product__image-placeholder">
            <span>No hay imagen disponible</span>
          </div>
        )}
      </div>

      {/* Contenedor de información */}
      <div className="product__info-section">
        <div className="product__details">
          <h3 className="product__name">{product.name}</h3>
          <span className="product__price">{getFirstPrice()}</span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;