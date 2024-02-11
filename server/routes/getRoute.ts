import express from 'express';
import { getAllCategories, getAllProducts, getCategoryProduct, getProduct } from '../controller/product';

const router = express.Router();

//all get routes which can be accessed publicly

/*product route*/
router.get('/api/products',getAllProducts);
router.get('/api/products/:id',getProduct);

/*category route*/
router.get('/products/categories',getAllCategories);
router.get('/products/category/:category',getCategoryProduct);

export default router;