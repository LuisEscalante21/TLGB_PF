import { Schema, model } from "mongoose";

const branchesSchema = new Schema(
  {
    Name: {
      type: String,
      require: true,
      maxLength: 100,
    },
    Direction: {
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

export default model("Branches", branchesSchema, "Branches");