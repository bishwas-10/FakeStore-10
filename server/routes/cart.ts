import express from "express";
import {
  addCart,
  deleteCart,
  editCart,
  getAllCarts,
  getCartByCustomerId,
  

} from "../controller/cart";
import authUser from "../middleware/authUser";

const router = express.Router();

//allProducts
router.get("/carts",authUser, getAllCarts);
router.post("/carts",authUser, addCart);

// //eachCArt
// router.get("/products/:id", getProduct);
 router.put("/carts/:id",authUser, editCart);
 router.delete("/carts/:id",authUser, deleteCart);

// //customer
router.get("/carts/customers/:id",authUser, getCartByCustomerId);
// router.get("/products/category/:category", getCategoryProduct);

export default router;
