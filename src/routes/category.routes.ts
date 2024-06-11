import { Router } from 'express';
import { getAllCategories,getProductsInSpecificCategory } from '../controllers/category.controller';

const router = Router();

router.get('/categories', getAllCategories);
router.get('/products/category/:categoryName', getProductsInSpecificCategory )

export default router;
