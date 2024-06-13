import { Router } from 'express';
import { getAllCategories,getProductsInSpecificCategory } from '../controllers/category.controller';
import { trackCategoryView } from '../middleware/trackViews';

const router = Router();

router.get('/categories', getAllCategories);
router.get('/products/category/:categoryName',trackCategoryView, getProductsInSpecificCategory )

export default router;
