import { Request, Response, request } from "express";
import Cart from "../models/cart";
import { CartPropsSchema } from "../utils/types";
import Product from "../models/product";
import User from "../models/users";

export const getAllCarts = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.find().populate([
      { path: "product", model: Product },
      { path: "customer", model: User },
    ]);
    if (!cart) {
      return res
        .status(404)
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

export const getCartByCustomerId = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const cart = await Cart.find({
      customerId: id,
    }).populate([{ path: "product", model: Product }]);
    console.log(cart);
    if (cart.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "couldn't find any cart" });
    }
    return res
      .status(200)
      .send({ success: true, message: "cart found", cart: cart });
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
      return res.status(400).send({ sucess: false, message: validation.error });
    }


    const cart = await Cart.create({
      quantity: req.body.quantity,
      totalAmount: req.body.totalAmount,
      customer: req.body.customer,
      product: req.body.product,
      shippingAddress: {
        city: req.body.shippingAddress.city,
        street: req.body.shippingAddress.street,
        zipcode: req.body.shippingAddress.zipcode,
      },
      orderStatus: req.body.orderStatus,
      paymentMethod: req.body.paymentMethod,
      paymentStatus: req.body.paymentStatus,
    });
    const doc = await cart.save();
    const populatedCart = await doc.populate([
      { path: "product", model: Product },
      { path: "customer", model: User },
    ]);
    res.status(200).send({ success: true, message: "cart added" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "internal server error" });
  }
};
export const editCart = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(req.body);
  try {
    const validation = CartPropsSchema.safeParse(req.body);
    if (!validation.success) {
      return res
        .status(400)
        .send({ sucess: false, message: validation.error.issues[0].message });
    }
    const cart = await Cart.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
 
    if (cart) {
      const result = await cart.populate([
        { path: "product", model: Product },
        { path: "customer", model: User },
      ]);
   console.log(result);
      return res
        .status(200)
        .send({ success: true, messsage: "cart  found", cart: result });
    } else {
      return res
        .status(404)
        .send({ success: false, messsage: "cart not found", cart: null });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "internal server error" });
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await Cart.findByIdAndDelete({ _id: id });
    return res
      .status(200)
      .json({ success: true, message: "deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "internal server error" });
  }
};
