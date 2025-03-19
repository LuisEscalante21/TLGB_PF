import mongoose from "mongoose";

//Importo las variables desde mi archivo config.js
import { config  } from "./src/config.js";

// Conectar la base de datos
mongoose.connect(config.db.URI);

// ----------- comprobacion que la base sirve

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("DB is connected");
});

connection.on("disconnected", () => {
  console.log("DB is disconnected");
});

connection.on("error", (error) => {
  console.log("Error found" + error);
});
