import express from 'express';
import { addProduct, deleteProduct, editProduct } from '../controller/product';
import { ROLES_LIST } from '../config/roles_list';
import { verifyRoles } from '../middleware/verifyRoles';
import { verifyJWT } from '../middleware/verifyJWT';

const router = express.Router();

//allProducts
router.post('/products',verifyJWT,verifyRoles(ROLES_LIST.admin),addProduct);

//eachProduct

router.put('/products/:id',verifyJWT,verifyRoles(ROLES_LIST.admin),editProduct);
router.delete('/products/:id',verifyJWT,verifyRoles(ROLES_LIST.admin),deleteProduct);









export default router;

