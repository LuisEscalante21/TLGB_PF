import Suppliers from "../models/Suppliers.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";

const registerSuppliersController = {};

cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

// I N S E R T
registerSuppliersController.register = async (req, res) => {
  try {
    const { name } = req.body;

    // Validar campos requeridos
    if (!name) {
      return res.status(400).json({ message: "El nombre del proveedor es requerido" });
    }

    // Verificar si el proveedor ya existe
    const existSupplier = await Suppliers.findOne({ name });
    if (existSupplier) {
      return res.status(400).json({ message: "El proveedor ya existe" });
    }

    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "suppliers",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imageUrl = result.secure_url;
    }

    const newSupplier = new Suppliers({
      name,
      image: imageUrl
    });

    await newSupplier.save();

    res.status(201).json({
      message: "Proveedor registrado correctamente",
      supplier: {
        _id: newSupplier._id,
        name: newSupplier.name,
        image: newSupplier.image
      }
    });

  } catch (error) {
    console.error("Error detallado:", error);
    res.status(500).json({
      message: "Error al registrar proveedor",
      error: error.message,
      stack: error.stack
    });
  }
};

export default registerSuppliersController;