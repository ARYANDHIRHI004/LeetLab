import React from 'react'
import logo from "../../assets/neurocodiumLogo.png"
import { NavLink, Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='bg-gray-900 '>
      <nav className='flex justify-around p-1 items-center h-15'>
        <div className='w-20'>
            <img src={logo} alt="logo" />
        </div>
        <div >
            <ul className='flex gap-10 text-white text-xl'>
                <NavLink
                    to={"/"}
                    >
                    <li>Home</li>
                    
                </NavLink>
                <NavLink
                    to={"/about"}
                >
                    <li>About</li>
                </NavLink>
                <NavLink
                    to={"/contact-us"}
                >
                    <li>Contact Us</li>
                </NavLink>

            </ul>
        </div>
        <div className='gap-2 flex text-white'>
        <Link
            to="register"
        >
            <button className='bg-purple-800 w-25 h-10 rounded-full'>Sign Up</button>
        </Link>
        <Link
            to="login"
        >
            <button className='bg-purple-800 w-25 h-10 rounded-full'>Login</button>
        </Link>
        </div>
      </nav>
    </div>
  )
}

export default Header
