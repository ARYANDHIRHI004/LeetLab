import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { usePlaylist } from "../Store/usePlaylist";
import { Link } from "react-router-dom";
import { useActions } from "../Store/useActions";

const UserPlaylist = () => {
  const { handleSubmit, register } = useForm();
  const { playlists, isPlaylistsLoading, createPlaylist, getAllPlaylist } =
    usePlaylist();
  const { selectWhichQustion, setselectWhichQustion } = useActions();

  console.log(selectWhichQustion)

  const submitPlaylistData = (data) => {
    createPlaylist(data);
  };

  useEffect(() => {
    getAllPlaylist();
  }, [getAllPlaylist]);

  return (
    <div className="bg-black h-[100vh] pt-20 text-white px-8 pb-20 ">
      <div>
        <div>          
        </div>
        <div className=" h-[90vh] rounded-[5px] overflow-auto">
          <h1 className="text-center text-[18px] bg-gray-700 rounded-[5px] p-2 mb-5">
            Your Playlist
          </h1>
          <div>
            {!isPlaylistsLoading ? (
              <div className="p-5">
                {playlists?.map((playlist) => (
                  <Link to={`/playlist/problems/${playlist.id}`}>
                    <div className="bg-gray-900 p-5 mb-5 rounded-[5px]">
                      <h3 className="text-[15px]">{playlist.name}</h3>
                      <p className="text-[12px]">{playlist.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              "loading..."
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPlaylist;
