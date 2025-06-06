import React, { useEffect } from "react";
import { useAuthStore } from "../Store/useAuthStore";
import { usePlaylist } from "../Store/usePlaylist";
import { Link } from "react-router-dom";

const Events = () => {
  const { playlists, isPlaylistsLoading, getAllPlaylist } = usePlaylist();

  useEffect(() => {
    getAllPlaylist();
  }, [getAllPlaylist]);

  

  return (
    <div className="bg-black h-[100vh] text-white pt-19 px-5">
      <div className="flex gap-5">
        <div className="bg-gray-400 w-[50%] rounded-[5px] pt-2 px-4 h-[90vh]">
          <div className="">
            <h3 className="text-[20px] mb-3">Previous Events</h3>
            <div className="flex flex-col gap-2">
              {playlists?.map((playlist, i) => (
                <div>
                  <p
                    className={`text-[15px] ${
                      i % 2 == 0 ? "bg-[#181818]" : "bg-[#0c0c0c]"
                    } p-2 rounded-[3px]`}
                  >
                    {playlist.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-gray-400 w-[50%] rounded-[5px] pt-2 px-4 h-[90vh]">
          dhirhi
        </div>
      </div>
    </div>
  );
};

export default Events;
