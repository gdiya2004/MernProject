import express from "express";
import { services } from "../controllers/service-controller.js";

export const service_router=express.Router();

service_router.route("/service").get(services)