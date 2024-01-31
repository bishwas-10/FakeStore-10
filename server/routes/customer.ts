import express from 'express';
import { addCustomer, deleteCustomer, getAllCustomers, getSpecificCustomer, loginCustomer, updateCustomer } from '../controller/customer';

const router = express.Router();

//allProducts
router.get('/customers',getAllCustomers);
router.post('/customers',addCustomer);

//eachProduct
router.get('/customers/:id',getSpecificCustomer);
router.put('/customers/:id',updateCustomer);
router.delete('/customers/:id',deleteCustomer);

//loginCustomer
router.post('/customers/login',loginCustomer)







export default router;

