import React, { useState } from "react";
import { useProblemStore } from "../Store/useProblemStore";
import { useExecution } from "../Store/useExecution";
import { useActions } from "../Store/useActions";
import { useSubmisions } from "../Store/useSubmissions";
import { Loader } from "lucide-react";

const TestCasesSection = () => {
  const { problem } = useProblemStore();
  const { runResult, isRunning } = useExecution();
  const {
    testCaseResultNavTabActive,
    changetestCaseResultNavtabActive,
    runbtnState,
  } = useActions();
  const { submissions, isLoading } = useSubmisions();

  return (
    <div>
      <div className="flex gap-5 bg-[#4a5566] p-3 rounded-t-2xl text-[#9aa7b4] fixed w-[49.3vw]">
        <button
          className={`${
            testCaseResultNavTabActive === 1
              ? "text-[#3995f7] underline underline-offset-3"
              : ""
          }`}
          onClick={() => changetestCaseResultNavtabActive(1)}
        >
          Test Cases
        </button>
        <button
          className={`${
            testCaseResultNavTabActive === 2
              ? "text-[#3995f7] underline underline-offset-3"
              : ""
          }`}
          onClick={() => changetestCaseResultNavtabActive(2)}
        >
          Results
        </button>
      </div>
      <div className="p-3 text-white flex flex-col gap-5 pt-15 ">
        {testCaseResultNavTabActive === 1 ? (
          problem?.testcases.map((testcase) => (
            <div className="flex flex-col gap-4 bg-[#4d4d4d] p-3 rounded-2xl ">
              <div>
                <p className="mb-1">Input</p>
                <p className="bg-[#222222] p-2 h-10 rounded-[5px]">
                  {testcase.input}
                </p>
              </div>
              <div>
                <p className="mb-1">Output</p>
                <p className="bg-[#222222] p-2 h-10 rounded-[5px]">
                  {testcase.output}
                </p>
              </div>
            </div>
          ))
        ) : runbtnState ? (
          !isRunning ? (
            <div>
              <p
                className={`text-[15px] font-bold ${
                  runResult?.status === "Accepted"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {runResult?.status}
              </p>
              <div className="flex flex-col gap-5">
                {runResult?.testCaseResults?.map((result, i) => (
                  <div>
                    <div>
                      <div className="bg-[#363636] p-2 rounded-[5px] ">
                        <p className="flex gap-5">
                          Test Case {result.testCase}
                          <p
                            className={`${
                              result.status === "Accepted"
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {result.status}
                          </p>
                        </p>
                        <div className="flex justify-between pt-2 flex-wrap ">
                          <p>Expected Output: {result.expected}</p>
                          <p>Output: {result.stdout}</p>
                          <p>Memory: {result.memory}</p>
                          <p>Time: {result.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className=" flex justify-center items-center h-60">
              <Loader className="size-10 animate-spin" />
            </div>
          )
        ) : submissions.length !== 0 ? (
          !isLoading ? (
            <div>
              <p
                className={`text-[15px] font-bold ${
                  submissions[submissions.length - 1]?.status === "Accepted"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {submissions[submissions.length - 1]?.status}
              </p>
              <div className="flex flex-col gap-5">
                {submissions[submissions.length - 1]?.testCases?.map(
                  (result, i) => (
                    <div>
                      <div>
                        <div className="bg-[#363636] p-2 rounded-[5px] ">
                          <p className="flex gap-5">
                            Test Case {result.testCase}
                            <p
                              className={`${
                                result.status === "Accepted"
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {result.status}
                            </p>
                          </p>
                          <div className="flex justify-between pt-2 flex-wrap ">
                            <p>Expected Output: {result.expected}</p>
                            <p>Output: {result.stdout}</p>
                            <p>Memory: {result.memory}</p>
                            <p>Time: {result.time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ) : (
            <div className=" flex justify-center items-center h-60">
              <Loader className="size-10 animate-spin" />
            </div>
          )
        ) : (
          <div>No submissions</div>
        )}
      </div>
    </div>
  );
};

export default TestCasesSection;
