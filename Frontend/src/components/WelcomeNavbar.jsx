import React from 'react'
import { Link } from 'react-router-dom'

const WelcomeNavbar = () => {
  return (
    <nav className='flex justify-between p-3 px-6 rounded-3xl text-xl font-semibold bg-black m-3'>
        <Link to={"/"}>Neurocodium</Link>
        <div className='flex gap-5'>
        <Link to={"/signup"} className='bg-blue-700 px-2 rounded-2xl '>Signup</Link>
        <Link to={"/login"} className='bg-white text-black px-2 rounded-2xl '>Login</Link>     
        </div>
    </nav>
  )
}

export default WelcomeNavbar