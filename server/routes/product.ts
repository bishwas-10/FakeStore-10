import express from 'express';
import { addProduct, deleteProduct, editProduct, getAllCategories, getCategoryProduct } from '../controller/product';
import { ROLES_LIST } from '../config/roles_list';
import { verifyRoles } from '../middleware/verifyRoles';

const router = express.Router();

//allProducts
router.post('/products',verifyRoles(ROLES_LIST.admin),addProduct);

//eachProduct

router.put('/products/:id',verifyRoles(ROLES_LIST.admin),editProduct);
router.delete('/products/:id',verifyRoles(ROLES_LIST.admin),deleteProduct);









export default router;

