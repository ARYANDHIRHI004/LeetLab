import React from 'react'
import { useAuthStore } from '../Store/useAuthStore';

const UserEventSection = () => {
    const { authUser } = useAuthStore();
  return (
    <div className='bg-black h-[100vh] pt-19 px-5 text-white'>
      <div className='flex gap-5'>
        <div className='bg-gray-800 h-[90vh] w-[25vw] rounded-[5px]'>
            
        </div>
        <div className='bg-gray-800 h-[90vh] w-[75vw] flex flex-col gap-5 p-5 rounded-[5px]'>
            <div className='bg-gray-900 h-[7vh] rounded-[5px]'>

            </div>
            <div className='bg-gray-900 h-[80vh] rounded-[5px]'>

            </div>
        </div>
      </div>
    </div>
  )
}

export default UserEventSection
