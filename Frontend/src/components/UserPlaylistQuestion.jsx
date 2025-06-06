import React, { useEffect } from 'react'
import { usePlaylist } from '../Store/usePlaylist'
import { useParams } from 'react-router-dom'
import { useActions } from '../Store/useActions'

const UserPlaylistQuestion = () => {

    const {getPlaylistById, playlist, isPlaylistLoading} = usePlaylist()
    const {playlistId} = useParams()


    useEffect(() => {
      getPlaylistById(playlistId)
    },[getPlaylistById])

  return (
    <div className="bg-black h-[100vh] pt-30 text-white px-50">
        <h1 className='text-center mb-2'>Playlist</h1>
        <div className='bg-gray-600 h-[50px]'>
            {
                !isPlaylistLoading?(
                    playlist?.problems.map((problem)=>(
                        <div>
                            <h2>{problem.problems.title}</h2>
                        </div>
                    ))
                ):("loading...")
            }
        </div>
    </div>
  )
}

export default UserPlaylistQuestion