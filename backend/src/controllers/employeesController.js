const employeesController = {};
import employeesModel from "../models/Employees.js";
import { v2 as cloudinary } from "cloudinary"
import { config }  from "../config.js";

cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});


// S E L E C T
employeesController.getEmployees = async (req, res) => {
  try {
    // Obtener parámetros de paginación
    const page = parseInt(req.params.page) || 1;
    const itemsPerPage = 10;
    const skip = (page - 1) * itemsPerPage;

    // Obtener parámetros de filtro desde query strings
    const { charge, branch } = req.query;

    // Construir objeto de filtro
    const filter = {};
    if (charge && charge !== 'all') {
      // Manejar tanto 'charge' como 'chargue' (por inconsistencias en la BD)
      filter.$or = [
        { charge: charge },
        { chargue: charge }
      ];
    }
    if (branch && branch !== 'all') {
      filter.idSucursal = branch;
    }

    // Obtener empleados con paginación y filtros
    const employees = await employeesModel.find(filter)
      .skip(skip)
      .limit(itemsPerPage)
      .lean(); // Usar lean() para mejor performance

    // Obtener conteo total para paginación
    const totalEmployees = await employeesModel.countDocuments(filter);
    const totalPages = Math.ceil(totalEmployees / itemsPerPage);

    // Enviar respuesta con metadatos de paginación
    res.json({
      employees,
      currentPage: page,
      totalPages,
      totalEmployees,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    });

  } catch (error) {
    console.error('Error al obtener empleados:', error);
    res.status(500).json({ 
      message: 'Error al obtener empleados',
      error: error.message 
    });
  }
};

// I N S E R T
employeesController.insertEmployees = async (req, res) => {
  const { name, lastName, email, chargue, telephone, hiringDate, password, idSucursal } = req.body;
  const newEmployee = new employeesModel({name, lastName, email, chargue, telephone, hiringDate, password, idSucursal });
  await newEmployee.save();
  res.json({ message: "employee saved" });
};

// D E L E T E
employeesController.deleteEmployees = async (req, res) => {
  await employeesModel.findByIdAndDelete(req.params.id);
  res.json({ message: "employee deleted" });
};

// U P D A T E
employeesController.updateEmployees = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastName, email, charge, telephone, hiringDate, idSucursal } = req.body;

    // Verificar si el empleado existe
    const existingEmployee = await employeesModel.findById(id);
    if (!existingEmployee) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    // Verificar si el email ya está en uso por otro empleado
    if (email && email !== existingEmployee.email) {
      const emailExists = await Employee.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "El email ya está en uso por otro empleado" });
      }
    }

    // Manejo de la imagen
    let imageUrl = existingEmployee.image;
    if (req.file) {
      // Eliminar imagen anterior si existe
      if (existingEmployee.image) {
        const publicId = existingEmployee.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`employees/${publicId}`);
      }
      
      // Subir nueva imagen
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "employees",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imageUrl = result.secure_url;
    }

    // Preparar datos actualizados
    const updateData = {
      name: name || existingEmployee.name,
      lastName: lastName || existingEmployee.lastName,
      email: email || existingEmployee.email,
      charge: charge || existingEmployee.charge || existingEmployee.chargue,
      telephone: telephone || existingEmployee.telephone,
      hiringDate: hiringDate || existingEmployee.hiringDate,
      idSucursal: idSucursal || existingEmployee.idSucursal,
      image: imageUrl
    };

    // Actualizar empleado
    const updatedEmployee = await employeesModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      message: "Empleado actualizado correctamente",
      employee: {
        _id: updatedEmployee._id,
        name: updatedEmployee.name,
        lastName: updatedEmployee.lastName,
        email: updatedEmployee.email,
        charge: updatedEmployee.charge || updatedEmployee.chargue,
        telephone: updatedEmployee.telephone,
        hiringDate: updatedEmployee.hiringDate,
        idSucursal: updatedEmployee.idSucursal,
        image: updatedEmployee.image
      }
    });

  } catch (error) {
    console.error("Error al actualizar empleado:", error);
    res.status(500).json({ 
      message: "Error al actualizar empleado",
      error: error.message 
    });
  }
};

export default employeesController;