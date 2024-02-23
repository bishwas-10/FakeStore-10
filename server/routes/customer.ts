import express from 'express';
import { addCustomer, deleteCustomer, getAllCustomers, getSpecificCustomer, loginCustomer, updateCustomer } from '../controller/customer';
import { verifyRoles } from '../middleware/verifyRoles';
import { ROLES_LIST } from '../config/roles_list';
import { verifyJWT } from '../middleware/verifyJWT';

const router = express.Router();

//allProducts
router.get('/customers',verifyJWT,verifyRoles(ROLES_LIST.admin),getAllCustomers);
router.post('/customers',verifyJWT,verifyRoles(ROLES_LIST.admin),addCustomer);

//eachCustomer
router.get('/customers/:id',verifyJWT,verifyRoles(ROLES_LIST.admin,ROLES_LIST.customer),getSpecificCustomer);
router.put('/customers/:id',verifyJWT,verifyRoles(ROLES_LIST.admin),updateCustomer);
router.delete('/customers/:id',verifyJWT,verifyRoles(ROLES_LIST.admin),deleteCustomer);

//loginCustomer
router.post('/customers/login',verifyJWT,verifyRoles(ROLES_LIST.admin),loginCustomer)







export default router;

