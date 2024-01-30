import express from "express";
import {
  addCart,
  deleteCart,
  editCart,
  getAllCarts,

} from "../controller/cart";

const router = express.Router();

//allProducts
router.get("/carts", getAllCarts);
router.post("/carts", addCart);

// //eachCArt
// router.get("/products/:id", getProduct);
 router.put("/carts/:id", editCart);
// router.delete("/products/:id", deleteProduct);

// //category
// router.get("/products/categories", getAllCategories);
// router.get("/products/category/:category", getCategoryProduct);

export default router;
