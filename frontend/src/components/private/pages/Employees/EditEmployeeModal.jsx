import React, { useState, useEffect, useRef } from 'react';
import { LuX } from 'react-icons/lu';
import './AddEmployeeModal.css'; // Reutilizamos los mismos estilos

const EditEmployeeModal = ({ employee, onClose, onUpdate, branches, charges }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    charge: '',
    telephone: '',
    hiringDate: '',
    idSucursal: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Función para convertir formato dd-MM-yyyy a yyyy-MM-dd
  const convertToInputDate = (dateString) => {
    if (!dateString) return '';
    
    // Si ya está en formato yyyy-MM-dd, retornar tal cual
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
    
    // Convertir de dd-MM-yyyy a yyyy-MM-dd
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    
    return '';
  };

  
  
  // Inicializar el formulario con los datos del empleado
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        lastName: employee.lastName || '',
        email: employee.email || '',
        charge: employee.charge || employee.chargue || '',
        telephone: employee.telephone || '',
        hiringDate: convertToInputDate(employee.hiringDate),
        image: employee.image || '',
        idSucursal: employee.idSucursal || ''
      });
      if (employee.image) setImagePreview(employee.image);
    }
  }, [employee]);

  const convertToBackendFormat = (dateString) => {
    if (!dateString) return '';
    
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    
    return dateString;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.charge) newErrors.charge = 'El cargo es requerido';
    if (!formData.telephone.trim()) newErrors.telephone = 'El teléfono es requerido';
    if (!formData.hiringDate) newErrors.hiringDate = 'La fecha de contratación es requerida';
    if (!formData.idSucursal) newErrors.idSucursal = 'La sucursal es requerida';
    
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const employeeToUpdate = {
    ...formData,
    _id: employee._id,
    hiringDate: convertToBackendFormat(formData.hiringDate),
    imageFile: fileInputRef.current?.files?.[0] // Agregar el archivo de imagen
  };
  
  await onUpdate(employeeToUpdate);
  };

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    // Validar tipo y tamaño
    if (!file.type.match('image.*')) {
      setErrors(prev => ({ ...prev, image: 'Solo se permiten imágenes' }));
      return;
    }
    
    if (file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, image: 'La imagen debe ser menor a 2MB' }));
      return;
    }

    // Crear vista previa
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    
    setErrors(prev => ({ ...prev, image: '' }));
  }
};

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          <LuX size={20} />
        </button>
        
        <h2 className="modal-title">Editar Empleado</h2>
        
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="product-form">

            <div className="form-group-product">
              <label>Imagen del Empleado</label>
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
              <label>Nombre</label>
              <input
                name="name"
                placeholder="Nombre del empleado"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            {/* Apellido */}
            <div className="form-group-product">
              <label>Apellido</label>
              <input
                name="lastName"
                placeholder="Apellido del empleado"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>

            {/* Email */}
            <div className="form-group-product">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Teléfono */}
            <div className="form-group-product">
              <label>Teléfono</label>
              <input
                name="telephone"
                placeholder="1234-5678"
                value={formData.telephone}
                onChange={handleChange}
                className={errors.telephone ? 'error' : ''}
              />
              {errors.telephone && <span className="error-message">{errors.telephone}</span>}
            </div>

            {/* Cargo */}
            <div className="form-group-product">
              <label>Cargo</label>
              <select
                name="charge"
                value={formData.charge}
                onChange={handleChange}
                className={errors.charge ? 'error' : ''}
              >
                <option value="">Seleccione un cargo</option>
                {charges.map(charge => (
                  <option key={charge.value} value={charge.value}>
                    {charge.label}
                  </option>
                ))}
              </select>
              {errors.charge && <span className="error-message">{errors.charge}</span>}
            </div>

            {/* Sucursal */}
            <div className="form-group-product">
              <label>Sucursal</label>
              <select
                name="idSucursal"
                value={formData.idSucursal}
                onChange={handleChange}
                className={errors.idSucursal ? 'error' : ''}
              >
                <option value="">Seleccione una sucursal</option>
                {branches.map(branch => (
                  <option key={branch.value} value={branch.value}>
                    {branch.label}
                  </option>
                ))}
              </select>
              {errors.idSucursal && <span className="error-message">{errors.idSucursal}</span>}
            </div>

            {/* Fecha de contratación */}
            <div className="form-group-product">
              <label>Fecha de Contratación</label>
              <input
                type="date"
                name="hiringDate"
                value={formData.hiringDate}
                onChange={handleChange}
                className={errors.hiringDate ? 'error' : ''}
              />
              {errors.hiringDate && <span className="error-message">{errors.hiringDate}</span>}
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
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;