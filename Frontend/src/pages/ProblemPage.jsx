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
        <Database color="#364153" size={"50px"} className="animate-bounce" />
    </div>
  )}


  return (
    <div className=" flex bg-black h-[100vh] justify-center gap-1.5 box w-[100%] p-2">
      <div
        style={{ width: leftWidth }}
        className={`bg-gray-700 rounded-xl p-4`}
      >
        <div className="text-2xl font-black text-white flex gap-2">
            <Link to={"/"}>
              <House  color="white" />
            </Link>
            {problem.title}
        </div>
      </div>
      <div
        onMouseDown={horizontalMouseDown}
        className="bg-gray-800 w-2 rounded-2xl hover:cursor-e-resize"
      ></div>
      <div style={{ width: rightWidth }} className="flex flex-col gap-1.5">
        <div
          style={{ height: upHight }}
          className="bg-gray-300 h-[60vh] rounded-xl p-4"
        >
          Up
        </div>
        <div
          onMouseDown={verticalMouseDown}
          className="bg-gray-300 h-1.5 rounded-2xl hover:cursor-s-resize"
        ></div>
        <div
          style={{ height: bottomHight }}
          className="bg-gray-300 h-[40vh] rounded-xl p-4"
        >
          Bottom
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
