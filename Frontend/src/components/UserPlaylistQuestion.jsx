import React, { useEffect } from "react";
import { usePlaylist } from "../Store/usePlaylist";
import { useParams } from "react-router-dom";
import { useActions } from "../Store/useActions";
import { Link } from "react-router-dom";
import { Loader, Trash2 } from "lucide-react";

const UserPlaylistQuestion = () => {
  const {
    getPlaylistById,
    playlist,
    isPlaylistLoading,
    isdeletingProblem,
    removeProblemsFromPlaylist,
  } = usePlaylist();
  const { playlistId } = useParams();

  useEffect(() => {
    getPlaylistById(playlistId);
  }, [getPlaylistById]);

  const deleteQuestionFromPlylist = (problemId) => {
    removeProblemsFromPlaylist(playlistId, problemId);
  };

  return (
    <div className="bg-[#050505] h-[100vh] pt-30 text-white px-50 max-sm:px-5 overflow-auto pb-8">
      <div className=" h-[50px]">
        {!isPlaylistLoading ? (
          <div>
            <h1 className="text-center mb-2 text-[15px]">
              Playlist: {playlist?.name}
            </h1>

            <div className="flex flex-col gap-5">
              {playlist?.problems.map((problem) => (
                <div
                  className="bg-[#0f0f0f] p-3 rounded-[5px] flex justify-between px-10 flex-wrap
                  "
                >
                  <Link to={`/problem/${problem.problems.id}`}>
                    <h2 className="text-[16px] max-sm:text-[12px]">
                      {problem.problems.title}
                    </h2>
                  </Link>
                  <div className="flex gap-8">
                    <h2
                      className={`${
                        problem.problems.difficulty === "EASY"
                          ? "bg-emerald-400 drop-shadow-[0px_0px_5px_#00D492] "
                          : problem.problems.difficulty === "MEDIUM"
                          ? "bg-cyan-500 drop-shadow-[0px_0px_5px_#00BCD4] "
                          : "bg-red-500 drop-shadow-[0px_0px_5px_#f56565] "
                      } text-white  px-3 rounded-full h-7 flex items-center max-sm:text-[10px]`}
                    >
                      {problem.problems.difficulty}
                    </h2>
                    <button
                      onClick={() =>
                        deleteQuestionFromPlylist(problem.problems.id)
                      }
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-[70vh] gap-2">
            <Loader size={40} className=" animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPlaylistQuestion;
