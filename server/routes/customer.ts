import express from 'express';
import { addCustomer, deleteCustomer, getAllCustomers, getSpecificCustomer, loginCustomer, updateCustomer } from '../controller/customer';
import authUser from '../middleware/authUser';

const router = express.Router();

//allProducts
router.get('/customers',authUser,getAllCustomers);
router.post('/customers',authUser,addCustomer);

//eachProduct
router.get('/customers/:id',authUser,getSpecificCustomer);
router.put('/customers/:id',authUser,updateCustomer);
router.delete('/customers/:id',authUser,deleteCustomer);

//loginCustomer
router.post('/customers/login',authUser,loginCustomer)







export default router;

