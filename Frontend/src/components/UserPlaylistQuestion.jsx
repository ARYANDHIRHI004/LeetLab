import React, { useEffect } from 'react'
import { usePlaylist } from '../Store/usePlaylist'
import { useParams } from 'react-router-dom'
import { useActions } from '../Store/useActions'
import { Link } from 'react-router-dom'
const UserPlaylistQuestion = () => {

    const {getPlaylistById, playlist, isPlaylistLoading} = usePlaylist()
    const {playlistId} = useParams()


    useEffect(() => {
      getPlaylistById(playlistId)
    },[getPlaylistById])

  return (
    <div className="bg-black h-[100vh] pt-30 text-white px-50">
        <h1 className='text-center mb-2 text-[15px]'>Playlist</h1>
        <div className=' h-[50px] gap-5 flex flex-col'>
            {
                !isPlaylistLoading?(
                    playlist?.problems.map((problem)=>(
                        <div className='bg-gray-600 p-3 rounded-[5px]'>
                            <Link to={`/problem/${problem.problems.id}`}>
                                <h2 className='text-[16px]'>{problem.problems.title}</h2>
                            </Link>
                        </div>
                    ))
                ):("loading...")
            }
        </div>
    </div>
  )
}

export default UserPlaylistQuestion