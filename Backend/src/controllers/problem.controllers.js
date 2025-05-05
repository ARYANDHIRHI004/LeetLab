import { db } from "../libs/db.js"
import {  getJudge0LanguageId,pollBatchResults, submitBatch } from "../libs/judge0.lib.js"

export const createProblems = async (req, res) => {
    // get details from req.body
    // check user role once again
    // loop through each and every solution for diff languages

    const {title, 
        description, 
        difficulty, 
        tags, 
        examples, 
        constraints, 
        testcases, 
        codeSnippets, 
        refrenceSolution} = req.body

    if(req.user.role !== "ADMIN"){
        return res.status(401).json({
            message:"You are not authorized"
        })
    }

    
    try {
        for (const [language, solutionCode] of Object.entries(refrenceSolution)) {
          const languageId = getJudge0LanguageId(language);
            
          if (!languageId) {
            return res
              .status(400)
              .json({ error: `Language ${language} is not supported` });
          }
    
          //
          const submissions = testcases.map(({ input, output }) => ({
            source_code: solutionCode,
            language_id: languageId,
            stdin: input,
            expected_output: output,
          }));
    
          const submissionResults = await submitBatch(submissions);
    
          const tokens = submissionResults.map((res) => res.token);
    
          const results = await pollBatchResults(tokens);
    
          for (let i = 0; i < results.length; i++) {
            const result = results[i];
            console.log("Result-----" , result)
            // console.log(
            //   `Testcase ${i + 1} and Language ${language} ----- result ${JSON.stringify(result.status.description)}`
            // );
            if (result.status.id !== 3) {
              return res.status(400).json({
                error: `Testcase ${i + 1} failed for language ${language}`,
              });
            }
          }
        }
                
        const newProblem = await db.problem.create({
          data: {
            title,
            description,
            difficulty,
            tags,
            examples,
            constraints,
            testcases,
            codeSnippets,
            refrenceSolution,
            userId: req.user.id,
          },
        });
    
        return res.status(201).json({
          sucess:true,
          message:"Message Created Successfully",
          problem:newProblem
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          error: "Error While Creating Problem",
        });
      }

}

export const getAllProblems = async (req, res) => {
    try {
        const problems = await db.problem.findMany();

        if(!problems){
            return res.status(404).json({
                error: "No problem Found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Messgae feteched successfully",
            problems
        })
    } catch (error) {
        return res.status(404).json({
            message: "something went wrong while fetching problems"
        })
    }
}

export const getProblemId = async (req, res) => {
    const {id} = req.params
    try {
        const problem = await db.problem.findUnique({
            where:{
                id
            }
        })
        if(!problem){
            return res.status(400).json({
                message:"problem not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "problem fetched",
            problem
        })
    } catch (error) {
        return res.status(500).json({
            message:"kuch bhi...."
        })
    }
}

export const updateProblem = async (req, res) => {
  //id
  //check
  //same as create
  const {problemId} = req.params;
  
  if(req.user.role !== "ADMIN"){
    return res.status(401).json({
        message:"You are not authorized"
    })
  }

  const {title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    refrenceSolution } = req.body

  try {

    for (const [language, solutionCode] of Object.entries(refrenceSolution)) {
      const languageId = getJudge0LanguageId(language);
        
      if (!languageId) {
        return res
          .status(400)
          .json({ error: `Language ${language} is not supported` });
      }

      //
      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("Result-----" , result)
        // console.log(
        //   `Testcase ${i + 1} and Language ${language} ----- result ${JSON.stringify(result.status.description)}`
        // );
        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }
    }

    const updatedProblem = await db.problem.update({
      where:{
        problemId
      },
      data:{
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        refrenceSolution
      }
    })

    return res.status(201).json({
      sucess:true,
      message:"Message updated Successfully",
      problem:updatedProblem
    });
    
  } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Error While Creating Problem",
      });
  }
}

export const deleteProblem = async (req, res) => {
  const {problemId} = req.params

  try {
    const problem = await db.problem.findUnique({
        where: {
          problemId
        }
    })
    if(!problem){
        return res.status(400).json({
            message:"problem not found"
        })
    }

    await db.problem.delete({
        where:{
          problemId
        }
    })
    return res.status(200).json({
        success: true,
        message: "problem deleted successfully",
    })
  } catch (error) {
    return res.status(500).json({
        message:"kuch bhi delete kro ge kya, Had ha...."
    })
  }
}

export const getAllProblemSolvedByUser = async (req, res) => {
  try {
    const problems = await db.user.findMany({
      where:{
        ProblemSolved:{
          some:{
            userId: req.user.id
          }
        }
      },
      include:{
        ProblemSolved:{
          where:{
            userId: req.user.id
          }
        }
      }
    })

    res.status(200).jsos({
      success: true,
      message: "Problem fetched successfully",
      problems
    })
  } catch (error) {
    console.error("Error fetching problems: ", error);
    res.status(500).json({
      message: "Error fetching problems"
    })
  }
}