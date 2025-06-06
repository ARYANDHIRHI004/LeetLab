import Express from 'express'
import { checkOrganization, verifyJwt } from '../middlewares/auth.middleware.js'
import { createAssignment, deleteAssignment, getAllAssignments, getAssignmentById, updateAssignment } from '../controllers/assignment.controllers.js'

const assignmetnRoute = Express.Router()

assignmetnRoute.route("/create-assignment").post(verifyJwt, checkOrganization, createAssignment)
assignmetnRoute.route("/get-all-assignments").post(verifyJwt, getAllAssignments)
assignmetnRoute.route("/get-assignment").post(verifyJwt, getAssignmentById)
assignmetnRoute.route("/update-assignment").post(verifyJwt, checkOrganization, updateAssignment)
assignmetnRoute.route("/delete-assignment").post(verifyJwt, checkOrganization, deleteAssignment )

export default assignmetnRoute