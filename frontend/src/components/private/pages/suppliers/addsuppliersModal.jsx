import React, { useState, useRef } from 'react';
import { LuX } from 'react-icons/lu';
import './addsuppliersModal.css'; // Puedes cambiar el nombre si tienes un CSS específico

const AddSuppliersModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        setErrors(prev => ({ ...prev, image: 'Solo se permiten imágenes' }));
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'La imagen debe ser menor a 2MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);

      if (fileInputRef.current?.files?.[0]) {
        formDataToSend.append('image', fileInputRef.current.files[0]);
      }

      await onSave(formDataToSend);
      onClose();
    } catch (error) {
      setErrors(prev => ({ ...prev, form: error.message || 'Error al registrar el proveedor' }));
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
        <h2 className="modal-title">Registrar Nuevo Proveedor</h2>
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="product-form">
            {/* Imagen del proveedor */}
            <div className="form-group-product">
              <label>Imagen del Proveedor (Opcional)</label>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="upload-btn"
              >
                Seleccionar Imagen
              </button>
              {imagePreview && (
                <div className="image-preview-container">
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="image-preview"
                  />
                </div>
              )}
              {errors.image && <div className="error-message">{errors.image}</div>}
            </div>
            {/* Nombre */}
            <div className="form-group-product">
              <label>Nombre*</label>
              <input
                name="name"
                placeholder="Nombre del proveedor"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
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
                {loading ? 'Registrando...' : 'Registrar Proveedor'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSuppliersModal;