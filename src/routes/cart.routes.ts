import { Router } from 'express';
import { getUserCart, updateCart } from '../controllers/cart.controller';

const router = Router();

router.get('/carts/user/:userId', getUserCart)
router.patch('/carts/:cartId', updateCart)
router.delete('/carts/:cartId')
router.post('/carts')

export default router;
