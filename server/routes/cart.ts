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
import { verifyJWT } from "../middleware/verifyJWT";

const router = express.Router();

//allProducts
router.get("/carts",verifyJWT,verifyRoles(ROLES_LIST.admin), getAllCarts);
router.post("/carts",verifyJWT,verifyRoles(ROLES_LIST.admin,ROLES_LIST.customer), addCart);
router.get("/carts/soldorder",verifyJWT,verifyRoles(ROLES_LIST.admin), soldProduct);
// //eachCArt

 router.put("/carts/:id",verifyJWT,verifyRoles(ROLES_LIST.admin,ROLES_LIST.customer), editCart);
 router.delete("/carts/:id",verifyJWT,verifyRoles(ROLES_LIST.admin,ROLES_LIST.customer), deleteCart);
 router.patch("/carts/:id",verifyJWT,verifyRoles(ROLES_LIST.admin,ROLES_LIST.customer), updateQuantity);
 router.patch("/carts/checkoutaddress/:id",verifyJWT,verifyRoles(ROLES_LIST.admin,ROLES_LIST.customer), updateAllShippingAddress);
 router.patch("/carts/updateoneaddress/:id",verifyJWT,verifyRoles(ROLES_LIST.admin,ROLES_LIST.customer), updateSingleShippingAddress);

 // //customer
router.get("/carts/:id",verifyJWT,verifyRoles(ROLES_LIST.admin,ROLES_LIST.customer), getCartByCustomerId);


export default router;
