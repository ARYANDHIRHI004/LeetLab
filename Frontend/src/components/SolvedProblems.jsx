import React, { useEffect, useState } from "react";
import { useProblemStore } from "../Store/useProblemStore";
import { Link } from "react-router-dom";
import { useSubmisions } from "../Store/useSubmissions";

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
    <div className="bg-[#03030e] h-[100vh] pt-22 p-50 text-white">
      <div className="">
        {!isSolvedProblemLoading
          ? solvedProblem?.map((problem) =>
              !toggle ? (
                <div className="bg-gray-500 rounded-xl p-5  h-20  overflow-scroll">
                <div className="flex fixed bg-gray-700 rounded-2xl">
                    <button
                      onClick={() => handleToggle(problem.id)}
                      className="w-10 h-10 flex items-center justify-center "
                    >
                      d
                    </button>
                    <Link className="bg-gray-700 w-[76vw] h-10 flex items-center rounded-2xl text-xl " to={`/problem/${problem.id}`}>
                      <p>{problem.title}</p>
                    </Link>
                  </div>
                  </div>
              ) : (
                <div className="bg-gray-500 rounded-xl p-5  h-80  overflow-scroll">
                  <div className="flex fixed bg-gray-700 rounded-2xl">
                    <button
                      onClick={() => handleToggle(problem.id)}
                      className="w-10 h-10 flex items-center justify-center "
                    >
                      d
                    </button>
                    <Link className="bg-gray-700 w-[76vw] h-10 flex items-center rounded-2xl text-xl " to={`/problem/${problem.id}`}>
                      <p>{problem.title}</p>
                    </Link>
                  </div>
                  <div className="p-3 text-white mt-10 flex flex-col gap-5  ">
                    {submissions?.map((submission, i) => (
                      <div className="bg-gray-700 rounded-2xl p-6">
                        <p className="mb-2">Submission {i + 1}</p>
                        {submission.testCases.map((testCase, i) => (
                          <div className="mb-2">
                            <p>Test Case {i + 1}</p>
                            <div className="flex justify-between bg-gray-600 mt-2 p-2 rounded-2xl">
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
