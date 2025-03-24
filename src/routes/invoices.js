import express from "express";
import invoicesController from "../controllers/invoicesController.js";

const router = express.Router();

router
  .route("/")
  .get(invoicesController.getInvoices)
  .post(invoicesController.insertInvoices);

router
  .route("/:id")
  .put(invoicesController.updateInvoices)
  .delete(invoicesController.deleteInvoices);

export default router;
