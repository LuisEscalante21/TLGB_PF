import React, { useState, useEffect } from 'react';
import './GestionEmpleados.css';
import { LuSearch, LuPlus, LuCheck, LuX, LuPencil, LuTrash2 } from 'react-icons/lu';
import { Global } from '../../../../helpers/Global';
import EditEmployeeModal from './EditEmployeeModal';
import AddEmployeeModal from './AddEmployeeModal';

const AdminEmployeeCard = ({
  employee,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  selectionMode
}) => {

     // Mostrar avatar o imagen
  const getImage = () => {
    if (employee.image) {
      return (
        <img 
          src={employee.image} 
          alt={`${employee.name} ${employee.lastName}`}
          className="employee-image"
          onError={(e) => {
            e.target.src = ''; // Mostrar avatar si falla la imagen
            e.target.className = 'employee-avatar';
            e.target.textContent = `${employee.name.charAt(0)}${employee.lastName.charAt(0)}`;
          }}
        />
      );
    }
    return (
      <div className="employee-avatar">
        {employee.name.charAt(0)}{employee.lastName.charAt(0)}
      </div>
    );
  };

  return (
    <div className={`admin-product-card ${selectionMode ? 'selection-mode' : ''} ${isSelected ? 'selected' : ''}`}
      onClick={() => selectionMode && onSelect(employee._id)}>
      
      {isSelected && (
        <div className="selection-checkmark">
          <LuCheck size={16} />
        </div>
      )}

      <div className="admin-product-image-container">
        {getImage()}
      </div>

      <div className="admin-product-info">
        <h3 className="admin-product-name">{employee.name} {employee.lastName}</h3>
        <div className="admin-product-meta">
          <span className="admin-product-price">{employee.email}</span>
          <span className="admin-product-stock">
            {employee.telephone}
          </span>
        </div>
        <div className="admin-product-details">
          <span className="admin-product-category">{employee.charge || employee.chargue || 'Sin cargo'}</span>
          <br />
          <span className="admin-product-platform">
            Fecha: {employee.hiringDate || 'No especificada'}
          </span>
        </div>
      </div>

      <div className="admin-product-actions">
        <button
          className="edit-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (!selectionMode) {
              onEdit(employee);
            }
          }}
          aria-label="Editar empleado"
          disabled={selectionMode}
        >
          <LuPencil size={18} />
        </button>
        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(employee._id);
          }}
          aria-label="Eliminar empleado"
        >
          <LuTrash2 size={18} />
        </button>
      </div>
    </div>
  );
};

