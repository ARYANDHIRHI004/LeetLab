import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePlaylist } from "../Store/usePlaylist";
import { useActions } from "../Store/useActions";
import { useProblemStore } from "../Store/useProblemStore";

const AddQuestionsToPlayListForm = () => {
  const { handleSubmit, register } = useForm();
  const {
    playlists,
    isPlaylistsLoading,
    createPlaylist,
    addProblemsInPlaylist,
  } = usePlaylist();
  const { selectWhichQustion, setselectWhichQustion } = useActions();

  const { getAllProblems, problems, isProblemsLoading , problemsCreatedByme, isproblemsCreatedBymeLoading, getAllProblemsCreatedByMe} = useProblemStore();

  const [selectPlayList, setSelectPlaylist] = useState("");

  const addQuestions = (data) => {
    addProblemsInPlaylist({ problemIds: data.id }, selectPlayList);
  };

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  useEffect(() => {
    getAllProblemsCreatedByMe();
  }, [getAllProblemsCreatedByMe]);

  return (
    <div>
      <form action={handleSubmit(addQuestions)}>
        <div className="flex justify-between">
          <button className="bg-black p-3 mb-3" type="submit">
            Add Questions
          </button>
          <div className="flex gap-5 justify-end w-[30vw] mr-10">
            <select
              className="bg-white text-black w-[30%] h-[35px] rounded-[5px] p-3"
              onChange={(e) => setSelectPlaylist(e.target.value)}
            >
              <option>Select PlayList</option>
              {!isPlaylistsLoading
                ? playlists?.map((problem) => (
                    <option value={problem.id}>{problem.name}</option>
                  ))
                : "loading..."}
            </select>
            <select
              className="bg-white text-black w-[30%] h-[35px] rounded-[5px] p-3 "
              onChange={(e) => setselectWhichQustion(e.target.value)}
            >
              <option value="selectQuestion">Select Questions</option>
              <option value="existingProblem">Existing Problem</option>
              <option value="problemCreatedByYou">
                Problem Created By You
              </option>
            </select>
          </div>
        </div>
        {selectWhichQustion === "existingProblem" ? (
          !isProblemsLoading ? (
            problems?.map((problem) => (
              <div>
                <div className="flex gap-5 p-3 bg-gray-700 mb-5 rounded-[5px]">
                  <input
                    {...register("id")}
                    type="checkbox"
                    value={problem.id}
                  />
                  <h2>{problem.title}</h2>
                </div>
              </div>
            ))
          ) : (
            ""
          )
        ) : selectWhichQustion === "problemCreatedByYou" ? (
          !isproblemsCreatedBymeLoading ? (
            problemsCreatedByme?.map((problem) => (
              <div>
                <div className="flex gap-5 p-3 bg-gray-700 mb-5 rounded-[5px]">
                  <input
                    {...register("id")}
                    type="checkbox"
                    value={problem.id}
                  />
                  <h2>{problem.title}</h2>
                </div>
              </div>
            ))
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default AddQuestionsToPlayListForm;
