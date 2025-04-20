import bcrypt from "bcryptjs"
import {db} from "../libs/db.js"

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

        const hashedPassword = bcrypt.hash(password, 10)

        const newUser = await db.user.create({
            data:{
                email,
                password: hashedPassword,
                name
            }
        })




    } catch (error) {
        
    }
}

const loginUser = async (req, res) => {}

const logoutUser = async (req, res) => {}

export {
    registerUser
}
