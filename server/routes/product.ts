import express from 'express';
import { addProduct, deleteProduct, editProduct, getAllCategories, getAllProducts, getCategoryProduct, getProduct } from '../controller/product';
import authUser from '../middleware/authUser';

const router = express.Router();

//allProducts
router.get('/products',authUser,getAllProducts);
router.post('/products',authUser,addProduct);

//eachProduct
router.get('/products/:id',authUser,getProduct);
router.put('/products/:id',authUser,editProduct);
router.delete('/products/:id',authUser,deleteProduct);

//category
router.get('/products/categories',authUser,getAllCategories);
router.get('/products/category/:category',authUser,getCategoryProduct);






export default router;

