import React, { useEffect } from 'react'
import { useAssignments } from '../Store/useAssignments'
const PreviouslyAssignedUsers = () => {

    const {allAssignments, isLoadingAllAssignments, getAllAssignments} = useAssignments()

    useEffect(() => {
      getAllAssignments()
    },[getAllAssignments])

    console.log(allAssignments)


  return (
    <div className="bg-black h-[100vh] text-white pt-19 px-5">
        <div className='flex gap-5'>
            <div className='bg-gray-600 h-[90vh] w-[50vw] rounded-[5px] p-5'>
                <h1 className='text-center text-[18px] mb-3'>All Previously Assigned Users</h1>
                <div>
                    <div className='bg-gray-700 p-3 rounded-[5px] flex  justify-between'>
                        <h3 className='w-50 '>User Name</h3>
                        <p>Event Name</p>
                        <p>Date/Time</p>
                    </div>
                        {
                            !isLoadingAllAssignments?(
                                allAssignments?.map((assignment)=>(
                                    <div className='pt-3'>
                                        <div className='bg-gray-700 p-3 rounded-[5px] flex  justify-between'>
                                            <h3 className='w-80 '>{assignment.user.name}</h3>
                                            <p>{assignment.event.name}</p>
                                            <p>{assignment.event.createdAt}</p>
                                        </div>
                                    </div>
                                ))
                            ):("")
                        }
                </div>
            </div>
            <div className='bg-gray-600 h-[90vh] w-[50vw] rounded-[5px] p-5'>
                
            </div>
        </div>
    </div>
  )
}

export default PreviouslyAssignedUsers