function GestionEmpleados() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCharge, setSelectedCharge] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [branches, setBranches] = useState([]);
  const [loadingBranches, setLoadingBranches] = useState(false);

  // Opciones de filtrado
  const employeeCharges = [
    { value: 'Admin', label: 'Administrador' },
    { value: 'Employee', label: 'Empleado' }
  ];
  

  // Función para cargar empleados desde el backend
  const fetchEmployees = async (page = 1, charge = 'all', branch = 'all') => {
    setLoading(true);
    setError(null);
    
    try {
      let url = `${Global.url}employees/page/${page}`;
      const params = new URLSearchParams();
      if (charge !== 'all') params.append('charge', charge);
      if (branch !== 'all') params.append('branch', branch);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      setEmployees(data.employees || []);
      setCurrentPage(data.currentPage || 1);
      setTotalPages(data.totalPages || 1);
      
    } catch (err) {
      setError(err.message);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBranches = async () => {
    setLoadingBranches(true);
    try {
      const response = await fetch(`${Global.url}branches`);
      if (!response.ok) {
        throw new Error('Error al cargar sucursales');
      }
      const data = await response.json();
      setBranches(data);
    } catch (error) {
      console.error("Error al cargar sucursales:", error);
      setError("Error al cargar sucursales");
    } finally {
      setLoadingBranches(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    fetchEmployees(currentPage, selectedCharge, selectedBranch);
  }, [currentPage, selectedCharge, selectedBranch]);

  const filteredEmployees = employees.filter(employee => {
    const fullName = `${employee.name} ${employee.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      (employee.email && employee.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (employee.telephone && employee.telephone.includes(searchTerm))
    );
  });

  const toggleEmployeeSelection = (employeeId) => {
    setSelectedEmployees(prev =>
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleNewEmployee = () => {
    setIsAddModalOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setIsEditModalOpen(true);
  };

const handleSaveNewEmployee = async (formData) => {
  try {
    // Debug: Log FormData contents before sending
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = await fetch(`${Global.url}registerEmployees`, {
      method: 'POST',
      body: formData // Send the FormData directly
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al registrar empleado');
    }

    const data = await response.json();
    console.log('Success:', data);
    
    setIsAddModalOpen(false);
    fetchEmployees(currentPage, selectedCharge, selectedBranch);
  } catch (err) {
    console.error('Error detallado al registrar empleado:', err);
    setError(err.message || 'Error desconocido al registrar empleado');
  }
};

  const handleUpdateEmployee = async (updatedEmployee) => {
  try {
    // Crear FormData para enviar tanto JSON como archivos
    const formData = new FormData();
    
    // Agregar campos del empleado
    formData.append('name', updatedEmployee.name);
    formData.append('lastName', updatedEmployee.lastName);
    formData.append('email', updatedEmployee.email);
    formData.append('charge', updatedEmployee.charge);
    formData.append('telephone', updatedEmployee.telephone);
    formData.append('hiringDate', updatedEmployee.hiringDate);
    formData.append('idSucursal', updatedEmployee.idSucursal);
    
    // Si hay una nueva imagen, agregarla
    if (updatedEmployee.imageFile) {
      formData.append('image', updatedEmployee.imageFile);
    }

    const response = await fetch(`${Global.url}employees/${updatedEmployee._id}`, {
      method: 'PUT',
      body: formData
      // No establecer Content-Type header - el navegador lo hará automáticamente con el boundary
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el empleado');
    }

    setIsEditModalOpen(false);
    fetchEmployees(currentPage, selectedCharge, selectedBranch);
  } catch (err) {
    console.error('Error al actualizar empleado:', err);
    setError(err.message);
  }
};

  const handleDeleteEmployee = async (employeeId) => {
    try {
      const response = await fetch(`${Global.url}employees/${employeeId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el empleado');
      }

      fetchEmployees(currentPage, selectedCharge, selectedBranch);
      setSelectedEmployees(prev => prev.filter(id => id !== employeeId));
    } catch (err) {
      console.error('Error al eliminar empleado:', err);
      setError(err.message);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="admin-products-container">
      <div className="admin-toolbar1">
        <h1 className="admin-title1">Gestión de Empleados</h1>

        <div className="search-container-products">
          <input
            type="text"
            placeholder="Buscar empleados..."
            className="search-input-products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-container">
          <select
            className="category-filter"
            value={selectedCharge}
            onChange={(e) => {
              setSelectedCharge(e.target.value);
              setCurrentPage(1);
            }}
          >
            {employeeCharges.map(charge => (
              <option key={charge.value} value={charge.value}>
                {charge.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-container">
          <select
            className="category-filter"
            value={selectedBranch}
            onChange={(e) => {
              setSelectedBranch(e.target.value);
              setCurrentPage(1);
            }}
          >
            {branches.map(branch => (
              <option key={branch.value} value={branch.value}>
                {branch.label}
              </option>
            ))}
          </select>
        </div>

        <button
          className="add-product-btn"
          onClick={() => handleNewEmployee()}
        >
          <LuPlus size={18} />
          <span>Agregar</span>
        </button>
      </div>

      {loading && (
        <div className="loading-message">
          Cargando empleados...
        </div>
      )}

      {error && (
        <div className="error-message">
          Error al cargar empleados: {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="products-grid">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map(employee => (
                <AdminEmployeeCard
                  key={employee._id}
                  employee={employee}
                  isSelected={selectedEmployees.includes(employee._id)}
                  onSelect={toggleEmployeeSelection}
                  onEdit={handleEditEmployee} 
                  onDelete={handleDeleteEmployee}
                  selectionMode={selectionMode}
                />
              ))
            ) : (
              <div className="no-products-message">
                No se encontraron empleados que coincidan con los filtros.
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

      {selectionMode && selectedEmployees.length > 0 && (
        <div className="selection-actions-bar">
          <div className="selected-count">
            {selectedEmployees.length} seleccionados
          </div>
          <div className="selection-actions">
            <button
              className={`selection-action-btn ${selectedEmployees.length !== 1 ? 'disabled' : ''}`}
              onClick={() => {
                if (selectedEmployees.length === 1) {
                  const employeeToEdit = employees.find(e => e._id === selectedEmployees[0]);
                  handleEditEmployee(employeeToEdit);  {/* Usamos la misma función de edición */}
                }
              }}
              disabled={selectedEmployees.length !== 1}
            >
              <LuPencil size={16} />
              <span>Editar</span>
            </button>
            <button
              className="selection-action-btn delete"
              onClick={() => {
                selectedEmployees.forEach(id => handleDeleteEmployee(id));
                setSelectionMode(false);
              }}
            >
              <LuTrash2 size={16} />
              <span>Eliminar</span>
            </button>
            <button
              className="selection-action-btn cancel"
              onClick={() => setSelectedEmployees([])}
            >
              <LuX size={16} />
              <span>Deseleccionar</span>
            </button>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <AddEmployeeModal
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleSaveNewEmployee}
            branches={branches}
            charges={employeeCharges}
            loadingBranches={loadingBranches}
        />
      )}

      {/* Modal de edición */}
      {isEditModalOpen && (
        <EditEmployeeModal
          employee={editingEmployee}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdateEmployee}
          branches={branches.filter(b => b.value !== 'all')}
          charges={employeeCharges.filter(c => c.value !== 'all')}
        />
      )}
    </div>
  );
}

export default GestionEmpleados;