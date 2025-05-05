import express from "express"
import { checkAdmin, verifyJwt } from "../middlewares/auth.middleware.js"
import { createProblems, 
    deleteProblem, 
    getAllProblems, 
    getAllProblemSolvedByUser, 
    getProblemId, 
    updateProblem } from "../controllers/problem.controllers.js"

const problemsRoute = express.Router()

problemsRoute.post("/create-problem", verifyJwt, checkAdmin, createProblems)
problemsRoute.get("/get-all-problems", verifyJwt, getAllProblems)
problemsRoute.get("/get-problem/:id", verifyJwt, getProblemId)
problemsRoute.put("/update-problem/:id", verifyJwt, checkAdmin, updateProblem)
problemsRoute.delete("/delete-problem/:id", verifyJwt, checkAdmin, deleteProblem)
problemsRoute.get("/get-solved-problems", verifyJwt, getAllProblemSolvedByUser)

export default problemsRoute