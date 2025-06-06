import React, { useEffect } from "react";
import { useAuthStore } from "../Store/useAuthStore";
import { usePlaylist } from "../Store/usePlaylist";
import { Link } from "react-router-dom";

const OrganizationDashboard = () => {
  const { authUser } = useAuthStore();
  const { playlists, isPlaylistsLoading, getAllPlaylist, createPlaylist } = usePlaylist();

  useEffect(() => {
    getAllPlaylist();
  }, [getAllPlaylist, createPlaylist]);

  return (
    <div className="bg-black h-[100vh] text-white pt-19 px-5">
      <div className="flex gap-5">
        <div className="bg-gray-900 h-[90vh] w-[21vw] rounded-2xl"></div>
        <div className="h-[90vh] w-[80vw] rounded-2xl px-5 pb-5 flex flex-col gap-10">
          <div className="flex gap-12 min-h-80">
            <div className="w-[50%]">
              <h3 className="text-[20px] mb-3">Previous Events</h3>
              <div className="flex flex-col gap-2">
                {playlists?.map((playlist, i) => (
                  <Link to={"/previous-event"}>
                    <div>
                      <p
                        className={`text-[15px] ${
                          i % 2 == 0 ? "bg-[#181818]" : "bg-[#0c0c0c]"
                        } p-2 rounded-[3px]`}
                      >
                        {playlist.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="w-[50%]">
                <h3 className="text-[20px] mb-3">Ongoing Events</h3>
            </div>
          </div>
          <div>
            <div className="flex gap-5">
                <Link className="w-[33%] bg-[#161616] px-5 pt-5 h-[30vh]  rounded-2xl" to={"/create-event"}>
                    <div>
                    <h2 className="text-2xl">Create Events</h2>
                </div>
                </Link>
                <Link className="w-[33%] bg-[#161616] px-5 pt-5 h-[30vh]  rounded-2xl" to={"/create-assignments"}>
                    <div>
                    <h2 className="text-2xl">Add Users To Events</h2>
                </div>
                </Link>
                
                <div className="w-[33%] bg-[#161616] px-5 pt-5 h-[30vh] rounded-2xl flex flex-col gap-3">
                    <div className="bg-[#2c2c2c] p-2 rounded-2xl">
                        <h2 className="text-2xl">Create Questions</h2>
                    </div>
                    <div className="bg-[#2c2c2c] p-2 rounded-2xl">
                        <h2 className="text-2xl">Questions Created</h2>
                    </div>
                    <div className="bg-[#2c2c2c] p-2 rounded-2xl">
                        <h2 className="text-2xl">Previously Added Users</h2>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
