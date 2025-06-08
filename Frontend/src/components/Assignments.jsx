import React, { useEffect, useState } from "react";
import { usePlaylist } from "../Store/usePlaylist";
import { useActions } from "../Store/useActions";
import { useAssignments } from "../Store/useAssignments";
import { useAuthStore } from "../Store/useAuthStore";
import { useForm } from "react-hook-form";

const Assignments = () => {
  const { getAllPlaylist, playlists, isPlaylistsLoading } = usePlaylist();
  const {
    selectEvent,
    setEventSelect,
    selectParticipants,
    setselectParticipants,
  } = useActions();
  const [eventId, setEventId] = useState("");
  const [eventName, setEventName] = useState("");

  const [userIds, setUserIds] = useState([]);
  const [userName, setUserName] = useState([]);
  const [nameSelectToggler, setNameSelectToggler] = useState(false);
  const { createAssignment, assignmentCreated, isCreatingAssignment } =
    useAssignments();
  const { getAllUsers, Allusers, isLoadingAllusers } = useAuthStore();


  const {handleSubmit, register} = useForm()


  useEffect(() => {
    getAllPlaylist();
    getAllUsers();
  }, [getAllPlaylist, getAllUsers]);

  const selectPlaylist = (id, name) => {
    setEventId(id);
    setEventName(name);
  };

  const onSubmitUsers = (data) => {
    setUserIds(data.id)
}
  

  const createAssignmentBtn = () => {
    createAssignment({ eventId, userIds });
  };

  return (
    <div className="bg-black h-[100vh]  pt-19 px-5">
      <div className="flex gap-5">
        <div className="bg-[#161616] h-[90vh] w-[30vw] rounded-[5px] p-5 flex flex-col gap-5 ">
          <div onClick={setEventSelect} className="bg-white p-2 rounded-[5px] flex justify-between px-5">
            <button className="text-[15px]">Select Event: </button>
            <span className="text-[15px]"> {eventName}</span>
          </div>
          <div onClick={setselectParticipants} className="bg-white p-2 rounded-[5px] text-center">
            <button className="text-[15px]">
              Select Participants
            </button>
          </div>
  
        </div>
        <div className="bg-[#161616]  h-[90vh] w-[70vw] rounded-[5px] p-5  overflow-auto pb-5">
          {selectEvent ? (
          <div className="flex flex-col gap-2">
            <div className="bg-white p-3 rounded-[5px] flex gap-10">
             <p className="w-47 ">Event Name</p>
             <p className="w-47 "> Description</p>
             <p className="w-47 "> Event Date</p>
             <p className="w-47 "> Event Time</p>
             <p className="w-47 "> Event End Date</p>
             <p className="w-47 "> Event End Time</p>
          </div>
            <div className="flex flex-col gap-2">
              {
                playlists?.map((playlist)=>(

                    <div onClick={()=>selectPlaylist(playlist.id, playlist.name)} className="bg-white p-3 rounded-[5px] flex gap-10">
                    <p className="min-w-47 overflow-clip ">{playlist.name}</p>
                    <p className="min-w-47 overflow-clip ">{playlist.description}</p>
                    <p className="w-47 ">{playlist.eventDate}</p>
                    <p className="w-47 ">{playlist.eventTime}</p>
                    <p className="w-47 ">{playlist.endDate}</p>
                    <p className="w-47 ">{playlist.eventTime}</p>
                    <p className="w-47 ">{playlist.eventDate}</p>
                  </div>

                ))
              }
            </div>
          </div>
          ) : selectParticipants ? (
            <div>
              <form className=" flex flex-col gap-2" action={handleSubmit(onSubmitUsers)}>
                  <button className="bg-white p-3 rounded-[5px] " type="submit">Add Participants</button>
                {!isLoadingAllusers
                  ? Allusers?.map((user) => (
                      <div
                        className="bg-white p-3 rounded-[5px] flex gap-2"
                      >
                        <input
                        {...register("id")}
                         type="checkbox"
                         value={user.id}
                         />
                        <p>{user.name}</p>
                      </div>
                    ))
                  : ""}
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignments;
