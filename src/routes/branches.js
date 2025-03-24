import express from "express";
import branchesController from "../controllers/branchesController.js";

const router = express.Router();

router
  .route("/")
  .get(branchesController.getBranches)
  .post(branchesController.insertBranches);

router
  .route("/:id")
  .put(branchesController.updateBranches)
  .delete(branchesController.deleteBranches);

export default router;