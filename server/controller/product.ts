import { Request, Response } from "express";
import { productSchema } from "../utils/types";
import Product from "../models/product";

export const getAllProducts = (req: Request, res: Response) => {};

export const getProduct = () => {};
export const getAllCategories = () => {};
export const getCategoryProduct = () => {};
export const addProduct = async (req: Request, res: Response) => {
  try {
    const validation = productSchema.safeParse(req.body);
    if (!validation.success) {
      return res
        .status(400)
        .send({ sucess: false, message: validation.error.issues[0].message });
    }
    const totalProduct = await Product.countDocuments();

    const existingProduct = await Product.findOne({ title: req.body.title });
    if (existingProduct) {
      return res
        .status(400)
        .send({ success: false, message: "product already exists" });
    }

    const product = await Product.create({
      id: totalProduct,
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      image: req.body.image,
    });
    await product.save();
    res.status(200).send({success:true,message:"product added"});
  } catch (error) {
    return res.status(500).send({success:false,message:"internal server error"})
  }
};
export const editProduct = () => {};
export const deleteProduct = () => {};
