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
    <div className="bg-black h-[100vh] text-white pt-19 px-5 ">
      <div className="flex gap-5 ">
        <div className="bg-[#141414] w-[50%] rounded-[5px] pt-2 px-4 h-[90vh] overflow-auto pb-5">
            <h3 className=" text-[20px] mb-3 ">Events</h3>
            <div className=" text-[14px] flex">
              <p className="w-65 mb-3 ">Event Name</p>
              <p className="w-31 mb-3 ">Active State</p>
              <p className="w-22 mb-3 ">Mode</p>
              <p className="w-32 mb-3 ">Event Date</p>
              <p className="w-22 mb-3 ">Time</p>
              <p className="w-26 mb-3 ">End Date</p>
              <p className="w-30 mb-3 ">End Time</p>
            </div>

          <div className="">
            <div className="flex flex-col gap-2">
              {playlists?.map((playlist, i) => (
                <button
                  onClick={() => EventSet(playlist.id)}
                  className="text-left"
                >
                  <div>
                    <div
                      className={`text-[15px] ${
                        i % 2 == 0 ? "bg-[#313131]" : "bg-[#0c0c0c]"
                      } p-2 rounded-[3px]`}
                    >
                      <div className="flex gap-10 text-[13px]">
                        <p className="w-60 overflow-auto">{playlist.name}</p>
                      <p className="w-13">{JSON.stringify(playlist.isActive)}</p>
                      <p>{playlist.mode}</p>
                      <p>{playlist.eventDate}</p>
                      <p>{playlist.eventTime}</p>
                      <p>{playlist.endDate}</p>
                      <p>{playlist.endTime}</p>
                      </div>
                    </div>
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
