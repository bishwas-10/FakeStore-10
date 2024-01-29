import {Schema, model, Document} from "mongoose";


export interface CustomerProps extends Document{
id:number;
email:string;
username:string;
password:string;
name:{
    firstName:string;
    LastName:string;
};
address:{
    city:string;
    street?:string;
    zipcode?:string;
};
phone:string;
}

const customerSchema = new Schema({
    id:{
        type:Number,
        required:true
    },
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
        firstname:{
            type:String,
            required:true
        },
        lastname:{
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
})

const Customer = model<CustomerProps>('customers',customerSchema);

export default Customer;