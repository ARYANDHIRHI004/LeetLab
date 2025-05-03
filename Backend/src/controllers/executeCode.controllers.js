import { db } from "../libs/db"
import { pollBatchResults, submitBatch } from "../libs/judge0.lib";

export const executeCode = async(req, res) => {
    try {
        const {source_code, language_Id, stdin, expected_output, problemId} = req.body;
        const userId = req.user.id;
        
        // Valid test cases
        
        if(!Array.isArray(stdin) || 
        stdin.length === 0 ||
        !Array.isArray(expected_output) ||
        expected_output.length !== stdin.length
        ){
            return res.status(400).json({
                error: "Invalid or missing test cases"
            })
        }

        // Prepare each test cases for judge0 batch submission
        const submission = stdin.map((input)=>({
            source_code,
            language_Id,
            stdin: input
        }))

        const submiteResponse = await submitBatch(submission)

        const tokens = submiteResponse.map((res)=>(res.token))

        const result = await pollBatchResults(tokens)

        

    } catch (error) {
        
    }
}
