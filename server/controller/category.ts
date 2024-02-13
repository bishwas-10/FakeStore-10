import { Request, Response } from "express";
import { categorySchema } from "../utils/types";
import Category from "../models/category";
import Product from "../models/product";

export const getAllCategories = async(req: Request, res: Response) => {
console.log("yo aako ho")
  try {
    const category = await Category.find();
      
    if(!category){
      return res.status(404).send({success:false,message:"categories not found",categories:null})
    }
    return res.status(200).send({success:true,message:"category found",categories:category})
  } catch (error) {
    return res.status(500).send({success:false,message:"internal server error",categories:null});
  }
};

export const getCategory = async (req: Request, res: Response) => {
  
  try {
    const category = await Category.findOne({_id: req.params.id}).populate([
        { path: "product", model: Product },
       
      ]);;
    if(!category){
      return res.status(404).send({success:false,message:"category not found",category:null})
    }
    return res.status(200).send({success:true,message:"category found",category:category})
  } catch (error) {
    return res.status(500).send({success:false,message:"internal server error",category:null});
  }
};




export const getCategoryProduct = async(req:Request,res:Response) => {

try {
  const category = req.params.category;

  const categoryProduct = await Product.find({category:category});

  if(categoryProduct.length===0){
    return res.status(404).send({success:false, message:"couldnt find any product of your category"});
  }

  return res.status(200).send({succes:true, message:"got your category products", products:categoryProduct});
} catch (error) {
  return res.status(500).send({success:false,message:"inernal server error"});
}
};

export const addCategory = async (req: Request, res: Response) => {
  try {
    // const validation = productSchema.safeParse(req.body);
    // if (!validation.success) {
    //   console.log(typeof(req.body.rating.rate))
    //   return res
    //     .status(400)
    //     .send({ sucess: false, message: validation.error.issues[0].message });
    // }
    const existingCategory = await Category.findOne({title:req.body.title });
    if (existingCategory) {
      return res
        .status(400)
        .send({ success: false, message: "category already exists" });
    }

    const category = await Category.create({
      
      title: req.body.title,
    
      
      description: req.body.description,
      image: req.body.image,
    
    });
    await category.save();
    res.status(200).send({success:true,message:"category added"});
  } catch (error:any) {
    console.log(error)
    return res.status(500).send({success:false,message:error.message})
  }
};
export const editCategory =async (req:Request, res:Response) => {

  try {
    const validation = categorySchema.safeParse(req.body);
    if (!validation.success) {
      return res
        .status(400)
        .send({ sucess: false, message: validation.error.issues[0].message });
    }
    if (req.params.id == null) {
     return res.status(404).send({
        success: false,
        message: 'category id should be provided',
        product: null
      })};
    const existingCategory = await Category.findOne({ _id: req.params.id });
    if (!existingCategory) {
      return res
        .status(400)
        .send({ success: false, message: "category not found" });
    };
    const editedCategory = await Category.findOneAndUpdate({_id:req.params.id},{
      title: req.body.title,
      
      description: req.body.description,
      image: req.body.image,
      
    }, {
      new: true,
      runValidators: true,
    });
     res.status(200).send({success:true,message:"edited successfully",category:editedCategory})
  } catch (error) {
    return res.status(500).send({success:false,message:"internal server error"});
  }
};
export const deleteCategory = async(req:Request,res:Response) => {
  try {
    if (req.params.id == null) {
      return res.status(404).send({
        success: false,
        message: 'category id should be provided',
        product: null
      })};
      await Category.findOneAndDelete({_id:req.params.id});
      res.status(200).send({success:true,message:"category item deleted successfully"})
  } catch (error) {
    return res.status(500).send({success:false,message:"internal server error"});
  }
};
