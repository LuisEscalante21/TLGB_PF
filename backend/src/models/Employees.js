import { Schema, model } from "mongoose";

const employeesSchema = new Schema(
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
    chargue: {
      type: String,
      enum: ['Admin', 'Manager', 'Employee'], // Valores permitidos
      required: true,
      maxLength: 100,
    },
    email: {
      type: String,
      require: true,
      maxLength: 100,
      unique: true,
  },
    telephone: {
        type: String,
        require: true,
        minLength: 8,
        maxLength: 100,
    },
    hiringDate: {
        type: String,
        require: true,
        minLength: 10,
        maxLength: 100,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 100,
      },
    image: { type: String },
    idSucursal: {
      type: Schema.Types.ObjectId,
      ref: "Branches",
      require: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);



export default model("Employees", employeesSchema, "Employees");