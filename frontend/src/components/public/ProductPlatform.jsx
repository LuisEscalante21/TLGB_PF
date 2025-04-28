import { Link } from 'react-router-dom';
import { Global } from '../../helpers/Global';

const ProductCard = ({ product }) => {
  if (!product) return null;

  const validImage = product.images?.[0]?.storedName !== "default.png" 
    ? product.images[0] 
    : null;

  const productImageUrl = validImage 
    ? `${Global.url}products/media/${validImage.storedName}`
    : null;

  return (
  <Link 
    to={`/producto/${product._id}`} 
    state={{ consoleId: product.platforms?.[0]?.consoles?.[0]?._id }} 
    className="product-card-link"
  >
    <div className="product-card" style={{ cursor: 'pointer' }}>
      {productImageUrl && (
        <img
          src={productImageUrl}
          alt={product.name}
          className="product-card__image"
        />
      )}
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__price">
        ${product.platforms?.[0]?.consoles?.[0]?.price?.toFixed(2) || "No disponible"}
      </p>
    </div>
  </Link>
);
};

export default ProductCard;
