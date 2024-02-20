import express from "express";
import {
  addCart,
  deleteCart,
  editCart,
  getAllCarts,
  getCartByCustomerId,
  soldProduct,
  updateAllShippingAddress,
  updateQuantity,
  updateSingleShippingAddress

} from "../controller/cart";
import { verifyRoles } from "../middleware/verifyRoles";
import { ROLES_LIST } from "../config/roles_list";

const router = express.Router();

//allProducts
router.get("/carts",verifyRoles(ROLES_LIST.admin), getAllCarts);
router.post("/carts",verifyRoles(ROLES_LIST.admin,ROLES_LIST.customer), addCart);
router.get("/carts/soldorder",verifyRoles(ROLES_LIST.admin), soldProduct);
// //eachCArt
// router.get("/products/:id", getProduct);
 router.put("/carts/:id",verifyRoles(ROLES_LIST.admin,ROLES_LIST.customer), editCart);
 router.delete("/carts/:id",verifyRoles(ROLES_LIST.admin,ROLES_LIST.customer), deleteCart);
 router.patch("/carts/:id",verifyRoles(ROLES_LIST.admin,ROLES_LIST.customer), updateQuantity);
 router.patch("/carts/checkoutaddress/:id",verifyRoles(ROLES_LIST.admin,ROLES_LIST.customer), updateAllShippingAddress);
 router.patch("/carts/updateoneaddress/:id",verifyRoles(ROLES_LIST.admin,ROLES_LIST.customer), updateSingleShippingAddress);

 // //customer
router.get("/carts/:id",verifyRoles(ROLES_LIST.admin,ROLES_LIST.customer), getCartByCustomerId);
// router.get("/products/category/:category", getCategoryProduct);

export default router;
