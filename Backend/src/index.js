import express from "express"
import dotenv from "dotenv"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import problemsRoute from "./routes/problem.routes.js"
import executionRoute from "./routes/executeCode.routes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000 

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/problems", problemsRoute)
app.use("/api/v1/execute-code", executionRoute)

app.get('/', (req, res) => {
  res.send("Hello Guys welcome to LeetLeb...")
})

app.listen(PORT, () => {
    console.log(`server is listenig at port ${PORT}`);
})