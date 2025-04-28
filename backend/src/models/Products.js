import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const consolePlatformMap = {
  PlayStation: ['PS5', 'PS4'],
  Xbox: ['Xbox Series X-S','Xbox One', 'Xbox 360'],
  Nintendo: ['Switch'],
  PC: ['Windows'],
};

const productsSchema = new Schema(
  {
    name: {
        type: String,
        require: true,
        maxLength: 100,
    },
    type: {
        type: String,
        enum: ['Juego', 'Tarjeta-regalo', 'Suscripcion'],
        require: true,
        maxLength: 25,
    },
    platforms: [{
      name: {
        type: String,
        required: true,
        enum: Object.keys(consolePlatformMap),
        validate: {
          validator: function(v) {
            return this.consoles.every(c => 
              consolePlatformMap[v].includes(c.name)
            );
          },
          message: props => `La consola no es compatible con la plataforma ${props.value}`
        }
      },
      consoles: [{  // <-- Asegúrate que este campo se llame EXACTAMENTE "consoles"
        name: {
          type: String,
          required: true,
          validate: {
            validator: function(v) {
              const platform = this.parent().name;
              return consolePlatformMap[platform].includes(v);
            },
            message: props => `La consola ${props.value} no es válida para esta plataforma`
          }
        },
        price: {
          type: Number,
          required: true,
        },
      }]
    }],
    description: {
        type: String,
        require: true,
    },
    genres: {
      type: [String],
      require: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    images: {
      type: [
        {
          originalName: { type: String, default: "default.png" },
          storedName: { type: String, default: "default.png" },
          path: { type: String, default: "/uploads/products/default.png" },
          uploadedAt: { 
            type: Date, 
            default: () => new Date()  // ¡Esta es la corrección clave!
          }
        }
      ],
      default: []
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

productsSchema.statics.getPlatformConsoleMap = function() {
  return consolePlatformMap;
};

productsSchema.index({ "platforms.name": 1 });
productsSchema.index({ "platforms.consoles.name": 1 });

productsSchema.plugin(mongoosePaginate);

export default model("Products", productsSchema, "Products");