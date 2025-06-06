import React, { useEffect } from "react";
import { useActions } from "../Store/useActions";
import { usePlaylist } from "../Store/usePlaylist";

const QuestionSectionDashBoard = () => {
  const { Events, EventSet } = useActions();
  const { playlist, isPlaylistLoading, getPlaylistById } = usePlaylist();

  useEffect(() => {
    getPlaylistById(Events);
  }, [getPlaylistById, EventSet]);

  return (
    <div>
        {
            !isPlaylistLoading? 
                playlist?.problems.map((problem) => (

                    <div className=" bg-[#2b2b2b] p-3 rounded-[5px]">
                        <p>{problem.problems.title}</p>
                    </div>

                )):("Loading")
        }
    </div>
  );
};

export default QuestionSectionDashBoard;
