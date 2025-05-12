import express from "express";


import { checkUser, 
    loginUser, 
    logoutUser, 
    registerUser } from "../controllers/auth.controllers.js";

import { verifyJwt } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.route('/register').post(registerUser)
authRouter.route('/login').post(loginUser)
authRouter.route('/logout').post(verifyJwt, logoutUser)
authRouter.route('/check').get(verifyJwt, checkUser)

export default authRouter