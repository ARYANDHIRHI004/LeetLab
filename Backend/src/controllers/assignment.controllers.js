import { db } from "../libs/db.js";

export const createAssignment = async (req, res) => {
  const {eventId, userIds} = req.body

  try {
    

    if(!Array.isArray(userIds) || !eventId){
        return res.status(400).json({
            error: "Invalid or missging problemsId"
        })
    }

    const assinments = await db.eventAssignedTo.createMany({
      data:userIds.map((userId)=>({
          eventId,
          userId
      }))
    })

    return res.status(200).json({
      message:"assignments created"
    })

  } catch (error) {
    return res.status(500).json({
        message:"Internal Server Error"
    })
  }

};

export const getAllAssignments = async (req, res) => {
  const userId = req.user.id
  try {
    
    if(!userId){
      return res.status(400).jsaon({
        message:"Unauthorized request"
      })
    }

    const allAssignments = await db.eventAssignedTo.findMany({
      where:{
        userId
      }
    })

    return res.status(200).json({
      success:true,
      message: "all assignments fatched successfully",
      allAssignments
    })

  } catch (error) {
    return res.status(500).json({
        message:"Internal Server Error"
    })
  }
};

export const getAssignmentById = async (req, res) => {
    const {assignmentId} = req.params
    try {
      
      const assignment = await db.eventAssignedTo.findUnique({
        where:{
          id: assignmentId 
        }
      })

    return res.status(200).json({
      success: true,
      message: "assignment fetched successfully",
      assignment
    })


    } catch (error) {
    return res.status(500).json({
        message:"Internal Server Error"
    })
  }
};

export const updateAssignment = async (req, res) => {

};

export const deleteAssignment = async (req, res) => {

};
