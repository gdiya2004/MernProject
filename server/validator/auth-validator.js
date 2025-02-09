import {z} from "zod";
export const loginSchema=z.object({
    email:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email"})
    .min(3,{message:"Email must be atleast of 3 characters"})
    .max(255,{message:"Email must not be more than 255 characters"}),
    password:z.string({required_error:"Password is req"})
    .min(7,{message:"Password must be atleast 6"})
    .max(1024,{message:"Password cant be greater"})
})
//create a schema:
export const signupSchema = loginSchema.extend({
    username: z
    .string({required_error:"Name is req"})
    .trim()
    .min(3,{message:"Name must be atleast of 3 characters"})
    .max(255,{message:"Name must not be more than 255 characters"}),


    phone:z
    .string({required_error:"Phone is req"})
    .trim()
    .min(10,{message:"Phone must be atleast of 10 characters"})
    .max(20,{message:"Email must not be more than 255 characters"}),
    
});