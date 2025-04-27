import jwt from "jsonwebtoken"
import { db } from "../libs/db.js"

export const verifyJwt = async (req,res, next) => {
   try {
     const token = req.cookies?.jwtToken
 
     if(!token){
         return res.status(400).json({
             error: "unauthorized"
         })
     }
     
     const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
 
     if(!decodedToken){
         return res.status(400).json({
             error: "wrong token"
         })
     }
     const user = await db.user.findUnique({
         where:{
             id:decodedToken.id
            },
            select:{
                id:true,
                image: true,
                name: true,
                email: true,
                role: true
            }
        })

        if(!user){
            return res.status(400).json({
                error: "User not found"
            })
        }

     req.user = user
     next()

   } catch (error) {
        return res.status(500).json({
            error: "something went wrong"
        })
   }

    
}
 
export const checkAdmin = async (req, res, next) => {
  try {
    const userID = req.user.id

    const user = await db.user.findUnique({
        where:{
            id: userID
        },
        select:{
            role: true
        }
    })

    if(!user || user.role !== "ADMIN"){
        return res.status(403).JSON({
            message: "You are not authorized"
        })
    }

    next()

  } catch (error) {
    console.log('error');

  }
}
