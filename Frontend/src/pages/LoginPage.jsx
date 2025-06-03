import React from 'react'
import { useForm } from "react-hook-form";
import { useAuthStore } from '../Store/useAuthStore'

const LoginPage = () => {
   const {isLoggingIn, login} = useAuthStore()
   const {register, handleSubmit} = useForm()

   const onSubmit = async(data) =>{
        try {
            await login(data)
        } catch (error) {
            console.log(error)
        }
   }

  return (
    <div className='bg-black text-white h-[100vh] flex items-center justify-center text-xl'>
        <div className=' bg-gray-400 p-5 rounded-2xl w-100 h-110'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col mb-5'>
                    <label htmlFor="email">Email</label>
                    <input
                     className='border-blue-950 border-2 rounded-xl p-2 bg-black'
                     type="text" 
                     name='email' 
                     placeholder='Enter Your email'
                     {...register("email")}
                      />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password">Password</label>
                    <input 
                    className='border-blue-950 border-2 rounded-xl p-2 bg-black' 
                    type="text" 
                    name='password' 
                    placeholder='*******'
                    {...register("password")}
                     />
                </div>

                <button 
                className='bg-[#3000cf] mt-15 w-full h-10 rounded-2xl'
                type="submit"
                >
                    {
                       isLoggingIn? "loggingin...":"Login" 
                    }
                </button>
               
            </form>
        </div>
    </div>
  )
}

export default LoginPage