import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useProblemStore } from "../Store/useProblemStore";
import { Link } from "react-router-dom";


const CreatedQuestions = () => {

  const {problemsCreatedByme, isproblemsCreatedBymeLoading, getAllProblemsCreatedByMe} = useProblemStore()

  useEffect(() => {
    getAllProblemsCreatedByMe()
  },[getAllProblemsCreatedByMe])


   return (
    <div className="bg-black h-[100vh] text-white pt-20 px-5">
      <h1 className="text-center text-[18px] mt-5">Created Questions</h1>
      {
        !isproblemsCreatedBymeLoading?(
          <div className="px-10 mt-2 flex flex-col items-center">

            {
              problemsCreatedByme.map((problem)=>(
                <div className="bg-gray-600 p-3 mb-5 rounded-[5px] w-[80vw]">
                  <Link to={`/problem/${problem.id}`}>
                      <h1 className="text-[15px] ">{problem.title}</h1>
                  </Link>
                </div>
              ))
            }
          </div>
        ):("loading...")
      }
    </div>
  );
};

export default CreatedQuestions;
