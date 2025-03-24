import { Schema, model } from "mongoose";

const invoicesSchema = new Schema(
    {
        idShoppingCart:{
            type: Schema.Types.ObjectId,
            ref: "ShoppingCart",
            required: [true, "El ID del carrito es obligatorio"]
        },
        paymentMethod: {
            type: String,
            enum: {
                values: ["Cash", "Card"],
                message: "El pago debe realizarse con efectivo o tarjeta"
            }
        }
    },
    {
        timestamps: true
    }
);

export default model("Invoices", invoicesSchema, "Invoices")