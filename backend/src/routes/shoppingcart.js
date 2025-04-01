import express from "express";
import shoppingcartController from "../controllers/shoppingCartController.js"; // Add .js extension

const router = express.Router();

router
  .route("/")
  .get(shoppingcartController.getShoppingCart)
  .post(shoppingcartController.insertShoppingCart);

router
  .route("/:id")
  .put(shoppingcartController.updateShoppingCart)
  .delete(shoppingcartController.deleteShoppingCart);

export default router;