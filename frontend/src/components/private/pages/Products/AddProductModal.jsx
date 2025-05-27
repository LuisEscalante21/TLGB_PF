import React, { useState, useRef, useEffect } from 'react';
import { LuX, LuUpload } from 'react-icons/lu';
import './AddProductModal.css';

const AddProductModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Juego',
    platforms: [{ name: '', consoles: [{ name: '', price: 0 }] }],
    description: '',
    genres: '',
    releaseDate: new Date().toISOString().split('T')[0],
    idSupplier: '',
    initialStock: 0
  });

  const [suppliers, setSuppliers] = useState([]);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/suppliers");
        const data = await res.json();
        setSuppliers(data);
      } catch (err) {
        console.error("Error al cargar proveedores:", err);
      }
    };
    fetchSuppliers();
  }, []);

  const productTypes = [
    { value: 'Juego', label: 'Juego' },
    { value: 'Tarjeta-regalo', label: 'Tarjeta de regalo' },
    { value: 'Suscripcion', label: 'Suscripción' }
  ];

  const platforms = [
    { value: 'PlayStation', label: 'PlayStation' },
    { value: 'Xbox', label: 'Xbox' },
    { value: 'Nintendo', label: 'Nintendo' },
    { value: 'PC', label: 'PC' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.description.trim()) newErrors.description = 'La descripción es requerida';
    
    formData.platforms.forEach((platform, index) => {
      if (!platform.name) {
        newErrors[`platforms[${index}].name`] = 'Seleccione plataforma';
      }
      platform.consoles.forEach((console, cIndex) => {
        if (!console.name) {
          newErrors[`platforms[${index}].consoles[${cIndex}].name`] = 'Nombre de consola requerido';
        }
        if (!console.price || isNaN(console.price) || parseFloat(console.price) <= 0) {
          newErrors[`platforms[${index}].consoles[${cIndex}].price`] = 'Precio inválido';
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

  const handleConsoleChange = (platformIndex, consoleIndex, field, value) => {
    const updatedPlatforms = [...formData.platforms];
    updatedPlatforms[platformIndex].consoles[consoleIndex][field] = value;
    setFormData(prev => ({
      ...prev,
      platforms: updatedPlatforms
    }));
    
    // Limpiar error si existe
    const errorKey = `platforms[${platformIndex}].consoles[${consoleIndex}].${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const addPlatform = () => {
    setFormData(prev => ({
      ...prev,
      platforms: [...prev.platforms, { name: '', consoles: [{ name: '', price: 0 }] }]
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
    updatedPlatforms[platformIndex].consoles.push({ name: '', price: 0 });
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
      if (!file.type.match('image.*')) {
        setErrors(prev => ({ ...prev, imageFile: 'Solo se permiten imágenes' }));
        return;
      }
      
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, imageFile: 'La imagen debe ser menor a 2MB' }));
        return;
      }

      // Crear vista previa
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
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
      const newProduct = {
        name: formData.name,
        type: formData.type,
        description: formData.description,
        platforms: formData.platforms,
        genres: formData.genres.split(',').map(g => g.trim()),
        releaseDate: formData.releaseDate,
        idSupplier: formData.idSupplier,
        initialStock: [
          {
            idBranch: 'default', // puedes ajustar esto si manejas múltiples sucursales
            quantity: parseInt(formData.initialStock) || 0
          }
        ]
      };

      const imageFile = fileInputRef.current?.files?.[0];
      await onSave(newProduct, imageFile);
      onClose();
    } catch (error) {
      console.error('Error al guardar producto:', error);
      setErrors(prev => ({ ...prev, form: 'Error al guardar el producto' }));
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
        
        <h2 className="modal-title">Agregar Nuevo Producto</h2>
        
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="product-form">
            {/* Vista previa de la imagen */}
            {imagePreview && (
              <div className="image-preview-container">
                <img 
                  src={imagePreview} 
                  alt="Vista previa" 
                  className="image-preview"
                />
              </div>
            )}
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
                          onChange={(e) => handleConsoleChange(pIndex, cIndex, 'name', e.target.value)}
                          placeholder="Nombre de consola"
                          className={errors[`platforms[${pIndex}].consoles[${cIndex}].name`] ? 'error' : ''}
                        />
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={console.price}
                          onChange={(e) => handleConsoleChange(pIndex, cIndex, 'price', e.target.value)}
                          placeholder="Precio"
                          className={errors[`platforms[${pIndex}].consoles[${cIndex}].price`] ? 'error' : ''}
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

            {/* Géneros */}
            <div className="form-group-product">
              <label>Géneros (separados por comas)</label>
              <input
                name="genres"
                placeholder="Ej: Aventura, Acción, RPG"
                value={formData.genres}
                onChange={(e) => setFormData({...formData, genres: e.target.value})}
              />
            </div>

            {/* Fecha de lanzamiento */}
            <div className="form-group-product">
              <label>Fecha de Lanzamiento</label>
              <input
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
              />
            </div>

            {/* Proveedor */}
            <div className="form-group-product">
              <label>Proveedor</label>
              <select
                name="idSupplier"
                value={formData.idSupplier}
                onChange={handleChange}
                className={errors.idSupplier ? 'error' : ''}
              >
                <option value="">Seleccione proveedor</option>
                {suppliers.map(supplier => (
                  <option key={supplier._id} value={supplier._id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
              {errors.idSupplier && <span className="error-message">{errors.idSupplier}</span>}
            </div>

            

            {/* Subida de imagen */}
            <div className="form-group-product file-input">
              <input 
                type="file" 
                name="imageFile"
                accept="image/*" 
                onChange={handleFileChange} 
                id="file-upload"
                ref={fileInputRef}
              />
              <label htmlFor="file-upload" className={errors.imageFile ? 'error' : ''}>
                <LuUpload size={16} />
                <span>{imagePreview ? 'Cambiar imagen' : 'Seleccionar imagen'}</span>
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
                {loading ? 'Guardando...' : 'Guardar Producto'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;