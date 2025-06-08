import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { usePlaylist } from "../Store/usePlaylist";
import { Link } from "react-router-dom";
import { useActions } from "../Store/useActions";
import { BookText, ListMusic, Loader, Mouse, Trash2 } from "lucide-react";

const UserPlaylist = () => {
  const {
    playlists,
    isPlaylistsLoading,
    createPlaylist,
    getAllPlaylist,
    deletePlaylist,
    isdeleting,
  } = usePlaylist();

  const deletePlyList = async (id) => {
    deleting = true;
    await deletePlaylist(id);
  };

  useEffect(() => {
    getAllPlaylist();
  }, [getAllPlaylist, isdeleting]);

  return (
    <div className="bg-[#050505] h-[100vh] pt-20 text-white px-8 pb-20 ">
      <div>
        <h1 className=" text-[25px] rounded-[5px]  p-2 mt-5 mb-5 flex justify-center items-center gap-2">
          <BookText />
          Your Playlist
        </h1>
        <div className=" rounded-[5px] flex justify-center overflow-auto ">
          <div>
            {!isPlaylistsLoading ? (
              <div className="px-10 pt-5 pb-5  rounded-[5px] flex justify-center">
                <table className="  bg-[#111111] rounded-[10px] table-auto w-[90vw]">
                  <thead>
                    <tr>
                      <th className="w-100 text-[18px] text-left underline underline-offset-4 px-20 pt-5 pb-5 flex items-center gap-2">
                        <BookText size={18} />
                        Playlist Name
                      </th>
                      <th className="w-100 text-[18px] text-left underline underline-offset-4 px-20 pt-5 pb-5">
                        {" "}
                        Creation Date
                      </th>
                      <th className="w-100 text-[18px] text-left underline underline-offset-4 px-20 pt-5 pb-5">
                        Last Update
                      </th>
                      <th className="w-100 text-[18px] text-left underline underline-offset-4 px-20 pt-5 pb-5">
                        Delete Playlist
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {playlists?.map((playlist) => (
                      <tr>
                        <td className="pt-5 px-20  pb-5">
                          <div>
                            <Link className="flex items-center gap-2" to={`/playlist/problems/${playlist.id}`}>
                            <Mouse size={30}/>
                              <div>
                                <h3 className="text-[20px]">{playlist.name}</h3>
                              <p className="text-[12px]">
                                {playlist.description}
                              </p>
                              </div>
                            </Link>
                          </div>
                        </td>

                        <td className="pt-5 px-20  pb-5">
                          <p className="text-[12px]">
                            {playlist.createdAt.split("T")[0]}
                          </p>
                        </td>
                        <td className="pt-5 px-20  pb-5">
                          <p className="text-[12px]">
                            {playlist.updatedAt.split("T")[0]}
                          </p>
                        </td>
                        <td className="pt-5  px-20  pb-5">
                          <button onClick={() => deletePlyList(playlist.id)}>
                            {!isdeleting ? (
                              <Trash2 />
                            ) : (
                              <div className="flex justify-center items-center gap-2">
                                <Loader className="size-6 animate-spin" />
                              </div>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <h3 className="text-[40px] text-center text-gray-900 font-bold">
                Loading Playlists
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPlaylist;
