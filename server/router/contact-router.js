import express from "express";
import {contactForm} from "../controllers/contact-controller.js"
export const contactRoute=express.Router();
contactRoute.route("/contact").post(contactForm)
