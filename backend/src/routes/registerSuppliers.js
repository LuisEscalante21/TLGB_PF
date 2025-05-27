import express from "express";
import registerSuppliersController from "../controllers/registerSuppliersController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "public/" });

router.route("/")
  .post(upload.single("image"), registerSuppliersController.register);

export default router;