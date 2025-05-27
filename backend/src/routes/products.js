import express from "express";
import productsController from "../controllers/productsController.js";
import { auth } from "../middleware/auth.js"; 
import { uploadProductImages } from "../middleware/storage.js"; 

const router = express.Router();

router
  .route("/")
  .post(productsController.insertProducts);

router
  .route("/:id")
  .put(productsController.updateProducts)
  .delete(productsController.deleteProducts);

router.get("/media/:file", productsController.media);
router.post(
  "/:id/upload", 
  [auth, uploadProductImages],
  productsController.uploadProductImages
);
router.get('/images/:id', productsController.getAllImages);
router.get('/all/:page?', productsController.getAllProducts);
router.get('/product/:id', productsController.getProductById);
router.get("/:type/:page?", productsController.getProducts); 
router.get('/platform/:platform/:type/:page?', productsController.getProductsByPlatform);
router.get('/platform/:platform/console/:console/:type/:page?', productsController.getProductsByPlatformAndConsole);




export default router;