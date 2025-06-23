import React, { useState, useEffect } from 'react';
import './Gestionsuppliers.css'; // Asegúrate de tener un CSS para estilos
import { LuPlus, LuCheck, LuX, LuPencil, LuTrash2 } from 'react-icons/lu';
import { Global } from '../../../../helpers/Global';
import EditSupplierModal from './EditsuppliersModal';
import AddSuppliersModal from './addsuppliersModal';

const AdminSupplierCard = ({
  supplier,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  selectionMode
}) => {
  // Mostrar avatar o imagen
  const getImage = () => {
    if (supplier.image) {
      return (
        <img
          src={supplier.image}
          alt={supplier.name}
          className="employee-image"
          onError={(e) => {
            e.target.src = '';
            e.target.className = 'employee-avatar';
            e.target.textContent = supplier.name.charAt(0);
          }}
        />
      );
    }
    return (
      <div className="employee-avatar">
        {supplier.name.charAt(0)}
      </div>
    );
  };

  return (
    <div className={`admin-product-card ${selectionMode ? 'selection-mode' : ''} ${isSelected ? 'selected' : ''}`}
      onClick={() => selectionMode && onSelect(supplier._id)}>
      {isSelected && (
        <div className="selection-checkmark">
          <LuCheck size={16} />
        </div>
      )}
      <div className="admin-product-image-container">
        {getImage()}
      </div>
      <div className="admin-product-info">
        <h3 className="admin-product-name">{supplier.name}</h3>
      </div>
      <div className="admin-product-actions">
        <button
          className="edit-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (!selectionMode) {
              onEdit(supplier);
            }
          }}
          aria-label="Editar proveedor"
          disabled={selectionMode}
        >
          <LuPencil size={18} />
        </button>
        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(supplier._id);
          }}
          aria-label="Eliminar proveedor"
        >
          <LuTrash2 size={18} />
        </button>
      </div>
    </div>
  );
};

function Gestionsuppliers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Cargar proveedores desde backend
  const fetchSuppliers = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${Global.url}suppliers`;
      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setSuppliers(Array.isArray(data.suppliers) ? data.suppliers : Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setSuppliers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter(
    supplier =>
      supplier &&
      typeof supplier.name === 'string' &&
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSupplierSelection = (supplierId) => {
    setSelectedSuppliers(prev =>
      prev.includes(supplierId)
        ? prev.filter(id => id !== supplierId)
        : [...prev, supplierId]
    );
  };

  const handleNewSupplier = () => {
    setIsAddModalOpen(true);
  };

  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier);
    setIsEditModalOpen(true);
  };

  const handleSaveNewSupplier = async (formData) => {
    try {
      // Debug: Log FormData contents before sending
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
  
      const response = await fetch(`${Global.url}registerSuppliers`, {
        method: 'POST',
        body: formData // Send the FormData directly
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar proveedor');
      }
  
      const data = await response.json();
      console.log('Success:', data);
      
      setIsAddModalOpen(false);
      fetchSuppliers();
    } catch (err) {
      console.error('Error detallado al registrar el proveedor:', err);
      setError(err.message || 'Error desconocido al registrar proveedor');
    }
  };

  const handleUpdateSupplier = async (updatedSupplier) => {
    try {
      const formData = new FormData();
      formData.append('name', updatedSupplier.name);
      if (updatedSupplier.imageFile) {
        formData.append('image', updatedSupplier.imageFile);
      }

      const response = await fetch(`${Global.url}suppliers/${updatedSupplier._id}`, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el proveedor');
      }

      setIsEditModalOpen(false);
      fetchSuppliers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteSupplier = async (supplierId) => {
    try {
      const response = await fetch(`${Global.url}suppliers/${supplierId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el proveedor');
      }

      fetchSuppliers();
      setSelectedSuppliers(prev => prev.filter(id => id !== supplierId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-products-container">
      <div className="admin-toolbar1">
        <h1 className="admin-title1">Gestión de Proveedores</h1>

        <div className="search-container-products">
          <input
            type="text"
            placeholder="Buscar proveedores..."
            className="search-input-products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          className="add-product-btn"
          onClick={handleNewSupplier}
        >
          <LuPlus size={18} />
          <span>Agregar</span>
        </button>
      </div>

      {loading && (
        <div className="loading-message">
          Cargando proveedores...
        </div>
      )}

      {error && (
        <div className="error-message">
          Error al cargar proveedores: {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="products-grid">
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map(supplier => (
                <AdminSupplierCard
                  key={supplier._id}
                  supplier={supplier}
                  isSelected={selectedSuppliers.includes(supplier._id)}
                  onSelect={toggleSupplierSelection}
                  onEdit={handleEditSupplier}
                  onDelete={handleDeleteSupplier}
                  selectionMode={selectionMode}
                />
              ))
            ) : (
              <div className="no-products-message">
                No se encontraron proveedores que coincidan con los filtros.
              </div>
            )}
          </div>
        </>
      )}

      {selectionMode && selectedSuppliers.length > 0 && (
        <div className="selection-actions-bar">
          <div className="selected-count">
            {selectedSuppliers.length} seleccionados
          </div>
          <div className="selection-actions">
            <button
              className={`selection-action-btn ${selectedSuppliers.length !== 1 ? 'disabled' : ''}`}
              onClick={() => {
                if (selectedSuppliers.length === 1) {
                  const supplierToEdit = suppliers.find(e => e._id === selectedSuppliers[0]);
                  handleEditSupplier(supplierToEdit);
                }
              }}
              disabled={selectedSuppliers.length !== 1}
            >
              <LuPencil size={16} />
              <span>Editar</span>
            </button>
            <button
              className="selection-action-btn delete"
              onClick={() => {
                selectedSuppliers.forEach(id => handleDeleteSupplier(id));
                setSelectionMode(false);
              }}
            >
              <LuTrash2 size={16} />
              <span>Eliminar</span>
            </button>
            <button
              className="selection-action-btn cancel"
              onClick={() => setSelectedSuppliers([])}
            >
              <LuX size={16} />
              <span>Deseleccionar</span>
            </button>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <AddSuppliersModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveNewSupplier}
        />
      )}

      {isEditModalOpen && (
        <EditSupplierModal
          supplier={editingSupplier}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdateSupplier}
        />
      )}
    </div>
  );
}

export default Gestionsuppliers;