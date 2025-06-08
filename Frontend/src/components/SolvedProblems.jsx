import React, { useEffect, useState } from "react";
import { useProblemStore } from "../Store/useProblemStore";
import { Link } from "react-router-dom";
import { useSubmisions } from "../Store/useSubmissions";
import { ChevronDown, ChevronUp } from "lucide-react";

const SolvedProblems = () => {
  const { getSolvedProblemByUser, isSolvedProblemLoading, solvedProblem } =
    useProblemStore();

  const { submissions, submissionRequest } = useSubmisions();

  const [hight, setHeight] = useState();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    getSolvedProblemByUser();
  }, [getSolvedProblemByUser, submissionRequest]);

  const handleToggle = (id) => {
    setToggle(!toggle);
    submissionRequest(id);
  };

  return (
    <div className="bg-[#050505] h-[100vh] pt-22 flex flex-col items-center text-white overflow-auto">
      <div className="">
        <h1 className="text-center text-4xl mt-5 mb-5">My Solved Problems</h1>
        {!isSolvedProblemLoading
          ? solvedProblem?.map((problem) =>
              !toggle ? (
                <div className="bg-[#050505] rounded-xl  h-20 w-[80vw] mb-5  overflow-scroll">
                <div className="flex fixed bg-[#111111] w-[80vw] items-center h-20 rounded-xl">
                    <button
                      onClick={() => handleToggle(problem.id)}
                      className="w-20 h-10 flex items-center justify-center "
                    >
                     <ChevronDown />
                    </button>
                    <Link to={`/problem/${problem.id}`}>
                      <p className="text-[18px] ">{problem.title}</p>
                    </Link>
                  </div>
                  </div>
              ) : (
                <div className="bg-[#111111] rounded-xl h-90 w-[80vw] mb-5 overflow-scroll">
                  <div className="flex fixed bg-[#111111]  items-center w-[80vw] h-20 rounded-t-xl">
                    <button
                      onClick={() => handleToggle(problem.id)}
                      className="w-20 h-10 flex items-center justify-center "
                    >
                      <ChevronUp />
                    </button>
                    <Link className="text-[18px] " to={`/problem/${problem.id}`}>
                      <p>{problem.title}</p>
                    </Link>
                  </div>
                  <div className=" text-white mt-20 flex flex-col gap-5  ">
                    {submissions?.map((submission, i) => (
                      <div className="bg-[#111111] p-6">
                        <p className="mb-2 text-2xl">Submission {i + 1}</p>
                        {submission.testCases.map((testCase, i) => (
                          <div className="mb-2">
                            <p>Test Case {i + 1}</p>
                            <div className="flex justify-between bg-[#242424] mt-2 p-2 rounded-2xl">
                              <p>{testCase.status}</p>
                              <p>{testCase.memory}</p>
                              <p>{testCase.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )
            )
          : ""}
      </div>
    </div>
  );
};

export default SolvedProblems;
