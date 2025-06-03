import React from 'react'
import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import WelcomePage from './pages/WelcomePage'
import { useAuthStore } from './Store/useAuthStore'
import HomePage from './pages/HomePage'



function App() {
  
  const { authUser } = useAuthStore()

  return (
    <>
      <div>
        <Routes>
          <Route path='/' element = {<Layout />}>
            <Route path='/' element = {!authUser? <WelcomePage/>:<HomePage />}/>
            {/* <Route path='/add-problem' element = {authUser? <AppProblem/>:<Navigate to={"/"}/>}/> */}
          </Route>
          {/* <Route path='/login' element = {!authUser? <Login />:<Navigate to={"/"}/> }/> */}
          {/* <Route path='/signup' element = {!authUser? <SignUp />:<Navigate to={"/"}/> }/> */}

        </Routes>
      </div>
    </>
  )
}

export default App
