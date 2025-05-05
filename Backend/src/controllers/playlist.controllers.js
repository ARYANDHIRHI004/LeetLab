import { db } from "../libs/db.js";

export const getAllListDetails = async (req, res) => {
    const userId = req.user.id;
    try {
        const playlists = await db.playlist.findMany({
            where:{
                userId
            },
            include:{
                problem:{
                    include:{
                        problem:true
                    }
                }
            }
        })
        res.status(200).json({
            success: true,
            message: "playlist fetched successfully",
            playlists
        })
    } catch (error) {
        console.error("Error", error)
    }
}

export const getPlayListDetails = async (req, res) => {
    const {playListId} = req.params;
    const userId = req.user.id;
    
    try {
        const playlist = await db.playlist.findUnique({
            where:{
                playListId,
                userId
            },
            include:{
                problem:{
                    include:{
                        problem:true
                    }
                }
            }
        })
        res.status(200).json({
            success: true,
            message: "Playlist found successfully",
            playlist
        })
    } catch (error) {
        
    }
}

export const createPlaylist = async (req, res) => {
    const {name, description} = req.body;
    const userId = req.user.id;

    try {
        const playList = db.playlist.create({
            data:{
                name,
                description,
                userId
            }
        })
        res.status(200).json({
            success: true,
            message: "Playlist created successfully",
            playList
        })
    } catch (error) {
        console.error("Error", error)
    }
}

export const addProblemToPlaylist = async (req, res) => {
    const {playlistId} = req.params;
    const {problemIds} = req.body;
    try {
        if(!Array.isArray(problemIds)){
            return res.status(400).json({
                error: "Invalid or missging problemsId"
            })
        }
        const problemsInPlaylist = await db.problemsInPlaylist.createMany({
            data:{

            }
        })
    } catch (error) {
        
    }
}

export const deletePlaylist = async (req, res) => {
    const userId = req.user.id;
    const {playlistId} = req.params;

    try {
        const deleted = await db.playlist.delete({
            where:{
                playlistId
            }
        })
        res.status(200).json({
            success: true,
            message: "Playlist deleted successfully",
            deleted
        })
    } catch (error) {
        console.error("error", error);        
    }
}

export const removeProblemsFromPlaylist = async (req, res) => {
    const {playlistId} = req.params;
    const {problemIds} = req.body;

    try {
        if(!Array.isArray(problemIds) || problemIds.length === 0){

        }
    } catch (error) {
        
    }
}

