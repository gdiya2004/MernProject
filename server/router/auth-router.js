import express from "express"
import {home,register,login,user} from "../controllers/auth-controller.js"
import { signupSchema,loginSchema } from "../validator/auth-validator.js";
import { validate } from "../middlewares/validate-middleware.js";
import {authMiddleware} from "../middlewares/auth-middleware.js"
const router=express.Router();
// router.get("/",(req,res)=>{
//     res.status(200).send("hello ji");
// });
router.route("/").get(home);
router.route("/register").post(validate(signupSchema),register);
router.route("/login").post(validate(loginSchema),login);
router.route("/user").get(authMiddleware,user);
export const router_=router;