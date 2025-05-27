import React, { useState, useRef } from 'react';
import { LuX } from 'react-icons/lu';
import './AddEmployeeModal.css'; // Puedes reutilizar los mismos estilos del EditEmployeeModal

const AddEmployeeModal = ({ onClose, onSave, branches, charges, loadingBranches }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    charge: '',
    telephone: '',
    hiringDate: new Date().toISOString().split('T')[0], // Fecha actual por defecto
    password: '',
    confirmPassword: '',
    idSucursal: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.charge) newErrors.charge = 'El cargo es requerido';
    if (!formData.telephone.trim()) newErrors.telephone = 'El teléfono es requerido';
    if (!formData.hiringDate) newErrors.hiringDate = 'La fecha de contratación es requerida';
    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    else if (formData.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
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

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setLoading(true);
  try {
    const formDataToSend = new FormData(); // Renamed to avoid confusion
    
    // Append all fields from the component's state (formData)
    formDataToSend.append('name', formData.name);
    formDataToSend.append('lastName', formData.lastName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('chargue', formData.charge); // Note: backend expects 'chargue'
    formDataToSend.append('telephone', formData.telephone);
    formDataToSend.append('hiringDate', formData.hiringDate);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('idSucursal', formData.idSucursal);
    
    // Add image if exists
    if (fileInputRef.current?.files?.[0]) {
      formDataToSend.append('image', fileInputRef.current.files[0]);
    }

    await onSave(formDataToSend);
    onClose();
  } catch (error) {
    console.error('Error al registrar empleado:', error);
    setErrors(prev => ({ ...prev, form: error.message || 'Error al registrar el empleado' }));
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
        
        <h2 className="modal-title">Registrar Nuevo Empleado</h2>
        
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="product-form">
            
            {/* Imagen del empleado */}
            <div className="form-group-product">
              <label>Imagen del Empleado (Opcional)</label>
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
                placeholder="Nombre del empleado"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            {/* Apellido */}
            <div className="form-group-product">
              <label>Apellido*</label>
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
              <label>Email*</label>
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
              <label>Teléfono*</label>
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
              <label>Cargo*</label>
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
              <label>Sucursal*</label>
              {loadingBranches ? (
                <div>Cargando sucursales...</div>
              ) : (
                <select
                  name="idSucursal"
                  value={formData.idSucursal}
                  onChange={handleChange}
                  className={errors.idSucursal ? 'error' : ''}
                  disabled={loadingBranches}
                >
                  <option value="">Seleccione una sucursal</option>
                  {branches.map(branch => (
                    <option key={branch._id} value={branch._id}>
                      {branch.Direction} ({branch.Name})
                    </option>
                  ))}
                </select>
              )}
              {errors.idSucursal && <span className="error-message">{errors.idSucursal}</span>}
            </div>

            {/* Fecha de contratación */}
            <div className="form-group-product">
              <label>Fecha de Contratación*</label>
              <input
                type="date"
                name="hiringDate"
                value={formData.hiringDate}
                onChange={handleChange}
                className={errors.hiringDate ? 'error' : ''}
              />
              {errors.hiringDate && <span className="error-message">{errors.hiringDate}</span>}
            </div>

            {/* Contraseña */}
            <div className="form-group-product">
              <label>Contraseña*</label>
              <input
                type="password"
                name="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {/* Confirmar Contraseña */}
            <div className="form-group-product">
              <label>Confirmar Contraseña*</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Repite la contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
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
                {loading ? 'Registrando...' : 'Registrar Empleado'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;