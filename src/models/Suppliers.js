import { Schema, model } from "mongoose";

const suppliersSchema = new Schema(
  {
    name: {
        type: String,
        require: true,
        maxLength: 100,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Suppliers", suppliersSchema, "Suppliers");