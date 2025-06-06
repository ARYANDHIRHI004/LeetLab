import Express from 'express'
import { checkOrganization, verifyJwt } from '../middlewares/auth.middleware.js'
import { createAssignment, deleteAssignment, getAllAssignments, getAssignmentById, updateAssignment } from '../controllers/assignment.controllers.js'

const assignmetnRoute = Express.Router()

assignmetnRoute.route("/create-assignment").post(verifyJwt, checkOrganization, createAssignment)
assignmetnRoute.route("/get-all-assignments").get(verifyJwt, getAllAssignments)
assignmetnRoute.route("/get-assignment/:assignmentId").get(verifyJwt, getAssignmentById)
assignmetnRoute.route("/update-assignment/:assignmentId").post(verifyJwt, checkOrganization, updateAssignment)
assignmetnRoute.route("/delete-assignment/:assignmentId").post(verifyJwt, checkOrganization, deleteAssignment )

export default assignmetnRoute