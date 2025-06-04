import React from "react";
import { useProblemStore } from "../Store/useProblemStore";
import Editor from "@monaco-editor/react";

const SolutionSection = ({language}) => {
  const { problem } = useProblemStore();
  const refrenceSolution = problem?.refrenceSolution
    
  
  return (
      <div>
        <div>
            <h1 className="text-2xl font-bold">Solution:</h1>
            <Editor
              className="bg-[#1E1E1E] rounded-xl p-2 "
              height={"50vh"}
              language={language.toLowerCase()}
              theme="vs-dark"
              value={refrenceSolution[`${language}`]}
              options={{
                minimap: { enabled: false },
                readOnly: true,
                fontSize: 12
              }}
            />
        </div>
    </div>
  );
};

export default SolutionSection;
