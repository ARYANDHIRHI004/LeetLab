import React from 'react'
import { usePlaylist } from '../Store/usePlaylist'

const DetailsSectionDashBoard = () => {

    const {playlist, isPlaylistLoading} = usePlaylist()

  return (
    <div>
        {
            !isPlaylistLoading?(
                <div>
                    <div className='flex justify-between'>
                        <h1>{playlist?.name}</h1>
                    <h1>Event Date: {playlist?.eventDate !== null?<span>{playlist?.eventDate}</span>:"No Date"}</h1>
                    <h1>Event Time: {playlist?.eventTime !== null?<span>{playlist?.eventTime}</span>:"No Time"}</h1>
                    </div>
                    <h1>Active: {playlist?.isActive !== null?<span>{playlist?.isActive}</span>:"Not Active"}</h1>

                </div>
            ):("Loading...")
        }
    </div>
  )
}

export default DetailsSectionDashBoard