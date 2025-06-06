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
    <div className="bg-black h-[100vh] text-white pt-19 px-5">
      <div className="flex gap-5">
        <div className="bg-gray-500 h-[90vh] w-[50vw] rounded-[5px] p-5 flex flex-col gap-5 ">
          <div onClick={setEventSelect} className="bg-gray-800 p-2 rounded-[5px] flex justify-between px-5">
            <button className="text-[15px]">Select Event: </button>
            <span className="text-[15px]"> {eventName}</span>
          </div>
          <div onClick={setselectParticipants} className="bg-gray-800 p-2 rounded-[5px] text-center">
            <button className="text-[15px]">
              Select Participants
            </button>
          </div>
          <button onClick={createAssignmentBtn} className="bg-gray-800 p-2 rounded-[5px]">
            <div className="text-[15px]">Create Assignment</div>
          </button>
        </div>
        <div className="bg-gray-500  h-[90vh] w-[50vw] rounded-[5px] p-5 flex flex-col gap-2">
          {selectEvent ? (
            playlists?.map((playlist) => (
              <div
                onClick={() => selectPlaylist(playlist.id, playlist.name)}
                className="bg-gray-800 p-3 rounded-[5px]"
              >
                <p>{playlist.name}</p>
              </div>
            ))
          ) : selectParticipants ? (
            <div>
              <form className=" flex flex-col gap-2" action={handleSubmit(onSubmitUsers)}>
                  <button className="bg-gray-800 p-3 rounded-[5px] " type="submit">Add Users</button>
                {!isLoadingAllusers
                  ? Allusers?.map((user) => (
                      <div
                        className="bg-gray-800 p-3 rounded-[5px] flex gap-2"
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
