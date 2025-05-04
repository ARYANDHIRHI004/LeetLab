import { db } from "../libs/db.js";
import {
  pollBatchResults,
  submitBatch,
  getLanguageName,
} from "../libs/judge0.lib.js";

export const executeCode = async (req, res) => {
  try {
    const { source_code, language_id, stdin, expected_output, problemId } =
      req.body;
    const userId = req.user.id;

    // Valid test cases

    if (
      !Array.isArray(stdin) ||
      stdin.length === 0 ||
      !Array.isArray(expected_output) ||
      expected_output.length !== stdin.length
    ) {
      return res.status(400).json({
        error: "Invalid or missing test cases",
      });
    }

    // Prepare each test cases for judge0 batch submission
    const submissions = stdin.map((input) => ({
      source_code,
      language_id,
      stdin: input,
    }));

    const submiteResponse = await submitBatch(submissions);

    const tokens = submiteResponse.map((res) => res.token);

    const results = await pollBatchResults(tokens);

    // Analyse Testcase result
    let allPassed = true;
    const detailedResult = results.map((result, i) => {
      const stdout = result.stdout.trim();
      const output = expected_output[i]?.trim();
      const passed = stdout === output;

      if (!passed) allPassed = false;

      return {
        testcase:i+1,
        passed,
        stdout,
        expected: expected_output,
        stderr: result.stderr || null,
        compile_output: result.compile_output || null,
        status: result.status.desciption,
        memory: result.memory ? `${result.memory} KB`:undefined,
        time: result.time ? `${result.time} s`:undefined,
      }
    });
    const submission = await db.submission.create({
        data:{
            userId,
            problemId,
            sourceCode: source_code,
            language:getLanguageName(language_id),
            stdin: stdin.join("\n"),
            stdout:JSON.stringify(detailedResult.map((r)=>r.stdout)),
            stderr:detailedResult.some((r)=>r.stderr)? JSON.stringify(detailedResult.map((r)=>r.stderr)): null,
            compileOutput: detailedResult.some((r)=>r.compile_output)? JSON.stringify(detailedResult.map((r)=>r.compile_output)):null,
            status: allPassed ? "Accepted": "Wrong Answer",
            memory: detailedResult.some((r)=>r.memory)? JSON.stringify(detailedResult.map((r)=>r.memory)):null,
            time: detailedResult.some((r)=>r.time)? JSON.stringify(detailedResult.map((r)=>r.time)):null,

        }
    })

    // If allPassed == true thenmarked problem as solved for the current user
    if(allPassed){
        await db.problemSolved.upsert({
            where:{
                userId_problemId: {
                    userId, problemId
                } 
            },
            update:{},
            create:{
                userId, problemId
            }
        })
    }

    res.status(200).json({
      message: "Code executed!!!",
    });
  } catch (error) {}
};
