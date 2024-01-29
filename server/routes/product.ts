import express from 'express';
import { addProduct, deleteProduct, editProduct, getAllCategories, getAllProducts, getCategoryProduct, getProduct } from '../controller/product';

const router = express.Router();

//allProducts
router.get('/products',getAllProducts);
router.post('/products',addProduct);

//eachProduct
router.get('/products/:id',getProduct);
router.put('/products/:id',editProduct);
router.delete('/products/:id',deleteProduct);

//category
router.get('/products/categories',getAllCategories);
router.get('/products/category/:category',getCategoryProduct);






export default router;

