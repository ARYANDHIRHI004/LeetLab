import React, { useEffect } from "react";
import { useAuthStore } from "../Store/useAuthStore";
import { usePlaylist } from "../Store/usePlaylist";
import { Link } from "react-router-dom";

const OrganizationDashboard = () => {
  const { authUser } = useAuthStore();
  const { playlists, isPlaylistsLoading, getAllPlaylist, createPlaylist } =
    usePlaylist();

  useEffect(() => {
    getAllPlaylist();
  }, [getAllPlaylist, createPlaylist]);

  return (
    <div className="bg-[#000] h-[100vh] text-white pt-19 px-5">
      <div className="flex gap-5">
        <div className="bg-[#131f36] h-[50vh] w-[21vw] rounded-2xl p-5 ">
          <div className="flex flex-col items-center">
            <div className=" mb-2 h-60 w-60 bg-white text-black rounded-full"></div>
            <h2 className="text-[20px] flex justify-between mb-2">
              {authUser?.name.toUpperCase()}
            </h2>
          </div>
          <div>
            <h2 className="text-[12px] flex justify-between mb-0.5">
              Email: <span>{authUser?.email}</span>
            </h2>
            <h2 className="text-[12px] flex justify-between mb-0.5">
              Role: <span>{authUser?.role}</span>
            </h2>
          </div>
        </div>
        <div className="h-[50vh] w-[80vw] rounded-2xl px-5 pb-5 flex flex-col gap-10">
          <div className="flex gap-12 ">
            <div  className="w-[37vw]">
              <h3 className="text-[20px] mb-3">Previous Events</h3>
              <div className="h-[42vh] overflow-auto rounded-[5px]" >
                <div className="flex flex-col gap-2 ">
                  {playlists?.map((playlist, i) =>
                    playlist.isActive !== true ? (
                      <Link to={"/previous-event"}>
                        <div>
                          <p
                            className={`text-[15px] ${
                              i % 2 == 0 ? "bg-[#2b2b2b]" : "bg-[#1d1d1d]"
                            } p-2 rounded-[3px]`}
                          >
                            {playlist.name}
                          </p>
                        </div>
                      </Link>
                    ) : (
                      ""
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="w-[37vw]" >
              <h3 className="text-[20px] mb-3">Ongoing Events</h3>
              <div className="h-[42vh] overflow-auto rounded-[5px]">
                <div className="flex flex-col gap-2 overflow-scroll ">
                  {playlists?.map((playlist, i) =>
                    playlist.isActive === true ? (
                      <Link to={"/previous-event"}>
                        <div>
                          <p
                            className={`text-[15px] ${
                              i % 2 == 0 ? "bg-[#2b2b2b]" : "bg-[#1d1d1d]"
                            } p-2 rounded-[3px]`}
                          >
                            {playlist.name}
                          </p>
                        </div>
                      </Link>
                    ) : (
                      ""
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex gap-5">
          <Link
            className="w-[33%] bg-[#161616] px-5 pt-5 h-[35vh]  rounded-2xl"
            to={"/create-event"}
          >
            <div>
              <h2 className="text-2xl">Create Events</h2>
            </div>
          </Link>
          <Link
            className="w-[33%] bg-[#161616] px-5 pt-5 h-[35vh]  rounded-2xl"
            to={"/create-assignments"}
          >
            <div>
              <h2 className="text-2xl">Add Users To Events</h2>
            </div>
          </Link>

          <div className="w-[33%] bg-[#161616] px-5 pt-5 h-[35vh] rounded-2xl flex flex-col gap-3">
            <div className="bg-[#2c2c2c] p-2 h-15 text-center rounded-2xl">
              <h2 className="text-[13px]">Create Questions</h2>
            </div>
            <Link to={"/all-created-questions"}>
              <div className="bg-[#2c2c2c] p-2 h-15 text-center rounded-2xl">
                <h2 className="text-[13px]">Questions Created</h2>
              </div>
            </Link>
            <Link to={"/all-previously-assigned-users"}>
              <div className="bg-[#2c2c2c] p-2 h-15 text-center rounded-2xl">
                <h2 className="text-[13px]">Previously Added Users</h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
