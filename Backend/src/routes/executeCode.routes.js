import express from "express"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { submitCode, runCode } from "../controllers/executeCode.controllers.js"

const executionRoute = express.Router()

executionRoute.post('/submit', verifyJwt, submitCode)
executionRoute.post('/run', verifyJwt, runCode)

export default executionRoute