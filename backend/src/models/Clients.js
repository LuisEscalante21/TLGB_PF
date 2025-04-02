import { Schema, model } from "mongoose";

const clientsSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      maxLength: 100,
    },
    lastName: {
        type: String,
        require: true,
        maxLength: 100,
    }, 
    telephone: {
        type: String,
        require: true,
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
        require: true,
        maxLength: 100,
        unique: true,
    }, 
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Clients", clientsSchema, "Clients");