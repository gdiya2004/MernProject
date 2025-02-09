import dotenv  from "dotenv"
dotenv.config();
// console.log(process.env.MONGODB_URI)
import cors from "cors";

import express from "express"
import {router_} from "./router/auth-router.js"
import {contactRoute} from "./router/contact-router.js"
import {service_router} from "./router/service-router.js"
import { admin_router } from "./router/admin-router.js";

import { connectDb } from "./utils/db.js";
import { errorMiddleWare } from "./middlewares/error-middleware.js";
const app=express();

const corsOptions={
    origin:"http://localhost:5173",
    method:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true
}
app.use(cors(corsOptions));
 
//express middleware that parses incoming req bodies with JSON payloads
//it is imp to place it before routes to handle json data from request body
app.use(express.json());
app.use("/api/auth",router_);
app.use("/api/form",contactRoute);
app.use("/api/data",service_router);
app.use("/api/admin",admin_router);
app.use(errorMiddleWare);

connectDb().then(()=>{
    const PORT=5004;
    app.listen(PORT,()=>{
    console.log("server")
})
})