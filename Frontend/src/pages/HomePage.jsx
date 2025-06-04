import React, { useEffect, useMemo, useState } from "react";
import { useProblemStore } from "../Store/useProblemStore";
import { Link } from "react-router-dom";

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
    <section className="bg-[#05001C] h-[100vh] flex pt-17 justify-between px-2 gap-2">
      <div className="bg-[#1d1d1d] h-[92vh] w-[20vw] rounded-2xl">
        {/* play list */}
        {/* recent visit */}
      </div>
      <div className="bg-[#111111] h-[92vh] w-[60vw] rounded-2xl p-2">
        {/* question list */}
        <div className="flex p-5 justify-between text-xl text-white">
          <div className="bg-[linear-gradient(140deg,#FFD000,#BE6C00)] h-30 w-80 rounded-[8px] flex flex-col justify-center items-center">
            30 Days DSA<div className="font-bold" > CHALLANGE </div>question package
          </div>
          <div className="bg-[linear-gradient(140deg,#95FF00,#009A0F)] h-30 w-80 rounded-[8px] flex flex-col justify-center items-center">
            100 Days DSA <div className="font-bold" >CHALLANGE</div> question package
          </div>
          <div className="bg-[linear-gradient(140deg,#FF0000,#6B0000)] h-30 w-80 rounded-[8px] flex flex-col justify-center items-center">
            <div className="font-bold" >Company</div > Specific questions
          </div>
        </div>

        {/* filteration */}
        <div className="flex justify-between  px-5 text-gray-300">
          <input
            className="bg-[#5B5B5B] w-80 h-10 rounded-xl p-5 "
            type="text"
            placeholder="Problem Name"
            value={problemName}
            onChange={(e) => setProblemName(e.target.value)}
          />
          <select
            className="bg-[#5B5B5B] w-80 h-10 rounded-xl px-5"
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
            className="bg-[#5B5B5B] w-80 h-10 rounded-xl px-5"
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
                <Link to={`/problem/${problem.id}`} 
                className={`${
                  index % 2 === 0 ? "bg-[#555151]" : "bg-[#272727]"
                } px-8 h-14 rounded-xl grid grid-cols-4 items-center text-xl m-4`}
              >
                <div className="flex gap-2">
                  <input type="checkbox" readOnly={true} />
                  <p className="font-bold text-white">{problem.title}</p>
                </div>
                <div className="flex text-[10px] gap-5 ">
                  {/* {
                  problem.tags.map((tag, index)=>(
                    <p className="bg-yellow-500 text-cyan-700 flex items-center px-5 rounded-4xl">{tag}</p>
                  ))
                } */}
                </div>
                <div className="flex justify-end text-[10px]">
                  <div className={`${problem.difficulty==="EASY"?"bg-emerald-400 drop-shadow-[0px_0px_5px_#00D492] ":problem.difficulty==="MEDIUM"?"bg-cyan-500 drop-shadow-[0px_0px_5px_#00BCD4] ":"bg-red-500 drop-shadow-[0px_0px_5px_#f56565] " } text-white  px-3 rounded-2xl`}>
                    {problem.difficulty}
                  </div>
                </div>
                <div className="flex gap-3  justify-end">
                  <button className="bg-blue-700 w-14 h-10 rounded-xl">
                    u
                  </button>
                  <button className="bg-blue-700 w-14 h-10 rounded-xl">
                    p
                  </button>
                </div>
              </Link>
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
      <div className="flex flex-col gap-2">
        <div className="bg-[#282828] h-[37vh] w-[20vw] rounded-2xl">
          {/* Calander */}
        </div>
        <div className="bg-[#282828] h-[54vh] w-[20vw] rounded-2xl">
          {/* todays question */}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
