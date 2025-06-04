import React, { useEffect, useState } from "react";
import { useProblemStore } from "../Store/useProblemStore";
import { useAuthStore } from "../Store/useAuthStore";
import { useParams } from "react-router-dom";
import { House, Database, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { useExecution } from "../Store/useExecution";
import { getLanguageId, NavComponents, problemSectionNavTab } from "../lib/utils";


const ProblemPage = () => {
  const { id } = useParams();
  const { getProblemId, problem, isProblemLoading } = useProblemStore();
  const { submission, executeCode, isExecuting } = useExecution()

  useEffect(() => {
    getProblemId(id);
  }, [getProblemId]);

  const [rightWidth, setRightWidth] = useState("50vw");
  const [leftWidth, setLeftWidth] = useState("50vw");
  const [upHight, setUpHight] = useState("60vw");
  const [bottomHight, setBottomHight] = useState("40vw");
  const [language, setLanguage] = useState("JAVASCRIPT");
  const [codeSnippit, setCodeSnippit] = useState("");
  const [code, setCode] = useState("");
  const [activeNavTab, setActiveNavTab] = useState(1);

  useEffect(() => {
    switch (language) {
      case "JAVA":
        setCodeSnippit(`${problem?.codeSnippets?.JAVA}`);
        break;
      case "PYTHON":
        setCodeSnippit(problem?.codeSnippets?.PYTHON);
        break;
      case "JAVASCRIPT":
        setCodeSnippit(problem?.codeSnippets?.JAVASCRIPT);
        break;

      default:
        break;
    }
  }, [language, setLanguage]);

  const horizontalMouseDown = () => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const verticalMouseDown = () => {
    document.addEventListener("mousemove", verticalHandleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const RightPaneWidth = window.innerWidth - e.clientX;
    setRightWidth(`${RightPaneWidth}px`);
    setLeftWidth(`${window.innerWidth - RightPaneWidth}px`);
  };

  const verticalHandleMouseMove = (e) => {
    const upPaneHight = window.innerHeight - e.clientY;
    setBottomHight(`${upPaneHight}px`);
    setUpHight(`${window.innerHeight - upPaneHight}px`);
  };

  const handleMouseUp = (e) => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mousemove", verticalHandleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  
  const runCode = () => {
    executeCode({code })
  }

  if (isProblemLoading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <Database color="#3000cf" size={"50px"} className="animate-bounce" />
      </div>
    );
  }

  return (
    <div className=" flex bg-[#111111] h-[100vh] justify-center gap-1.5 box w-[100%] p-2">
      <div style={{ width: leftWidth }} className="bg-[#1D1D1D] rounded-xl p-4 overflow-scroll">
        {/* question details */}
        <div className="text-2xl font-black text-[#8EC5FF] flex items-center gap-2">
          <Link to={"/"}>
            <House color="#8EC5FF" size={22} />
          </Link>
          {problem?.title}
        </div>
        <div className="text-[#9fb2be] flex gap-5 px-10 pt-5 text-[13px] flex-wrap">
          {
            problemSectionNavTab.map((NavTabs) => (
              <p 
                key={NavTabs.id}
                onClick={()=>setActiveNavTab(NavTabs.id)}
                className={`${NavTabs.id === activeNavTab? "text-[#43b5fc]":null} hover:text-[#43b5fc]`}
              >
                  {NavTabs?.label}
              </p>
            ))
          }
        </div>
        <div className="px-10 mt-5 text-white">
          {
            NavComponents.map((component)=>(
              component.id === activeNavTab?(
                <component.component/>
              ):""
            ))
          }
        </div>
      </div>

      <div
        onMouseDown={horizontalMouseDown}
        className="bg-[#1D1D1D] w-1 rounded-2xl hover:cursor-e-resize hover:bg-blue-800 flex items-center justify-center"
      >
        <div className="bg-white w-full h-8 rounded-2xl flex flex-col items-center justify-between p-[3px]">
          <div className="bg-black h-[4px] w-[4px] rounded-full"></div>
          <div className="bg-black h-[4px] w-[4px] rounded-full"></div>
          <div className="bg-black h-[4px] w-[4px] rounded-full"></div>
        </div>
      </div>
      <div style={{ width: rightWidth }} className="flex flex-col gap-1">
        <div className="bg-[#1D1D1D] rounded-xl p-3 flex text-white justify-between">
          <select
            className="bg-[#1D1D1D] h-8 rounded-xl border-0"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="JAVASCRIPT">JAVASCRIPT</option>
            <option value="JAVA">JAVA</option>
            <option value="PYTHON">PYTHON</option>
          </select>
          <div className="flex gap-6 text-[13px] mx-10">

            <button onClick={runCode} className="bg-[#3d7ef7] border-2 border-blue-800 w-25 rounded-full hover:bg-[#3da3f7] hover:drop-shadow-[0px_0px_10px_#4bb7ff] hover:scale-110 cursor-pointer transition-all">
              {
                isExecuting?(
                    <Loader className="size-6 animate-spin" />
                ):("Run")
              }
            </button>

            <button className="bg-green-600 w-25 rounded-full hover:bg-green-500 hover:drop-shadow-[0px_0px_10px_#00ff08] hover:scale-110 cursor-pointer transition-all">Submit</button>

          </div>
        </div>
        <div
          style={{ height: upHight }}
          className="bg-[#1D1D1D] h-[60vh] rounded-xl p-4 "
        >
          {/* code editor */}

          <div className="h-full ">
            <Editor
              className="bg-[#1E1E1E] rounded-xl p-2 "
              language={language.toLowerCase()}
              theme="vs-dark"
              defaultValue={problem?.codeSnippets?.JAVASCRIPT}
              value={codeSnippit}
              options={{minimap: { enabled: false }}}
               onChange={(value) => setCode(value || '')}
            />
          </div>
        </div>
        <div
          onMouseDown={verticalMouseDown}
          className="bg-[#1D1D1D] h-1 rounded-2xl hover:cursor-s-resize hover:bg-blue-800 flex items-center justify-center"
        >
          <div className="bg-white w-8 h-full rounded-2xl flex items-center justify-between p-[3px]">
            <div className="bg-black h-[4px] w-[4px] rounded-full"></div>
            <div className="bg-black h-[4px] w-[4px] rounded-full"></div>
            <div className="bg-black h-[4px] w-[4px] rounded-full"></div>
          </div>
        </div>
        <div
          style={{ height: bottomHight }}
          className="bg-[#1D1D1D] h-[40vh] rounded-xl p-4"
        >
          {/* test cases */}
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
