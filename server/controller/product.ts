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


export const getAllCategories = async(req:Request,res:Response) => {
  console.log("aaipugyosdada")
  try {
    const categories = await Product.distinct('category');
    if(categories.length===0){
     return res.status(403).send({success:false,message:"failed to get your categories",categories:null})
    }else{
       return res.status(200).send({success:true,message:"got your categories",categories:categories});
    }
  } catch (error) {
    return res.status(500).send({success:false,message:"internal server error"});
  }
};

export const getCategoryProduct = async(req:Request,res:Response) => {

try {
  const category = req.params.category;

  const categoryProduct = await Product.find({category:category});

  if(categoryProduct.length===0){
    return res.status(403).send({success:false, message:"couldnt find any product of your category"});
  }

  return res.status(200).send({succes:true, message:"got your category products", products:categoryProduct});
} catch (error) {
  return res.status(500).send({success:false,message:"inernal server error"});
}
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    // const validation = productSchema.safeParse(req.body);
    // if (!validation.success) {
    //   console.log(typeof(req.body.rating.rate))
    //   return res
    //     .status(400)
    //     .send({ sucess: false, message: validation.error.issues[0].message });
    // }
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
      rating:{
        rate:req.body.rating.rate,
        count:req.body.rating.count
      }
    });
    await product.save();
    res.status(200).send({success:true,message:"product added"});
  } catch (error:any) {
    console.log(error)
    return res.status(500).send({success:false,message:error.message})
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
        message: 'product id should be provided',
        product: null
      })};
    const existingProduct = await Product.findOne({ _id: req.params.id });
    if (!existingProduct) {
      return res
        .status(400)
        .send({ success: false, message: "products not found" });
    };
    const editedProduct = await Product.findOneAndUpdate({_id:req.params.id},{
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      image: req.body.image,
      rating:{
        rate:req.body.rating.rate,
        count:req.body.rating.count
      }
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
