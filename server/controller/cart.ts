import { Request, Response, request } from "express";
import Cart from "../models/cart";
import { CartPropsSchema } from "../utils/types";
import Product from "../models/product";

export const getAllCarts = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.find().populate("product");
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
    const cart = await Cart.findOne({
      customerId: req.body.customerId,
    }).populate([{ path: "product", model: Product }]);
    console.log(cart);
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "internal server error" });
  }
};

export const addCart = async (req: Request, res: Response) => {
  try {
    const validation = CartPropsSchema.safeParse(req.body);
    if (!validation.success) {
      return res
        .status(400)
        .send({ sucess: false, message: validation.error.issues[0].message });
    }

    // const existingCart = await Cart.findOne({
    //   customerId: req.body.customerId,
    // });
    //  console.log(existingCart)
    //   if (existingCart) {

    //       const updatedCart = await Cart.findOneAndUpdate(
    //           { customerId: existingCart.customerId },
    //           {
    //             $addToSet: {

    //               products: {
    //                 $each: [
    //                   {
    //                     productId: 2,
    //                     quantity: 1,
    //                   },
    //                 ],
    //               },
    //             },
    //             $inc: {

    //               quantity: 1,
    //             },
    //           },
    //           {
    //             new: true,
    //             arrayFilters: [{ "elem.productId": req.body.productId }],
    //           }
    //         );
    //   }

    const cart = await Cart.create({
      quantity: req.body.quantity,
      customerId: req.body.customerId,
      product: req.body.product,
      status: req.body.status,
      addedDate: req.body.addedDate,
    });
    const doc = await cart.save();
    const populatedCart = await doc.populate("product");
    console.log(populatedCart);
    res.status(200).send({ success: true, message: "cart added" });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "internal server error" });
  }
};
export const editCart = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);
  try {
    const validation = CartPropsSchema.safeParse(req.body);
    if (!validation.success) {
      return res
        .status(400)
        .send({ sucess: false, message: validation.error.issues[0].message });
    }
    console.log(req.body)
    const cart = await Cart.findOneAndUpdate(
      { _id: id },
      {
        quantity: req.body.quantity,
        customerId: req.body.customerId,
        product: req.body.product,
        status: req.body.status,
        addedDate: req.body.addedDate,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(cart);
    if (cart) {
      const result = await cart.populate("product");
      return res
        .status(200)
        .send({ success: true, messsage: "cart  found", cart: result });
    } else {
      return res
        .status(403)
        .send({ success: false, messsage: "cart not found", cart: null });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "internal server error" });
  }
};

export const deleteCart = async (req: Request, res: Response) => {};
