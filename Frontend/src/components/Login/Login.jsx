import React from 'react'
import image from "../../assets/971.jpg"

const Login = () => {
  return (
    <div className='bg-black h-[100vh] flex justify-center items-center '>
      <div className='text-white text-xl bg-gray-700 h-[50vh] w-[20vw] p-10 rounded-l-4xl'>
        <h1 className='text-4xl pb-10 font-bold'>Login </h1>
          <form action="" method="POST">
            <div>
              <div className='flex flex-col mb-10'>
                <label htmlFor="Email">Email Address</label>
                <input className='bg-amber-50 text-black  pl-2' type="text" placeholder='Email' name='email' />
              </div>
              <div className='flex flex-col mb-10'>
                <label htmlFor="">Password</label>
                <input className='bg-amber-50 text-black  pl-2' type="text" placeholder='Password' name='password' />
              </div>
            </div>
            <div >
              <button className='bg-purple-900 w-22 h-10 rounded-4xl' type="submit" >Login</button>
            </div>
          </form>
      </div>
      <div >
          <img className='rounded-e-4xl h-[50vh]' src={image} alt="" />
      </div>
    </div>
  )
}

export default Login
