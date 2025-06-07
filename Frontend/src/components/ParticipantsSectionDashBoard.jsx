import React from 'react'
import { usePlaylist } from '../Store/usePlaylist';

const ParticipantsSectionDashBoard = () => {
    const {
      playlists,
      isPlaylistsLoading,
      getAllPlaylist,
      getPlaylistById,
      playlist,
      isPlaylistLoading
    } = usePlaylist();


  return (
    <div>
      <div>
        {playlist?.assignedTo.map((assignedTo)=>(
          <div className=" bg-[#2b2b2b] p-3 rounded-[5px] mb-3">
            <p>{assignedTo.user.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ParticipantsSectionDashBoard