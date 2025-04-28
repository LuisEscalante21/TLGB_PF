// Importo todo lo de la libreria express
import express from "express";
import branchesRoutes from "./src/routes/branches.js"
import clientsRoutes from "./src/routes/clients.js"
import employeesRoutes from "./src/routes/employees.js"
import productsRoutes from "./src/routes/products.js"
import suppliersRoutes from "./src/routes/suppliers.js"
import stockRoutes from "./src/routes/stock.js"
import shoppingCartRoutes from "./src/routes/shoppingcart.js";
import invoicesRouter from "./src/routes/invoices.js";
import registerEmployeesRoutes from "./src/routes/registerEmployees.js";
import loginRoutes from "./src/routes/login.js";
import cookieParser from "cookie-parser";
import logoutRoutes from "./src/routes/logout.js"
import registerClientsRoutes from "./src/routes/registerClients.js";
import cors from "cors";

// Creo una constante que es igual
// a la libreria que importé y la ejecuta
const app = express();

// Uso un middleware para que acepte datos Json
app.use(express.json());


// que acepte cookies
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, // Permite enviar cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Definir la ruta
app.use("/api/branches", branchesRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/suppliers", suppliersRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/shoppingCart", shoppingCartRoutes);
app.use("/api/invoices", invoicesRouter);

app.use("/api/registerEmployees", registerEmployeesRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);

app.use("/api/registerClients", registerClientsRoutes);

// Exporto la constante para poder usar express en otros lados
export default app;