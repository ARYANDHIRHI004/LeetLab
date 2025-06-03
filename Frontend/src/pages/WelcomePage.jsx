import React from 'react'
import { Link } from 'react-router-dom'
import Neurocodium from "../assets/neurocodiumLogo.png"
import Tilt from 'react-parallax-tilt';
import Footer from '../components/Footer';
import BlurBlob from '../components/BlurBlob';


const WelcomePage = () => {
  return (
    <div>
        <section id='home' className='bg-[linear-gradient(120deg,#090033,#000)] [mask-image:radial-gradient(ellipse_100%_200%_at_50%_155%,transparent_50%,black_50%)] h-[100vh] '>
        <BlurBlob position={{top: "45%", left:"75%"}} size={{width:"30%", height:"48%"}} />
        <div className=' text-white h-[90%] flex flex-col justify-center px-30 z-50 '>
            <div className='text-7xl font-medium flex justify-between gap-90'>
                <div>
                    Welcome to 
                    <div className='text-8xl text-[#6b6b6b]'>Neurocoduim</div>
                    <div className='text-[15px] px-2 pt-4 font-normal'><i>Boost Your Problem Solving Skills...</i></div>
                </div>
                <Tilt
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={10}
                    perspective={1000}
                    scale={1.05}
                    transitionSpeed={1000}
                    gyroscope={true}
                >
                    <div>
                        <img className='w-170' src={Neurocodium} alt="" />
                    </div>
                </Tilt>
            </div>
        <div className=' pt-5 text-[15px] '>
            <Link to={"/signup"} className='bg-[#3000cf] px-8 pt-2.5 pb-2.5 rounded-full drop-shadow-[0px_0px_15px_#0090FF] animate-bounce '>
                Register Now
            </Link>
        </div>
        </div>
    </section>
        <Footer />
    </div>
  )
}

export default WelcomePage