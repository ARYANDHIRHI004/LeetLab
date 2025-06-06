import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePlaylist } from "../Store/usePlaylist";
import { Link } from "react-router-dom";
import { useActions } from "../Store/useActions";
import { useProblemStore } from "../Store/useProblemStore";
import AddQuestionsToPlayListForm from "./AddQuestionsToPlayListForm";

const CreateUserPlaylist = () => {
  const { handleSubmit, register } = useForm();
  const { playlists, isPlaylistsLoading, createPlaylist, addProblemsInPlaylist, getAllPlaylist } = usePlaylist();
  const { selectWhichQustion, setselectWhichQustion } = useActions();

  const { getAllProblems, problems, isProblemsLoading, } = useProblemStore();

  const [selectPlayList, setSelectPlaylist] = useState("")

  const submitPlaylistData = (data) => {
    createPlaylist(data);
  };


  useEffect(
    () => {
      getAllProblems();
    },
    [getAllProblems]
  );
  
    useEffect(() => {
      getAllPlaylist();
    }, [getAllPlaylist]);

  return (
    <div className="bg-black h-[100vh] pt-20 text-white px-5">
      <div className="flex gap-5">
        <div>
          <div className="bg-gray-800 h-[38vh] w-[40vw] rounded-[5px] p-5 mb-5">
            <form
              className="bg-gray-900 p-5 flex flex-col gap-8 rounded-[5px]"
              action={handleSubmit(submitPlaylistData)}
            >
              <div className="flex flex-col">
                <label className="text-[15px] mb-2" htmlFor="">
                  Name :
                </label>
                <input
                  className="bg-white rounded-[5px] p-2 text-black"
                  placeholder="Enter Name Of Playlist"
                  type="text"
                  {...register("name")}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[15px] mb-2" htmlFor="">
                  Description :
                </label>
                <input
                  className="bg-white rounded-[5px] p-2 text-black"
                  placeholder="Enter Description"
                  type="text"
                  {...register("description")}
                />
              </div>
              <button type="submit">Create PlayList</button>
            </form>
          </div>

          <div className="bg-gray-800 h-[50vh] w-[40vw] rounded-[5px] p-5 flex flex-col justify-center items-center">
            
            
            <button className="bg-white text-black w-[80%] h-[35px] rounded-[5px] p-3 text-center mt-5">
              Add Questions To Playlist
            </button>
          </div>
        </div>
        <div className="bg-gray-800 h-[90vh] w-[60vw] rounded-[5px] p-5">
          <AddQuestionsToPlayListForm selectPlayList = {selectPlayList}/>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPlaylist;
