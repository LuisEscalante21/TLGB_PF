import { Schema, model } from "mongoose";

const stockSchema = new Schema(
  {
    idBranch: {
      type: Schema.Types.ObjectId,
      ref: "Branches",
      require: true,
    },
    
    idProduct: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      require: true,
    },
    Stock: {
        type: Number,
        require: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Stock", stockSchema, "Stock");