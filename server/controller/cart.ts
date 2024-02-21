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
        .send({ success: false, message: "carts not found", cart: null });
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
      customer: id,
    }).populate([{ path: "product", model: Product }]);

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
    const existingCart = await Cart.findOne({
      product: req.body.product,
      customer: req.body.customer,
      paymentStatus: "not paid",
    });
    if (existingCart) {
      existingCart.quantity += parseInt(req.body.quantity);

      await existingCart.save();
      return res.status(200).send({ success: true, message: "cart updated" });
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

  try {
    const cart = await Cart.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (cart) {
      const result = await cart.populate([
        { path: "product", model: Product },
        { path: "customer", model: User },
      ]);

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
export const updateQuantity = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const cart = await Cart.findOneAndUpdate(
      { _id: id, product: req.body.product },
      { $set: { quantity: req.body.quantity } },
      {
        new: true,
        runValidators: true,
      }
    );
    if (cart) {
      return res.status(200).send({ success: true, messsage: "updated" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "internal server error" });
  }
};
export const updateAllShippingAddress = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log("yesma aayena")
  try {
    const filter = { customer: id, paymentStatus: "not paid" };
     await Cart.updateMany(
      filter,
      {   
          shippingAddress: req.body.shippingAddress,
          orderStatus: "dispatched",
      
      },
    
    );
    const cart = await Cart.find(filter);
    if (cart) {
      return res
        .status(200)
        .send({
          success: true,
          messsage: "added the shipping address",
          cart: cart,
        });
    }
    res.status(204).send({ success: true, messsage: "no cart found" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "internal server error" });
  }
};
export const updateSingleShippingAddress = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  try {
    const cart = await Cart.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          shippingAddress: req.body.shippingAddress,
          orderStatus: "dispatched",
        },
      },{
        new:true
      }
    );
    if (cart) {
      return res
        .status(200)
        .send({ success: true, messsage: "added the shipping address",cart:[cart] });
    }
    res.status(204).send({ success: true, messsage: "no cart found" });
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

export const soldProduct = async (req: Request, res: Response) => {
  try {
    const soldOrder = await Cart.find({ paymentStatus: "paid" });

    if (soldOrder.length === 0) {
      return res.status(204);
    }
    return res.status(200).send({
      success: true,
      message: "got all sold order",
      soldOrder: soldOrder,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.message || "internal server error",
    });
  }
};
