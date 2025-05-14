import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
// import HomePage from './pages/Homepage'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './Store/useAuthStore'
import { Loader } from 'lucide-react'
import Layout from './components/Layout'
import CreateProblemForm from './components/AddProblemForm' 

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
      <div className='flex flex-col items-center justify-start'>
        <Toaster />
        <Routes>
          {/* <Route path='/' element={<Layout />}>
            <Route path='/' element={ authUser? <HomePage />: <Navigate to={"/login"}/>} />   
            <Route path='/add-problem' element={ authUser? <CreateProblemForm />: <Navigate to={"/login"}/>} />   
          </Route> */}
          
          <Route path='/' element={ !authUser? <LoginPage />: <Navigate to={"/"}/>} />
          <Route path='/signup' element={!authUser?<SignUpPage />: <Navigate to={"/"}/>} />
        </Routes>        
      </div>
    </>
  )
}

export default App