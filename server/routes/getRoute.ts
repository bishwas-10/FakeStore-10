import express from 'express';
import {  getAllProducts, getCategoryProduct, getProduct } from '../controller/product';
import { getAllCategories } from '../controller/category';

const router = express.Router();

//all get routes which can be accessed publicly

/*product route*/
router.get('/products',getAllProducts);
router.get('/products/:id',getProduct);

/*category route*/
router.get('/categories',getAllCategories);
router.get('/categories/:category',getCategoryProduct);

export default router;