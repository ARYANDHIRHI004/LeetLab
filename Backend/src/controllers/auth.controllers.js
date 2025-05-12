import bcrypt from "bcryptjs"
import {db} from "../libs/db.js"
import { UserRole } from "../generated/prisma/index.js"
import jwt from "jsonwebtoken"

const registerUser = async (req, res) => {
    const {email, password, name} = req.body
    
    try {
        const exixtingUser = await db.user.findUnique({
            where:{
                email
            }
        })

        if(exixtingUser){
            return res.status(400).json({
                error: "User already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: UserRole.USER
            }
        })

        if(!newUser){
            return res.status(500).json({
                error: "Internal server error"
            })
        }

        const token = jwt.sign({
            id: newUser.id
        },
            process.env.JWT_SECRET,
        {
            expiresIn:"7d" 
        })

        res.cookie("jwt", token , {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1000*60*60*24*7
        })

        res.status(200).json({
            message: "User created successfully",
            user: {
                id: newUser.id,
                email:newUser.email,
                name: newUser.name,
                role: newUser.role,
                Image: newUser.image
            }
        })

    } catch (error) {
        return res.status(500).json({
            error: "error while registring user"
        })
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await db.user.findUnique({
            where:{
                email
            }
        })

        if(!user){
            return res.status(400).json({
                error: "User not found"
            })
        }
        
        const isMatched = await bcrypt.compare(password, user.password)
        
        if(!isMatched){
            return res.status(400).json({
                error: "Invalid credentials"
            })
        }

        const token = jwt.sign({
            id: user.id
        },process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        })

        res.cookie("jwtToken", token , {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1000*60*60*24*7
        })

        res.status(200).json({
            success: true,
            message: "User logedin successfully",
            user: {
                id: user.id,
                email:user.email,
                name: user.name,
                role: user.role,
                Image: user.image
            }
        })
                

    } catch (error) {
        return res.status(500).json({
            error: "erro    r logging in user"
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie("jwtToken", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1000*60*60*24*7
        })
        res.status(200).json({
            message: "logout successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            error: "error logging out user"
        })
    }
}

const checkUser = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "User authorized successfully",
            user: req.user
        })
    } catch (error) {
        console.log(error);
        
    }
}

export {
    registerUser,
    loginUser,
    logoutUser,
    checkUser
}
