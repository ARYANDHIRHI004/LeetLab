import express from "express"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { getAllSubmission, getAllTheSubmissionsForProblem, getSubmissionsForProblem } from "../controllers/submission.controllers.js"

const submissionRoute = express.Router()

submissionRoute.get("/get-all-submissions", verifyJwt, getAllSubmission)
submissionRoute.get("/get-submission/:problemId", verifyJwt, getSubmissionsForProblem)
submissionRoute.get("/get-submission-count/:problemId", verifyJwt, getAllTheSubmissionsForProblem)

export default submissionRoute