import React, { useEffect, useState } from "react";
import { useProblemStore } from "../Store/useProblemStore";
import { useAuthStore } from "../Store/useAuthStore";
import { useParams } from "react-router-dom";
import { House, Database } from 'lucide-react';
import { Link } from "react-router-dom";

const ProblemPage = () => {
  const { id } = useParams();

  const [rightWidth, setRightWidth] = useState("50vw");
  const [leftWidth, setLeftWidth] = useState("50vw");
  const [upHight, setUpHight] = useState("50vw");
  const [bottomHight, setBottomHight] = useState("50vw");


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

  const {getProblemId, problem, isProblemLoading} = useProblemStore()

  useEffect(() => {
    getProblemId(id)
  }, [getProblemId])
  
  if(isProblemLoading){
  return (
    <div className="h-[100vh] flex justify-center items-center">
        <Database color="#3000cf" size={"50px"} className="animate-bounce" />
    </div>
  )}


  return (
    <div className=" flex bg-[#111142] h-[100vh] justify-center gap-1.5 box w-[100%] p-2">
      <div
        style={{ width: leftWidth }}
        className={`bg-[#05001C] rounded-xl p-4`}
      >
        <div className="text-2xl font-black text-[#8EC5FF] flex items-center gap-2">
            <Link to={"/"}>
              <House  color="#8EC5FF" size={22} />
            </Link>
            {problem?.title}
        </div>
      </div>
      <div
        onMouseDown={horizontalMouseDown}
        className="bg-[#201e91] w-2 rounded-2xl hover:cursor-e-resize hover:bg-blue-800 flex items-center justify-center"
      >
        <div className="bg-white w-full h-10 rounded-2xl flex flex-col items-center justify-between p-[4px]">
          <div className="bg-black h-[5px] w-[5px] rounded-full" ></div>
          <div className="bg-black h-[5px] w-[5px] rounded-full" ></div>
          <div className="bg-black h-[5px] w-[5px] rounded-full" ></div>
        </div>
      </div>
      <div style={{ width: rightWidth }} className="flex flex-col gap-1.5">
        <div
          style={{ height: upHight }}
          className="bg-[#05001C] h-[60vh] rounded-xl p-4"
        >
          Up
        </div>
        <div
          onMouseDown={verticalMouseDown}
          className="bg-blue-900 h-1.5 rounded-2xl hover:cursor-s-resize hover:bg-blue-800 flex items-center justify-center"
        >
          <div className="bg-white w-10 h-full rounded-2xl flex items-center justify-between p-[4px]">
          <div className="bg-black h-[5px] w-[5px] rounded-full" ></div>
          <div className="bg-black h-[5px] w-[5px] rounded-full" ></div>
          <div className="bg-black h-[5px] w-[5px] rounded-full" ></div>
        </div>
        </div>
        <div
          style={{ height: bottomHight }}
          className="bg-[#05001C] h-[40vh] rounded-xl p-4"
        >
          Bottom
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
