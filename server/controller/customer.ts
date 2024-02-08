import { Request, Response } from "express";
import Customer from "../models/customer";
import { customerSchema} from "../utils/types";
import { hashPassword, verifyPassword } from "../utils/password";

export const getAllCustomers=async(req:Request,res:Response)=>{
    try {
      console.log("aaipugyo")
        const customer = await Customer.find();
        if(!customer){
          return res.status(403).send({success:false,message:"customers not found",customer:null})
        }
        return res.status(200).send({success:true,message:"customer found",customers:customer})
      } catch (error) {
        return res.status(500).send({success:false,message:"internal server error",customer:null});
      }
}

export const getSpecificCustomer =async(req:Request,res:Response)=>{
    try {
        const existingCustomer = await Customer.findOne({_id: req.params.id});
        if(!existingCustomer){
          return res.status(403).send({success:false,message:"customer not found",customer:null})
        }
        const customerDetails = {
          _id: existingCustomer._id,
          email:existingCustomer.email,
          username:existingCustomer.username,
          
          name:{
            firstName:existingCustomer.name.firstName,
            lastName:existingCustomer.name.lastName
          },
          address:{
            city:existingCustomer.address.city,
            street:existingCustomer.address?.street,
            zipcode:existingCustomer.address?.zipcode
          },
          phone: existingCustomer.phone,
        };
        return res.status(200).send({success:true,message:"customer found",customer:customerDetails})
      } catch (error) {
        return res.status(500).send({success:false,message:"internal server error",customer:null});
      }
}
export const addCustomer =async(req:Request,res:Response)=>{
    try {
        const validation = customerSchema.safeParse(req.body);
        if (!validation.success) {
          return res
            .status(400)
            .send({ sucess: false, message: validation.error.issues[0].message });
        }
       
    
        const existingCustomer = await Customer.findOne({email:req.body.email });
        if (existingCustomer) {
          return res
            .status(400)
            .send({ success: false, message: "this email customer id already exists" });
        }
     const hashedPassword =  await hashPassword(req.body.password);
   
        const customer = await Customer.create({
          
          email: req.body.email,
          username: req.body.username,
          password: hashedPassword,
          name:{
            firstName:req.body.name.firstName,
            lastName:req.body.name.lastName
          },
          address:{
            city:req.body.address.city,
            street:req.body.address.street,
            zipcode:req.body.address.zipcode
          },
          phone: req.body.phone,
        });
        console.log(customer)
        await customer.save();
        res.status(200).send({success:true,message:"customer added"});
      } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message:"internal server error"})
      }
};

export const loginCustomer = async(req:Request, res:Response)=>{
  try {
      
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(403)
        .send({ status: false, message: "all fields are mandatory" });
    }

    const existingCustomer = await Customer.findOne({ email:email });
   
    if (!existingCustomer) {
      return res
        .status(403)
        .send({ status: false, message: "user doesnt exist" });
    }

    const isPasswordMatched = await verifyPassword(
      password,
      existingCustomer.password as string
    );
    
    if (!isPasswordMatched) {
      return res
        .status(403)
        .send({ status: false, message: "invalid credentials" });
    }
    
    const user = {
      _id: existingCustomer._id,
          email:existingCustomer.email,
          username:existingCustomer.username,
          
          name:{
            firstName:existingCustomer.name.firstName,
            lastName:existingCustomer.name.lastName
          },
          address:{
            city:existingCustomer.address.city,
            street:existingCustomer.address?.street,
            zipcode:existingCustomer.address?.zipcode
          },
          phone: existingCustomer.phone
        
    }
   

    res
      .status(200)
      .send({ status: true, message: "user logged in successfully", user });
  } catch (error) {
    res.status(500).send({status:false, message:"internal server error"})
  }
}
export const updateCustomer =async(req:Request,res:Response)=>{
  try {
    const validation = customerSchema.safeParse(req.body);
    if (!validation.success) {
      return res
        .status(400)
        .send({ sucess: false, message: validation.error.issues[0].message });
    }
    if (req.params.id == null) {
     return res.status(403).send({
        success: false,
        message: 'customer id should be provided',
        customer: null
      })};
    const existingCustomer = await Customer.findOne({ _id: req.params.id });
    if (!existingCustomer) {
      return res
        .status(400)
        .send({ success: false, message: "Customer not found" });
    };
    const editedProduct = await Customer.findOneAndUpdate({_id:req.params.id},{
      ...req.body
    }, {
      new: true,
      runValidators: true,
    });
    
     res.status(200).send({success:true,message:"edited successfully",customer:editedProduct})
  } catch (error) {
    return res.status(500).send({success:false,message:"internal server error"});
  }
};


export const deleteCustomer =async(req:Request,res:Response)=>{
  try {
    if (req.params.id == null) {
      return res.status(403).send({
        success: false,
        message: 'customer id should be provided',
        customer: null
      })};
      await Customer.findOneAndDelete({_id:req.params.id});
      res.status(200).send({success:true,message:"Customer deleted successfully"})
  } catch (error) {
    return res.status(500).send({success:false,message:"internal server error"});
  }
};