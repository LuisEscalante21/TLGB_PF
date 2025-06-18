import { Schema, model } from "mongoose";

const clientsSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // corregido
      maxLength: 100,
    },
    lastName: {
      type: String,
      required: true, // corregido
      maxLength: 100,
    }, 
    telephone: {
      type: String,
      required: true, // corregido
      minLength: 9,
      maxLength: 100,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true, // corregido
      maxLength: 100,
      unique: true,
    }, 
    isVerified: {
      type: Boolean,
      required: true, // corregido
      default: false, // valor por defecto
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Clients", clientsSchema);