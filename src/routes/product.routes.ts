import { Router } from "express";
import {
  getProducts,
  getSingleProductById,
  updateProduct,
  deleteProduct,
  addProduct,
} from "../controllers/product.controller";

const router = Router();

router.get("/products", getProducts);
router.get("/products/:productId", getSingleProductById);
router.patch("/products/:productId", updateProduct);
router.delete("/products/:productId", deleteProduct);
router.post("/products", addProduct);

export default router;
