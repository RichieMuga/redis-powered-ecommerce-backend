import { Router } from "express";
import {
  getUserCart,
  updateCart,
  addCart,
  deleteCart,
} from "../controllers/cart.controller";

const router = Router();
import { trackCartView, trackCartModification } from "../middleware/trackViews";

router.get("/carts/user/:userId", trackCartView, getUserCart);
router.patch("/carts/:cartId", trackCartModification, updateCart);
router.delete("/carts/:cartId", trackCartModification, deleteCart);
router.post("/carts", addCart);

export default router;
