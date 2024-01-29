import { Request, Response } from "express";
import { productSchema } from "../utils/types";
import Product from "../models/product";

export const getAllProducts = async(req: Request, res: Response) => {
  try {
    const product = await Product.find();
    if(!product){
      return res.status(403).send({success:false,message:"products not found",products:null})
    }
    return res.status(200).send({success:true,message:"product found",products:product})
  } catch (error) {
    return res.status(500).send({success:false,message:"internal server error",product:null});
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({_id: req.params.id});
    if(!product){
      return res.status(403).send({success:false,message:"product not found",product:null})
    }
    return res.status(200).send({success:true,message:"product found",product:product})
  } catch (error) {
    return res.status(500).send({success:false,message:"internal server error",product:null});
  }
};


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

    const existingProduct = await Product.findOne({title:req.body.title });
    if (existingProduct) {
      return res
        .status(400)
        .send({ success: false, message: "product already exists" });
    }

    const product = await Product.create({
      
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
export const editProduct =async (req:Request, res:Response) => {
  try {
    const validation = productSchema.safeParse(req.body);
    if (!validation.success) {
      return res
        .status(400)
        .send({ sucess: false, message: validation.error.issues[0].message });
    }
    if (req.params.id == null) {
     return res.status(403).send({
        success: false,
        message: 'cart id should be provided',
        product: null
      })};
    const existingProduct = await Product.findOne({ _id: req.params.id });
    if (!existingProduct) {
      return res
        .status(400)
        .send({ success: false, message: "products not found" });
    };
    const editedProduct = await Product.findOneAndUpdate({_id:req.params.id},{
      ...req.body
    }, {
      new: true,
      runValidators: true,
    });
    
     res.status(200).send({success:true,message:"edited successfully",product:editedProduct})
  } catch (error) {
    return res.status(500).send({success:false,message:"internal server error"});
  }
};
export const deleteProduct = async(req:Request,res:Response) => {
  try {
    if (req.params.id == null) {
      return res.status(403).send({
        success: false,
        message: 'cart id should be provided',
        product: null
      })};
      await Product.findOneAndDelete({_id:req.params.id});
      res.status(200).send({success:true,message:"product item deleted successfully"})
  } catch (error) {
    return res.status(500).send({success:false,message:"internal server error"});
  }
};
