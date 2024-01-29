import express from 'express';
import { addProduct, deleteProduct, editProduct, getAllProducts, getProduct } from '../controller/product';

const router = express.Router();

router.get('/products',getAllProducts);
router.get('/products/:id',getProduct);
router.put('/products/:id',editProduct);
router.delete('/products/:id',deleteProduct);


router.post('/products',addProduct);

export default router;

