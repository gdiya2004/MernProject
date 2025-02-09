import {service} from "../model/service_model.js"

export const services=async(req,res)=>{
try{
const response=await service.find();
if(!response){
    res.status(404).json({msg:"no service found"});
    return;
}
res.status(200).json({msg:response})
}catch(err){
    console.log("service error")
}
}