import { Schema, model } from "mongoose";

const productsSchema = new Schema(
  {
    name: {
        type: String,
        require: true,
        maxLength: 100,
    },
    
    price: {
        type: Number,
        require: true,
        maxLength: 100,
    },
    description: {
        type: String,
        require: true,
        maxLength: 100,
    },
    idSupplier: {
      type: Schema.Types.ObjectId,
      ref: "Suppliers",
      require: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Products", productsSchema, "Products");