import express from "express";
import suppliersController from "../controllers/suppliersController.js";

const router = express.Router();

router
  .route("/")
  .get(suppliersController.getSuppliers)
  .post(suppliersController.insertSuppliers);

router
  .route("/:id")
  .put(suppliersController.updateSuppliers)
  .delete(suppliersController.deleteSuppliers);

export default router;