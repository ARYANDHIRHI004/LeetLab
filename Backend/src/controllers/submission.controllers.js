import { db } from "../libs/db.js"

export const getAllSubmission = async (req, res) => {
    const userId = req.user.userId
    try {
        const submissions = await db.submission.findMany({
            where:{
                userId
            }
        })

        return res.status(200).json({
            success: true,
            message: "submissions fecthed successfully",
            submissions
        })
        
    } catch (error) {
        console.log("Error while fetching submissions");
        return res.status(500).json({
            message: "submissions fecthing failed",
        })
    }
}

export const getSubmissionsForProblem = async (req, res) => {
    const {problemId} = req.params;
    const userId = req.user.id

   try {
     const submissions = await db.submission.findMany({
         where:{
             userId,
             problemId
         }
     })
 
     return res.status(200).json({
         success: true,
         message: "submission fecthed successfully",
         submissions
     })
   } catch (error) {
        console.log("Error while fetching submission");
        return res.status(500).json({
            message: "submission fecthing failed",
        })
   }

}

export const getAllTheSubmissionsForProblem = async (req, res) => {
    const {problemId} = req.params;
    const userId = req.user.id
    try {
        const submission = await db.submission.count({
            where:{
                userId,
                problemId
            }
        })

        res.status(200).json({
            success: true,
            message: "Submissions fetched successfully",
            submission
        })

    } catch (error) {
        console.log("Error while fetching submission");
        return res.status(500).json({
            message: "submission fecthing failed",
        })
    }
}

