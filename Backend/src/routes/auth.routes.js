import express from "express";
import { registerUser } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.route('/register').post(registerUser)
authRouter.route('/login').post()
authRouter.route('/logout').post()
authRouter.route('/check').post()

export default authRouter