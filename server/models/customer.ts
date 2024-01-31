import {Schema, model, Document} from "mongoose";


export interface CustomerProps extends Document{
email:string;
username:string;
password:string;
name:{
    firstName:string;
    lastName:string;
};
address:{
    city:string;
    street?:string;
    zipcode?:string;
};
phone:string;
}

const customerSchema = new Schema({
    
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        }
    },
    address:{
        city:{
            type:String,
            required:true
        },
        street:String,
        zipcode:String,
      
    },
    phone:{
        type:String,
        required:true
    }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true,
})

const Customer = model<CustomerProps>('customers',customerSchema);

export default Customer;