import express from "express";
import {
  addCart,
  deleteCart,
  editCart,
  getAllCarts,
  getCartByCustomerId,
  

} from "../controller/cart";
import authUser from "../middleware/authUser";
import { verifyRoles } from "../middleware/verifyRoles";
import { ROLES_LIST } from "../config/roles_list";

const router = express.Router();

//allProducts
router.get("/carts",verifyRoles(ROLES_LIST.admin), getAllCarts);
router.post("/carts",verifyRoles(ROLES_LIST.admin), addCart);

// //eachCArt
// router.get("/products/:id", getProduct);
 router.put("/carts/:id",verifyRoles(ROLES_LIST.admin), editCart);
 router.delete("/carts/:id",verifyRoles(ROLES_LIST.admin), deleteCart);

// //customer
router.get("/carts/customers/:id",verifyRoles(ROLES_LIST.admin), getCartByCustomerId);
// router.get("/products/category/:category", getCategoryProduct);

export default router;
