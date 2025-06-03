import React, { useEffect, useMemo, useState } from "react";
import { useProblemStore } from "../Store/useProblemStore";

const HomePage = () => {
  const { problems, isProblemsLoading, getAllProblems } = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  const [problemName, setProblemName] = useState("");
  const [tagName, setTagName] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  const difficulties = ["EASY", "MEDIUM", "HARD"];

  const filteredProblem = useMemo(() => {
    return (problems || [])
      .filter((problem) =>
        problem.title.toLowerCase().includes(problemName.toLowerCase())
      )
      .filter((problem) =>
        tagName === "All" ? true : problem.tags.includes(tagName)
      )
      .filter((problem) =>
        difficulty === "All" ? true : problem.difficulty === difficulty
      );
  });

  return (
    <section className="bg-gray-900 h-[100vh] flex pt-20 justify-between px-8 gap-6">
      <div className="bg-gray-300 h-[89vh] w-[20vw] rounded-2xl">
        {/* play list */}
        {/* recent visit */}
      </div>
      <div className="bg-gray-300 h-[89vh] w-[60vw] rounded-2xl p-2">
        {/* question list */}

        {/* filteration */}
        <div className="flex justify-between  px-5">
          <input
            className="bg-gray-400 w-80 h-10 rounded-xl p-5 "
            type="text"
            placeholder="Problem Name"
            value={problemName}
            onChange={(e) => setProblemName(e.target.value)}
          />
          <select
            className="bg-gray-400 w-80 h-10 rounded-xl px-5"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="All">All </option>
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          <select
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            className="bg-gray-400 w-80 h-10 rounded-xl px-5"
          >
            <option value="All">All</option>
            {problems.map((problem) =>
              problem.tags.map((tag) => (
                <option className="rounded-3xl" value={tag}>
                  {tag}
                </option>
              ))
            )}
          </select>
        </div>
        <div>
          {!isProblemsLoading ? (
            
            filteredProblem.length !== 0?( 
              filteredProblem.map((problem, index) => (
                <div
                className={`${
                  index % 2 === 0 ? "bg-gray-500" : "bg-gray-400"
                } px-8 h-14 rounded-xl flex items-center justify-between text-xl m-4`}
              >
                <div className="flex gap-2">
                  <input type="checkbox" readOnly={true} />
                  <p>{problem.title}</p>
                </div>
                <div className="flex gap-3">
                  <button className="bg-blue-700 w-14 h-10 rounded-xl">
                    u
                  </button>
                  <button className="bg-blue-700 w-14 h-10 rounded-xl">
                    p
                  </button>
                </div>
              </div>
            ))
            ):(
              <div className="text-3xl text-gray-500 h-50 flex items-center justify-center ">No Problem Found</div>
            )
          ) : (
            <div className="text-3xl text-gray-500 h-50 flex items-center justify-center ">
              Problem loading...
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="bg-gray-300 h-[35vh] w-[20vw] rounded-2xl">
          {/* Calander */}
        </div>
        <div className="bg-gray-300 h-[51vh] w-[20vw] rounded-2xl">
          {/* todays question */}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
