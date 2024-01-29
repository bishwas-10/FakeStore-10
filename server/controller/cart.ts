import { Request, Response, request } from "express";
import Cart from "../models/cart";
import { CartPropsSchema } from "../utils/types";

export const getAllCarts = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.find();
    if (!cart) {
      return res
        .status(403)
        .send({ success: false, message: "carts not found", carts: null });
    }
    return res
      .status(200)
      .send({ success: true, message: "carts found", cart: cart });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "internal server error", cart: null });
  }
};

export const getCartByUserId = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "internal server error" });
  }
};
export const getSingleCart = async (req: Request, res: Response) => {};

export const addCart = async (req: Request, res: Response) => {
  try {
    const validation = CartPropsSchema.safeParse(req.body);
    if (!validation.success) {
      return res
        .status(400)
        .send({ sucess: false, message: validation.error.issues[0].message });
    }

    const existingCart = await Cart.findOne({
      customerId: req.body.customerId,
    });
    console.log(existingCart)
    if (existingCart) {
    
        const updatedCart = await Cart.findOneAndUpdate(
            { customerId: existingCart.customerId },
            {
              $addToSet: {
                // Add to the products array if product doesn't exist
                products: {
                  $each: [
                    {
                      productId: req.body.productId,
                      quantity: req.body.quantity,
                    },
                  ],
                },
              },
              $inc: {
                // Increment quantity if product exists
                "products.$[elem].quantity": req.body.quantity,
              },
            },
            {
              new: true, // Return the updated document
              arrayFilters: [{ "elem.productId": req.body.productId }], // Filter to match product
            }
          );
          console.log(updatedCart)
    }

    const cart = await Cart.create({
        customerId: req.body.customerId,
     
      products:req.body.products,
      status: req.body.status,
      addedDate: req.body.addedDate,
    });
    await cart.save();
    res.status(200).send({ success: true, message: "cart added" });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "internal server error" });
  }
};
export const editCart = async (req: Request, res: Response) => {};
export const deleteCart = async (req: Request, res: Response) => {};
