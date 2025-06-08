import React from 'react'
import { useForm } from "react-hook-form";
import { useAuthStore } from '../Store/useAuthStore'
import { Loader } from "lucide-react";
import Tilt from "react-parallax-tilt";
import Neurocodium from "../assets/neurocodiumLogo.png";
import BlurBlob from '../components/BlurBlob';

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
    <div className='bg-[linear-gradient(120deg,#090033,#000)] text-white h-[100vh] flex items-center justify-center text-xl'>
        <BlurBlob
            position={{ top: "10%", left: "0%" }}
            size={{ width: "30%", height: "48%" }}

          />
        <BlurBlob
            position={{ top: "70%", left: "100%" }}
            size={{ width: "30%", height: "48%" }}
            

          />
        <div className=' p-5 rounded-2xl h-110 flex items-center gap-2'>
            
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
                    type="password" 
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
                       isLoggingIn? ( 
                       <div className='flex justify-center items-center gap-2'>
                        <Loader className="size-5 animate-spin" />
                        Logging in
                       </div>
                    ):"Login" 
                    }
                </button>
               
            </form>
            
            <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                scale={1.05}
                transitionSpeed={1000}
                gyroscope={true}
                className='max-md:hidden'
              >
                <div>
                  <img
                    className=" max-sm:w-100 w-120"
                    src={Neurocodium}
                    alt="Neuricodium"
                  />
                </div>
              </Tilt>
               
        </div>
    </div>
  )
}

export default LoginPage