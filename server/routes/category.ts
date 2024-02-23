import express from 'express';
import { verifyRoles } from '../middleware/verifyRoles';
import { ROLES_LIST } from '../config/roles_list';
import { addCategory, deleteCategory, editCategory, getAllCategories, getCategoryProduct } from '../controller/category';
import { verifyJWT } from '../middleware/verifyJWT';
const router = express.Router();

//allProducts
router.get('/categories',verifyJWT,verifyRoles(ROLES_LIST.admin),getAllCategories);
router.post('/categories',verifyJWT,verifyRoles(ROLES_LIST.admin),addCategory);

//eachCustomer
router.get('/categories/:id',verifyJWT,verifyRoles(ROLES_LIST.admin),getCategoryProduct);
router.put('/categories/:id',verifyJWT,verifyRoles(ROLES_LIST.admin),editCategory);
router.delete('/categories/:id',verifyJWT,verifyRoles(ROLES_LIST.admin),deleteCategory);


export default router;