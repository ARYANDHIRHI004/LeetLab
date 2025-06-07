import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePlaylist } from "../Store/usePlaylist";
import { data, Link } from "react-router-dom";
import { useActions } from "../Store/useActions";
import { useProblemStore } from "../Store/useProblemStore";
import AddQuestionsToPlayListForm from "./AddQuestionsToPlayListForm";

const CreateUserPlaylist = () => {
  const { handleSubmit, register } = useForm();
  const {
    playlists,
    isPlaylistsLoading,
    createPlaylist,
    addProblemsInPlaylist,
    getAllPlaylist,
  } = usePlaylist();
  const { selectWhichQustion, setselectWhichQustion } = useActions();

  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();

  
  const submitPlaylistData = (data) => {
    createPlaylist(data);
    console.log(data)
  };

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  useEffect(() => {
    getAllPlaylist();
  }, [getAllPlaylist]);

  return (
    <div className="bg-black h-[100vh] pt-20 text-white px-5">
      <div className="flex gap-5">
        <div>
          <div className="bg-[#131F36] h-[90vh] w-[40vw] rounded-[5px] px-5 ">
            <form
              className="p-5 flex flex-col gap-7 rounded-[5px]"
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
              <div className="flex flex-col">
                <label className="text-[15px] mb-2" htmlFor="">
                  Start Date :
                </label>
                <input
                  className="bg-white rounded-[5px] p-2 text-black"
                  placeholder="Enter Description"
                  type="Date"
                  {...register("eventDate")}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[15px] mb-2" htmlFor="">
                  End Date :
                </label>
                <input
                  className="bg-white rounded-[5px] p-2 text-black"
                  placeholder="Enter Description"
                  type="Date"
                  {...register("endDate")}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[15px] mb-2" htmlFor="">
                  Start Time :
                </label>
                <input
                  className="bg-white rounded-[5px] p-2 text-black"
                  placeholder="Enter Description"
                  type="Time"
                  {...register("eventTime")}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[15px] mb-2" htmlFor="">
                  End Time :
                </label>
                <input
                  className="bg-white rounded-[5px] p-2 text-black"
                  placeholder="Enter Description"
                  type="Time"
                  {...register("endTime")}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[15px] mb-2" htmlFor="">
                  Mode :
                </label>
                <select
                  className="bg-white rounded-[5px] p-2 text-black"
                  placeholder="Enter Description"
                  type="Time"
                  defaultValue={"ONLINE"}
                  {...register("mode")}
                >
                  <option value="ONLINE">ONLINE</option>
                  <option value="OFFLINE">OFFLINE</option>
                </select>
              </div>
              <button
                className="bg-gray-700 p-3 rounded-[5px] text-[15px]"
                type="submit"
              >
                Create PlayList
              </button>
            </form>
          </div>
        </div>
        <div className="bg-[#0e182b] h-[90vh] w-[60vw] rounded-[5px] p-5">
          <AddQuestionsToPlayListForm />
        </div>
      </div>
    </div>
  );
};

export default CreateUserPlaylist;
