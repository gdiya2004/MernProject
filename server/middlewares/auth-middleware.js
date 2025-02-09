import jwt from "jsonwebtoken"
import {User} from "../model/user-model.js"

export const authMiddleware=async(req,res,next)=>{
const JWT_SECRET_KEY='DIYAGUPTA';
const token=req.header("Authorization");
if(!token){
    return res.status(401).json({message:"Unauthorized HTTP,Token not provided"});
}
const jwtToken=token.replace("Bearer","").trim();
// console.log("token",jwtToken);
try{
    const isVerified=jwt.verify(jwtToken,JWT_SECRET_KEY);
    console.log(isVerified);
    const userData=await User.findOne({email:isVerified.email}).select({password:0})
    // console.log(userData);
    req.user=userData;
    req.token=token;
    req.userID=userData._id;
     next();
}catch(errror){
    return res.status(401).json({message:"Unauthorized. Invalid tkoen"})

}

}