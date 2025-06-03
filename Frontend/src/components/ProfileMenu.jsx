import React from 'react'
import { useAuthStore } from '../Store/useAuthStore'
import { User } from 'lucide-react';


const ProfileMenu = () => {
const {authUser} = useAuthStore()

  return (
    <div>
        <div>
            {
                authUser.image?(
                    <img src={authUser.image} alt="userImage" />
                ):(
                    <div className=''>
                        <button className='bg-[#3000cf] w-10 h-10 flex justify-center items-center rounded-full  cursor-pointer hover:w-50 transition-all hover:delay-100 text-[0px] hover:text-[12px]'>
                            <User color='white' size={"20px"}/>
                            <p className=' text-white'>{authUser.name}</p>
                        </button>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default ProfileMenu