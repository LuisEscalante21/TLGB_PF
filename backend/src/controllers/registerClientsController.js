import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import clientsModel from "../models/Clients.js";
import { config } from "../config.js";

const registerClientsController = {};

// I N S E R T
registerClientsController.register = async (req, res) => {
  const { name, lastName, telephone, password, email, isVerified } = req.body;
  try {
    // Verifica si existe el cliente
    const existClient = await clientsModel.findOne({ email });
    if (existClient) {
      return res.json({ message: "client already exist" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const newClient = new clientsModel({
      name,
      lastName,
      telephone,
      password: passwordHash,
      isVerified: isVerified || false,
      email
    });
    await newClient.save();

    // Genera un token JWT simple (sin código de verificación)
    const token = jsonwebtoken.sign(
      { email },
      config.JWT.secret,
      { expiresIn: "2h" }
    );

    res.json({
      message: "client registered",
      token
    });
  } catch (error) {
    res.json({ message: "error: " + error });
  }
};

export default registerClientsController;