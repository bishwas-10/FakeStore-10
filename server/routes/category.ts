import express from 'express';

import { verifyRoles } from '../middleware/verifyRoles';
import { ROLES_LIST } from '../config/roles_list';
import { addCategory, deleteCategory, editCategory, getAllCategories, getCategoryProduct } from '../controller/category';

const router = express.Router();

//allProducts
router.get('/categories',verifyRoles(ROLES_LIST.admin),getAllCategories);
router.post('/categories',verifyRoles(ROLES_LIST.admin),addCategory);

//eachCustomer
router.get('/categories/:id',verifyRoles(ROLES_LIST.admin),getCategoryProduct);
router.put('/categories/:id',verifyRoles(ROLES_LIST.admin),editCategory);
router.delete('/categories/:id',verifyRoles(ROLES_LIST.admin),deleteCategory);


export default router;