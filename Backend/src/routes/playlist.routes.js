import express from "express"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { addProblemToPlaylist, createPlaylist, deletePlaylist, getAllListDetails, getPlayListDetails, removeProblemsFromPlaylist } from "../controllers/playlist.controllers.js"

const playlistRoute = express.Router()
 
playlistRoute.get("/", verifyJwt, getAllListDetails)
playlistRoute.get("/:playlistId", verifyJwt, getPlayListDetails)
playlistRoute.post("/create-playlist", verifyJwt, createPlaylist)
playlistRoute.post("/:playlistId/add-problem", verifyJwt, addProblemToPlaylist)
playlistRoute.delete("/:playlistId", verifyJwt, deletePlaylist)
playlistRoute.delete("/:playlistId/remove-problem", verifyJwt, removeProblemsFromPlaylist)


export default playlistRoute