import React from 'react'
import { Link } from 'react-router-dom'
import Semicircle from "../assets/semicircle.png"

const WelcomePage = () => {
  return (
    <section className='bg-[linear-gradient(120deg,#090033,#000)] [mask-image:radial-gradient(ellipse_100%_200%_at_50%_155%,transparent_50%,black_50%)] h-[100vh]'>
        <div className=' text-white h-[90%] flex flex-col justify-center px-30 z-50 '>
            <div className='text-8xl font-medium'>Welcome to 
                <div className='text-9xl text-[#6b6b6b]'>Neurocoduim</div>
                <div className='text-[19px] px-2 pt-4 font-normal'><i>Boost Your Problem Solving Skills...</i></div>
            </div>
        <div className='px-2 pt-10 text-[15px] '>
            <Link to={"/signup"} className='bg-[#3000cf] px-8 pt-2.5 pb-2.5 rounded-full drop-shadow-[0px_0px_20px_#0090FF]'>
                Register Now
            </Link>
        </div>
        </div>
    </section>
  )
}

export default WelcomePage