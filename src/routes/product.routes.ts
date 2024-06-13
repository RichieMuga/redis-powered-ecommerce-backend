import { Router } from "express";
import {
  getProducts,
  getSingleProductById,
  updateProduct,
  deleteProduct,
  addProduct,
  getProductInteractions
} from "../controllers/product.controller";
import { trackProductView } from "../middleware/trackViews";

const router = Router();

router.get("/products", getProducts);
router.get("/products/:productId", trackProductView , getSingleProductById);
router.get('/products/:productId/interactions', getProductInteractions);
router.patch("/products/:productId", updateProduct);
router.delete("/products/:productId", deleteProduct);
router.post("/products", addProduct);

export default router;
