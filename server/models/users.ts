import mongoose, {Document ,model, Schema} from "mongoose";



export interface UserProps extends Document{
     username?:string;
    email:string;
    password?:string;
    name: {
        firstName: string;
        lastName: string;
      };
      address: {
        city: string;
        street?: string;
        zipcode?: string;
      };
      phone: string;
    roles:{
        customer:number,
        admin: number
    };
    refreshToken:string[];

}

const userSchema = new Schema<UserProps>({
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        required:[true, 'is required field'],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true, 'is required field']
    },
    name: {
        firstName: {
          type: String,
          required: [true, "first name is required"],
        },
        lastName: {
          type: String,
          required:  [true, "last name is required"],
        },
      },
      address: {
        city: {
          type: String,
          required: true,
        },
        street: String,
        zipcode: String,
      },
      phone: {
        type: String,
        required: true,
      },
    roles:{
        customer: {
            type: Number,
            default: 2001
        },
        
        admin: Number
    },
    refreshToken:[String]

},
{
    timestamps:true
})

const User = model<UserProps>('users', userSchema);

export default User;