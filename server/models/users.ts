import mongoose, {Document ,model, Schema} from "mongoose";



export interface UserProps extends Document{
     username?:string;
    email:string;
    password?:string;
    confirmPassword?:string;
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
    roles:{
        customer: {
            type: Number,
            default: 2001
        },
        
        admin: Number
    },
    refreshToken:[{
        type:String,
        
    }]

},
{
    timestamps:true
})

const User = model<UserProps>('users', userSchema);

export default User;