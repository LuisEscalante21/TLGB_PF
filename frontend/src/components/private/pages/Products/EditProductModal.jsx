import React, { useState, useRef, useEffect } from 'react';
import { LuX, LuUpload } from 'react-icons/lu';
import './AddProductModal.css';
import { Global } from '../../../../helpers/Global';

const EditProductModal = ({ product, onClose, onUpdate, platforms, productTypes }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Juego',
    price: '',
    stock: '',
    description: '',
    platforms: [{ name: '', consoles: [{ name: '' }] }],
    genres: [],
    idSupplier: ''
  });

  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cargar datos del producto al montar el componente
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        type: product.type || 'Juego',
        price: product.price?.toString() || '',
        stock: product.stock?.toString() || '',
        description: product.description || '',
        platforms: product.platforms || [{ name: '', consoles: [{ name: '' }] }],
        genres: product.genres || [],
        idSupplier: product.idSupplier?._id || ''
      });

      // Configurar vista previa de la imagen
      if (product.images && product.images.length > 0) {
        setPreviewImage(`${Global.url}products/media/${product.images[0].storedName}`);
      } else {
        setPreviewImage(`${Global.url}products/media/default.png`);
      }
    }
  }, [product]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.description.trim()) newErrors.description = 'La descripción es requerida';
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) 
      newErrors.price = 'Precio inválido';
    if (!formData.stock || isNaN(formData.stock) || parseInt(formData.stock) < 0) 
      newErrors.stock = 'Stock inválido';
    if (!formData.type) newErrors.type = 'Seleccione un tipo';
    
    // Validar plataformas
    formData.platforms.forEach((platform, index) => {
      if (!platform.name) {
        newErrors[`platforms[${index}].name`] = 'Seleccione plataforma';
      }
      platform.consoles.forEach((console, cIndex) => {
        if (!console.name) {
          newErrors[`platforms[${index}].consoles[${cIndex}].name`] = 'Nombre de consola requerido';
        }
      });
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error al cambiar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePlatformChange = (index, field, value) => {
    const updatedPlatforms = [...formData.platforms];
    updatedPlatforms[index][field] = value;
    setFormData(prev => ({
      ...prev,
      platforms: updatedPlatforms
    }));
    
    // Limpiar error si existe
    const errorKey = `platforms[${index}].${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const handleConsoleChange = (platformIndex, consoleIndex, value) => {
    const updatedPlatforms = [...formData.platforms];
    updatedPlatforms[platformIndex].consoles[consoleIndex].name = value;
    setFormData(prev => ({
      ...prev,
      platforms: updatedPlatforms
    }));
    
    // Limpiar error si existe
    const errorKey = `platforms[${platformIndex}].consoles[${consoleIndex}].name`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const addPlatform = () => {
    setFormData(prev => ({
      ...prev,
      platforms: [...prev.platforms, { name: '', consoles: [{ name: '' }] }]
    }));
  };

  const removePlatform = (index) => {
    const updatedPlatforms = [...formData.platforms];
    updatedPlatforms.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      platforms: updatedPlatforms
    }));
  };

  const addConsole = (platformIndex) => {
    const updatedPlatforms = [...formData.platforms];
    updatedPlatforms[platformIndex].consoles.push({ name: '' });
    setFormData(prev => ({
      ...prev,
      platforms: updatedPlatforms
    }));
  };

  const removeConsole = (platformIndex, consoleIndex) => {
    const updatedPlatforms = [...formData.platforms];
    updatedPlatforms[platformIndex].consoles.splice(consoleIndex, 1);
    setFormData(prev => ({
      ...prev,
      platforms: updatedPlatforms
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.match('image.*')) {
        setErrors(prev => ({ ...prev, imageFile: 'Solo se permiten imágenes' }));
        return;
      }
      
      // Validar tamaño (ejemplo: máximo 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, imageFile: 'La imagen debe ser menor a 2MB' }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        imageFile: file
      }));
      
      // Crear vista previa
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Limpiar error si existe
      if (errors.imageFile) {
        setErrors(prev => ({ ...prev, imageFile: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Preparar datos para enviar
      const updatedProduct = {
        _id: product._id,
        name: formData.name,
        type: formData.type,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        description: formData.description,
        platforms: formData.platforms,
        genres: formData.genres,
        idSupplier: formData.idSupplier
      };

      // Llamar a la función de actualización
      await onUpdate(updatedProduct, formData.imageFile);
      
      onClose();
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      setErrors(prev => ({ ...prev, form: 'Error al actualizar el producto' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          <LuX size={20} />
        </button>
        
        <h2 className="modal-title">Editar Producto</h2>
        
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="product-form">
            {/* Vista previa de la imagen */}
            <div className="image-preview-container">
              <img 
                src={previewImage} 
                alt="Vista previa" 
                className="image-preview"
                onError={(e) => {
                  e.target.src = `${Global.url}/products/media/default.png`;
                }}
              />
            </div>

            {/* Nombre del Producto */}
            <div className="form-group-product">
              <label>Nombre del Producto</label>
              <input
                name="name"
                placeholder="Nombre del producto"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            {/* Tipo de Producto */}
            <div className="form-group-product">
              <label>Tipo de Producto</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={errors.type ? 'error' : ''}
              >
                {productTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              {errors.type && <span className="error-message">{errors.type}</span>}
            </div>

            {/* Fila: Precio y Stock */}
            <div className="form-row">
              <div className="form-group-product">
                <label>Precio</label>
                <input
                  name="price"
                  placeholder="Precio"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className={errors.price ? 'error' : ''}
                />
                {errors.price && <span className="error-message">{errors.price}</span>}
              </div>
              <div className="form-group-product">
                <label>Stock</label>
                <input
                  name="stock"
                  placeholder="Stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  className={errors.stock ? 'error' : ''}
                />
                {errors.stock && <span className="error-message">{errors.stock}</span>}
              </div>
            </div>

            {/* Descripción */}
            <div className="form-group-product">
              <label>Descripción</label>
              <textarea
                name="description"
                placeholder="Descripción del producto"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className={errors.description ? 'error' : ''}
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            {/* Plataformas */}
            <div className="form-group-product">
              <label>Plataformas</label>
              {formData.platforms.map((platform, pIndex) => (
                <div key={pIndex} className="platform-group">
                  <div className="platform-row">
                    <select
                      value={platform.name}
                      onChange={(e) => handlePlatformChange(pIndex, 'name', e.target.value)}
                      className={errors[`platforms[${pIndex}].name`] ? 'error' : ''}
                    >
                      <option value="">Seleccione plataforma</option>
                      {platforms.map(plat => (
                        <option key={plat.value} value={plat.value}>{plat.label}</option>
                      ))}
                    </select>
                    <button 
                      type="button" 
                      onClick={() => removePlatform(pIndex)}
                      className="remove-btn"
                    >
                      Eliminar
                    </button>
                  </div>
                  
                  {errors[`platforms[${pIndex}].name`] && (
                    <span className="error-message">{errors[`platforms[${pIndex}].name`]}</span>
                  )}

                  {/* Consolas para esta plataforma */}
                  <div className="consoles-group">
                    {platform.consoles.map((console, cIndex) => (
                      <div key={cIndex} className="console-row">
                        <input
                          type="text"
                          value={console.name}
                          onChange={(e) => handleConsoleChange(pIndex, cIndex, e.target.value)}
                          placeholder="Nombre de consola"
                          className={errors[`platforms[${pIndex}].consoles[${cIndex}].name`] ? 'error' : ''}
                        />
                        <button 
                          type="button" 
                          onClick={() => removeConsole(pIndex, cIndex)}
                          className="remove-btn"
                        >
                          Eliminar
                        </button>
                      </div>
                    ))}
                    <button 
                      type="button" 
                      onClick={() => addConsole(pIndex)}
                      className="add-btn"
                    >
                      + Añadir Consola
                    </button>
                  </div>
                </div>
              ))}
              <button 
                type="button" 
                onClick={addPlatform}
                className="add-btn"
              >
                + Añadir Plataforma
              </button>
            </div>

            {/* Subida de imagen */}
            <div className="form-group-product file-input">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                id="file-upload"
                ref={fileInputRef}
              />
              <label htmlFor="file-upload" className={errors.imageFile ? 'error' : ''}>
                <LuUpload size={16} />
                <span>{formData.imageFile ? 'Cambiar imagen' : 'Seleccionar imagen'}</span>
              </label>
              {errors.imageFile && <span className="error-message">{errors.imageFile}</span>}
            </div>

            {/* Mensaje de error general */}
            {errors.form && (
              <div className="error-message" style={{ marginTop: '15px' }}>
                {errors.form}
              </div>
            )}

            {/* Acciones del formulario */}
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-btn"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="save-btn"
                disabled={loading}
              >
                {loading ? 'Actualizando...' : 'Actualizar Producto'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;