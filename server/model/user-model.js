import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET_KEY='DIYAGUPTA'
const userSchema=new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,default:false}
});

userSchema.pre('save',async function(next){
    // console.log(this);
    const user=this;
    if(!user.isModified("password")){
        next();
    }
    try{
        const saltRound=await bcrypt.genSalt(10);
        const hash_password=await bcrypt.hash(user.password,saltRound);
        user.password=hash_password;
    }catch(Err){
        next(Err);
    }
})

userSchema.methods.comparePassword=async function(password){
    return bcrypt.compare(password,this.password)
}
//json web tokens: are typically stored in database along with user details.
// they are issued by server during authentication procss and 
// then stired on client-side for later use
// console.log(process.env.JWT_SECRET_KEY);  
userSchema.methods.generateToken =async function(){
    try{
        return jwt.sign({
            userId: this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
        JWT_SECRET_KEY,
        {
            expiresIn:"30d",
        }
    )
    }catch(error){
        console.error(error);
    }
}

export const User=new mongoose.model("User",userSchema);