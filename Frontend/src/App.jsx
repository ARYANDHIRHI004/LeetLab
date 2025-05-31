import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './Store/useAuthStore'
import { CloudCog, Loader } from 'lucide-react'
import Layout from './components/Layout'
import LogoutOutlet from './components/LogoutOutlet'
import CreateProblemForm from './components/AddProblemForm' 
import ProblemPage from './pages/ProblemPage'
import WelcomePage from './pages/WelcomePage'

const App = () => {

  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect((params) => {
    checkAuth()
  },[checkAuth])

  if(isCheckingAuth && !authUser){
    return (
      <div className='h-screen flex justify-center items-center'>
        <Loader className='size-10 animate-spin' ></Loader>
      </div>
    )
  }


  return (
    <>
      <div className='flex flex-col items-center justify-start w-full'>
        <Toaster />
        <Routes>
          <Route path='/home' element={<Layout />}>
            <Route path='/home' element={ authUser? <HomePage />: <Navigate to={"/login"}/>} />   
            <Route path='/home/add-problem' element={ authUser? <CreateProblemForm />: <Navigate to={"/login"}/>} />   
          </Route>
            <Route path='/problem/:id' element={ authUser? <ProblemPage />: <Navigate to={"/login"}/>} />   

          
          <Route path='/' element={<LogoutOutlet />}>
            <Route path='/' element={ !authUser? <WelcomePage />: <Navigate to={"/home"}/>} />
            <Route path='/login' element={ !authUser? <LoginPage />: <Navigate to={"/home"}/>} />
            <Route path='/signup' element={!authUser?<SignUpPage />: <Navigate to={"/home"}/>} />
          </Route>
        </Routes>        
      </div>
    </>
  )
}

export default App