export const validate=(schema)=>async(req,res,next)=>{
    try{
        const parsebody=await schema.parseAsync(req.body);
        req.body=parsebody;
        next();
    }catch(err){
        // console.log(err);
        const extraDetails=err.errors[0].message;
        // console.log(message);
        // res.status(400).json({msg:message})
        const status=422;
        const message='Fill the details properly'
        const error={
            status,
            message,
            extraDetails
        }
        // console.log(err);
        next(error);
    }
}