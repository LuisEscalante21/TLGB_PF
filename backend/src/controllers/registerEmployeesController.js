const registerEmployeesController = {};

import Employee from "../models/Employees.js";
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { config } from "../config.js";
import { v2 as cloudinary } from "cloudinary"


cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

// I N S E R T
registerEmployeesController.register = async (req, res) => {
  try {
    const { name, lastName, email, chargue, telephone, hiringDate, password, idSucursal } = req.body;

    // Validate required fields
    if (!password) {
      return res.status(400).json({ message: "La contraseña es requerida" });
    }

    // Verify if employee exists
    const existEmployee = await Employee.findOne({ email });
    if (existEmployee) {
      return res.status(400).json({ message: "El empleado ya existe" });
    }

    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "employees",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imageUrl = result.secure_url;
    }

    // Ensure password is a string before hashing
    const passwordString = String(password);
    const passwordHash = await bcryptjs.hash(passwordString, 10);

    const newEmployee = new Employee({
      name,
      lastName,
      chargue,
      email,
      telephone,
      hiringDate,
      password: passwordHash,
      idSucursal,
      image: imageUrl
    });

    await newEmployee.save();

    const token = jsonwebtoken.sign(
      { id: newEmployee._id },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn }
    );

    res.status(201).json({ 
      message: "Empleado registrado correctamente",
      employee: {
        _id: newEmployee._id,
        name: newEmployee.name,
        email: newEmployee.email,
        image: newEmployee.image
      },
      token
    });

  } catch (error) {
    console.error("Error detallado:", error);
    res.status(500).json({ 
      message: "Error al registrar empleado",
      error: error.message,
      stack: error.stack // Include stack trace for debugging
    });
  }
};

export default registerEmployeesController;