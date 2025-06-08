import React, { useEffect, useState } from "react";
import { useAuthStore } from "../Store/useAuthStore";
import { usePlaylist } from "../Store/usePlaylist";
import { Link } from "react-router-dom";
import {
  DashboardEventSectionNavtab,
  DashboardEventSectionNavtabComponents,
} from "../lib/utils";
import { useActions } from "../Store/useActions";

const Events = () => {
  const {
    playlists,
    isPlaylistsLoading,
    getAllPlaylist,
    getPlaylistById,
    playlist,
    isPlaylistLoading
  } = usePlaylist();

  const {
    DashboardEventSectionNavtabActive,
    DashboardEventSectionNavtabActiveChange,
    Events,
    EventSet,
  } = useActions();

  useEffect(() => {
    getAllPlaylist();
  }, [getAllPlaylist]);

 
  useEffect(() => {
    getPlaylistById(Events);
  }, [getPlaylistById, Events]);

  return (
    <div className="bg-black h-[100vh] text-white pt-19 px-5">
      <div className="flex gap-5">
        <div className="bg-[#141414] w-[50%] rounded-[5px] pt-2 px-4 h-[90vh]">
          <div className="">
            <h3 className="text-[20px] mb-3">Previous Events</h3>
            <div className="flex flex-col gap-2">
              {playlists?.map((playlist, i) => (
                <button
                  onClick={() => EventSet(playlist.id)}
                  className="text-left"
                >
                  <div>
                    <p
                      className={`text-[15px] ${
                        i % 2 == 0 ? "bg-[#313131]" : "bg-[#0c0c0c]"
                      } p-2 rounded-[3px]`}
                    >
                      {playlist.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#141414] w-[50%] rounded-[5px] pt-2 px-4 h-[90vh]">
          <div>
            <ul className="flex gap-5 bg-gray-800 p-4 rounded-[5px]">
              {DashboardEventSectionNavtab.map((Navtab) => (
                <button
                  onClick={() =>
                    DashboardEventSectionNavtabActiveChange(Navtab.id)
                  }
                >
                  <li key={Navtab.id}>{Navtab.component}</li>
                </button>
              ))}
            </ul>
          </div>
          <div className="mt-3 mx-1">
            {DashboardEventSectionNavtabComponents.map((component) =>
              component.id === DashboardEventSectionNavtabActive ? (
                <component.component />
              ) : (
                ""
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
