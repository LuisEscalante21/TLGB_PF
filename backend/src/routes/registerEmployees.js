import express from "express";
import registerEmployeesController from "../controllers/registerEmployeesController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "public/" });

router.route("/")

.post(upload.single("image"), registerEmployeesController.register);

export default router;