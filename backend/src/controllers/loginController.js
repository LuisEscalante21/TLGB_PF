import EmployeesModel from "../models/Employees.js";
import clientsModel from "../models/Clients.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son requeridos" });
    }
  
    try {
      let userFound;
      let role;
  
      // 1. Primero verificar si es el Admin hardcodeado
      if (email === config.emailAdmin.email && password === config.emailAdmin.password) {
        role = "Admin";
        userFound = { _id: "admin_id", email: config.emailAdmin.email };
      } else {
        // 2. Buscar en empleados
        userFound = await EmployeesModel.findOne({ email });
        
        // Determinar rol basado en cargo
        if (userFound) {
          if (userFound.chargue === "Admin") {
            role = "Admin";
          } else if (userFound.chargue === "Manager") {
            role = "Manager";
          } else {
            role = "Employee";
          }
        } else {
          // 3. Si no es empleado, buscar como Cliente
          userFound = await clientsModel.findOne({ email });
          role = "Client";
        }
      }
  
      if (!userFound) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      // Validar contraseña si no es el Admin hardcodeado
      if (!(email === config.emailAdmin.email && password === config.emailAdmin.password)) {
        if (!userFound.password) {
          return res.status(400).json({ message: "Contraseña no configurada" });
        }
  
        const isMatch = await bcryptjs.compare(password, userFound.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Contraseña incorrecta" });
        }
      }
  
      // Generar token
      const token = jsonwebtoken.sign(
        { id: userFound._id, role },
        config.JWT.secret,
        { expiresIn: config.JWT.expiresIn }
      );

      const userData = {
        userId: userFound._id,
        role: role,
        email: userFound.email
      };
  
      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000
      });

      res.cookie("userData", JSON.stringify(userData), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000
      });
  
      return res.json({ 
        status: "success",
        message: "Login exitoso",
        user: userData
      });
  
    } catch (error) {
      console.error("Error en login:", error);
      return res.status(500).json({ message: "Error en el servidor" });
    }
};

export default loginController;