import express from "express";
import {
  addCart,
  deleteCart,
  editCart,
  getAllCarts,
  getCartByCustomerId,
  

} from "../controller/cart";

const router = express.Router();

//allProducts
router.get("/carts", getAllCarts);
router.post("/carts", addCart);

// //eachCArt
// router.get("/products/:id", getProduct);
 router.put("/carts/:id", editCart);
 router.delete("/carts/:id", deleteCart);

// //customer
router.get("/carts/customers/:id", getCartByCustomerId);
// router.get("/products/category/:category", getCategoryProduct);

export default router;
