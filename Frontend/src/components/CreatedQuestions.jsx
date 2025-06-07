import React from "react";
import { useForm } from "react-hook-form";
import { useProblemStore } from "../Store/useProblemStore";


const CreatedQuestions = () => {

  const {problemsCreatedByme, isproblemsCreatedBymeLoading, getAllProblemsCreatedByMe} = useProblemStore()

   return (
    <div className="bg-black h-[100vh] text-white pt-20 px-5">
      
    </div>
  );
};

export default CreatedQuestions;
