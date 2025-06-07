import React, { useEffect } from "react";
import { useActions } from "../Store/useActions";
import { usePlaylist } from "../Store/usePlaylist";
import { Link } from "react-router-dom";

const QuestionSectionDashBoard = () => {
  const { Events, EventSet } = useActions();
  const { playlist, isPlaylistLoading, getPlaylistById } = usePlaylist();


  return (
    <div>
      {!isPlaylistLoading
        ? playlist?.problems.map((problem) => (
            <Link to={`/problem/${problem.problems.id}`}>
              <div className=" bg-[#2b2b2b] p-3 rounded-[5px] mb-3">
                <p>{problem.problems.title}</p>
              </div>
            </Link>
          ))
        : "Loading"}
    </div>
  );
};

export default QuestionSectionDashBoard;
