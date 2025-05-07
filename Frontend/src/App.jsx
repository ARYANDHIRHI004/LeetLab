import './App.css'
import neurocodiumLogo from "./assets/neurocodiumLogo.png"
function App() {

  return (
    <>
        <div className='flex bg-linear-to-r from-[#11002e] to-black h-[100vh] items-center text-purple-50 justify-center '>
            <div className='text-center flex flex-col items-center'>
              <img className='w-[20vh]' src={neurocodiumLogo} alt="hitesh sir" />
              <h1 className='text-5xl font-bold m-4 text-shadow-white'> Welcome To <span className='font-extrabold text-purple-600'>Neurocodium</span></h1>
              <h2 className='text-center text-2xl font-semibold'>We are Coming Soon...</h2>
            </div>
        </div>
    </>
  )
}

export default App
