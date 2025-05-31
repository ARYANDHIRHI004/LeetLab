import React from 'react'
import { Outlet } from 'react-router-dom'
import WelcomeNavbar from './WelcomeNavbar'

const LogoutOutlet = () => {
  return (
    <div>
        <WelcomeNavbar/>
        <Outlet />
    </div>
  )
}

export default LogoutOutlet