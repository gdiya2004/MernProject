// import bcrypt from "bcryptjs"
import {User} from "../model/user-model.js"

export const home=async(req,res)=>{
    try{
        res.status(200).send("hello ji");
    }catch(e){
        console.log(e);
    }
}

export const register=async(req,res)=>{
    try{
        // console.log(req.body);
        const {username,email,phone,password}=req.body;
        const userExist=await User.findOne({email});
        if(userExist){
            return res.status(400).json({msg:"email exists"});
        }
//         //hash the password
// const saltRound=10;
// const hash_password=await bcrypt.hash(password,saltRound)
       const userCreated=await User.create({username,email,phone,password});
       return (res.status(201).json({
        msg:userCreated, 
        token: await userCreated.generateToken(),
        userId:userCreated._id.toString()
    }))
    }catch(err){
        console.log(err);
        return res.status(500).json("internal server error");
    }
}

// export const register=async (req,res)=>{
//     try{
//         res.status(200).send('welcome');
//     }catch(err){
//         res.status(400).send({msg:"page not found"})
//     }
// }

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const userExist=await User.findOne({email});
        
        if(!userExist){
            // console.log("usrExist",userExist);
            return res.status(400).json({msg:"Invalid Credentials diya"});
        }
        // const userP=await bcrypt.compare(password,userExist.password);
        const userP=await userExist.comparePassword(password);
      
        if(userP){
            console.log(userExist.password)
            return (res.status(200).json({
                msg:"Login Succesful", 
                token: await userExist.generateToken(),
                userId:userExist._id.toString()
            }))
        }else {  res.status(400).json({message:"invalid email or password"})}

    }catch(err){
        res.status(500).json("Internal server error")
    }
}

export const user=async(req,res)=>{
    try{
        const userData=req.user;
        // console.log(userData);
        return res.status(200).json({userData});
        // res.status(200).json({msg:"hi user"});
    }catch(err){
        console.log("error from user route");
    }
}