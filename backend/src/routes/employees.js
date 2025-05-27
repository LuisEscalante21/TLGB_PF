import express from "express";
import employeesController from "../controllers/employeesController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "public/" });

router
  .route("/page/:page?") // El ? hace que el parámetro sea opcional
  .get(employeesController.getEmployees);

router
  .route("/")
  .post(employeesController.insertEmployees);

router
  .route("/:id")
  .put(upload.single("image"), employeesController.updateEmployees)
  .delete(employeesController.deleteEmployees);

export default router;