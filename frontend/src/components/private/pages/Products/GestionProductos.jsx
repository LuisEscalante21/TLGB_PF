import React, { useState, useEffect } from 'react';
import './GestionProductos.css';
import { LuSearch, LuPlus, LuFilter, LuSquare, LuCheck, LuX, LuPencil, LuTrash2 } from 'react-icons/lu';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import { Global } from '../../../../helpers/Global';

const AdminProductCard = ({
  product,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  selectionMode
}) => {

  const getImageUrl = (imagePath) => {
    if (!imagePath) return `${Global.url} products/media/default.png`;
    
    // Si ya es una URL completa, la usamos directamente
    if (imagePath.startsWith('http')) return imagePath;
    
    // Si es una ruta relativa, la construimos con la URL base
    return `${Global.url}products/media/${imagePath}`;
  };

  // Si no hay imagen, usar una por defecto
  const imageUrl = product.images && product.images.length > 0 
    ? getImageUrl(product.images[0].storedName)
    : getImageUrl('default.png');

  return (
    <div
      className={`admin-product-card ${selectionMode ? 'selection-mode' : ''} ${isSelected ? 'selected' : ''}`}
      onClick={() => selectionMode && onSelect(product._id)}
    >
      {isSelected && (
        <div className="selection-checkmark">
          <LuCheck size={16} />
        </div>
      )}

      <div className="admin-product-image-container">
        <img
          src={imageUrl}
          alt={product.name}
          className="admin-product-image"
          onError={(e) => {
            e.target.src = `${Global.url}/products/media/default.png`;
          }}
        />
      </div>

      <div className="admin-product-info">
        <h3 className="admin-product-name">{product.name}</h3>
        <div className="admin-product-meta">
          <span className="admin-product-price">${product.price}</span>
          <span className="admin-product-stock">
            {product.stock || 0} en stock
          </span>
        </div>
        <div className="admin-product-details">
          {product.type && (
            <span className="admin-product-category">{product.type}</span>
          )} 
          {product.platforms && product.platforms.length > 0 && (
            <span className="admin-product-platform">
              {product.platforms[0].name}
            </span>
          )}
        </div>
      </div>

      <div className="admin-product-actions">
        <button
          className="edit-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (!selectionMode) {
              onEdit(product);
            }
          }}
          aria-label="Editar producto"
          disabled={selectionMode}
        >
          <LuPencil size={18} />
        </button>
        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(product._id);
          }}
          aria-label="Eliminar producto"
        >
          <LuTrash2 size={18} />
        </button>
      </div>
    </div>
  );
};

