import express from "express"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { executeCode } from "../controllers/executeCode.controllers.js"

const executionRoute = express.Router()

executionRoute.post('/', verifyJwt, executeCode)

export default executionRoute