function GestionProductos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Estados para los modales
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Opciones de filtrado
  const productTypes = [
    { value: 'all', label: 'Todos los tipos' },
    { value: 'Juego', label: 'Juegos' },
    { value: 'Tarjeta-regalo', label: 'Tarjetas de regalo' },
    { value: 'Suscripcion', label: 'Suscripciones' }
  ];

  const platforms = [
    { value: 'all', label: 'Todas las plataformas' },
    { value: 'PlayStation', label: 'PlayStation' },
    { value: 'Xbox', label: 'Xbox' },
    { value: 'Nintendo', label: 'Nintendo' },
    { value: 'PC', label: 'PC' }
  ];

  // Función para cargar productos desde el backend
  const fetchProducts = async (page = 1, type = 'all', platform = 'all') => {
  setLoading(true);
  setError(null);
  
  try {
    // Construir URL base
    let url = `${Global.url}/products`;
    
    // Determinar el endpoint según los filtros
    if (type !== 'all' && platform !== 'all') {
      url = `${Global.url}products/platform/${platform}/${type}/${page}`;
    } else if (type !== 'all') {
      url = `${Global.url}products/${type}/${page}`;
    } else if (platform !== 'all') {
      url = `${Global.url}products/platform/${platform}/all/${page}`;
    } else {
      url = `${Global.url}products/all/${page}`;
    }

    console.log('Fetching from:', url); // Para depuración
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        // Si necesitas autenticación:
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    // Manejar errores HTTP
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    // Verificar que la respuesta sea JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`La respuesta no es JSON: ${text.substring(0, 100)}...`);
    }
    
    const data = await response.json();

    console.log('Response status:', data);
    
    // Actualizar estado con los datos
    setProducts(data.products || data.docs || []);
    setCurrentPage(data.page || data.currentPage || 1);
    setTotalPages(data.pages || data.totalPages || 1);
    
  } catch (err) {
    console.error('Error al cargar productos:', err);
    setError(err.message.includes('JSON') 
      ? 'Error en el formato de los datos recibidos' 
      : err.message);
    setProducts([]);
  } finally {
    setLoading(false);
  }
};

  // Cargar productos al montar el componente y cuando cambian los filtros
  useEffect(() => {
    fetchProducts(currentPage, selectedType, selectedPlatform);
  }, [currentPage, selectedType, selectedPlatform]);

  // Filtrar productos localmente según el término de búsqueda
  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Manejar selección de productos
  const toggleProductSelection = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Manejar eliminación de producto
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`${Global.url}products/${productId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      // Actualizar la lista de productos
      fetchProducts(currentPage, selectedType, selectedPlatform);
      setSelectedProducts(prev => prev.filter(id => id !== productId));
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      setError(err.message);
    }
  };

  // Manejar agregar producto
  const handleAddProduct = () => {
    setIsAddModalOpen(true);
  };

  // Manejar edición de producto
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  // Manejar cambio de página
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Manejar guardar nuevo producto
  const handleSaveNewProduct = async (newProduct) => {
  try {
    const formData = new FormData();
    
    // Append all product data
    formData.append('name', newProduct.name);
    formData.append('type', newProduct.type);
    formData.append('description', newProduct.description);
    formData.append('genres', JSON.stringify(newProduct.genres));
    formData.append('releaseDate', newProduct.releaseDate);
    formData.append('idSupplier', newProduct.idSupplier);
    formData.append('platforms', JSON.stringify(newProduct.platforms));
    
    // Append initial stock if exists
    if (newProduct.initialStock) {
      formData.append('initialStock', JSON.stringify(newProduct.initialStock));
    }
    
    // Append images
    if (newProduct.images && newProduct.images.length > 0) {
      newProduct.images.forEach((file, index) => {
        formData.append(`images`, file);
      });
    }

    const response = await fetch(Global.url+'products/', {
      method: 'POST',
      body: formData // No content-type header needed for FormData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al guardar el producto');
    }

    setIsAddModalOpen(false);
    fetchProducts(currentPage, selectedType, selectedPlatform);
  } catch (err) {
    console.error('Error al guardar producto:', err);
    setError(err.message);
  }
};

// Update the handleUpdateProduct function
const handleUpdateProduct = async (updatedProduct) => {
  try {
    const formData = new FormData();
    
    // Append updated product data
    formData.append('name', updatedProduct.name);
    formData.append('type', updatedProduct.type);
    formData.append('description', updatedProduct.description);
    formData.append('genres', JSON.stringify(updatedProduct.genres));
    formData.append('releaseDate', updatedProduct.releaseDate);
    formData.append('idSupplier', updatedProduct.idSupplier);
    formData.append('platforms', JSON.stringify(updatedProduct.platforms));
    
    // Append new images if any
    if (updatedProduct.newImages && updatedProduct.newImages.length > 0) {
      updatedProduct.newImages.forEach((file, index) => {
        formData.append(`images`, file);
      });
    }

    const response = await fetch(`${Global.url}products/${updatedProduct._id}`, {
      method: 'PUT',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el producto');
    }

    setIsEditModalOpen(false);
    fetchProducts(currentPage, selectedType, selectedPlatform);
  } catch (err) {
    console.error('Error al actualizar producto:', err);
    setError(err.message);
  }
};

  return (
    <div className="admin-products-container">
      <div className="admin-toolbar1">
        <h1 className="admin-title1">Gestión de Productos</h1>

        <div className="search-container-products">
          <LuSearch className="search-icon-products" size={20} />
          <input
            type="text"
            placeholder="Buscar productos..."
            className="search-input-products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-container">
          <select
            className="type-filter"
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setCurrentPage(1); // Resetear a la primera página al cambiar filtros
            }}
          >
            {productTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-container">
          <select
            className="platform-filter"
            value={selectedPlatform}
            onChange={(e) => {
              setSelectedPlatform(e.target.value);
              setCurrentPage(1); // Resetear a la primera página al cambiar filtros
            }}
          >
            {platforms.map(platform => (
              <option key={platform.value} value={platform.value}>
                {platform.label}
              </option>
            ))}
          </select>
        </div>

        <button
          className="add-product-btn"
          onClick={handleAddProduct}
        >
          <LuPlus size={18} />
          <span>Agregar</span>
        </button>

        
      </div>

      {loading && (
        <div className="loading-message">
          Cargando productos...
        </div>
      )}

      {error && (
        <div className="error-message">
          Error al cargar productos: {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <AdminProductCard
                  key={product._id}
                  product={product}
                  isSelected={selectedProducts.includes(product._id)}
                  onSelect={toggleProductSelection}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                  selectionMode={selectionMode}
                />
              ))
            ) : (
              <div className="no-products-message">
                No se encontraron productos que coincidan con los filtros.
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination-controls">
              <button
                className="button-after"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <button
                className="button-next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}

      {selectionMode && selectedProducts.length > 0 && (
        <div className="selection-actions-bar">
          <div className="selected-count">
            {selectedProducts.length} seleccionados
          </div>
          <div className="selection-actions">
            <button
              className={`selection-action-btn ${selectedProducts.length !== 1 ? 'disabled' : ''}`}
              onClick={() => {
                if (selectedProducts.length === 1) {
                  const productToEdit = products.find(p => p._id === selectedProducts[0]);
                  handleEditProduct(productToEdit);
                }
              }}
              disabled={selectedProducts.length !== 1}
            >
              <LuPencil size={16} />
              <span>Editar</span>
            </button>
            <button
              className="selection-action-btn delete"
              onClick={() => {
                selectedProducts.forEach(id => handleDeleteProduct(id));
                setSelectionMode(false);
              }}
            >
              <LuTrash2 size={16} />
              <span>Eliminar</span>
            </button>
            <button
              className="selection-action-btn cancel"
              onClick={() => setSelectedProducts([])}
            >
              <LuX size={16} />
              <span>Deseleccionar</span>
            </button>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <AddProductModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveNewProduct}
          platforms={platforms.filter(p => p.value !== 'all')}
          productTypes={productTypes.filter(t => t.value !== 'all')}
        />
      )}

      {isEditModalOpen && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdateProduct}
          platforms={platforms.filter(p => p.value !== 'all')}
          productTypes={productTypes.filter(t => t.value !== 'all')}
        />
      )}
    </div>
  );
}

export default GestionProductos;