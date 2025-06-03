import React from "react";
import { Link } from "react-router-dom";
import { NavbarMenu } from "../constents";
import Neurocodium from "../assets/neurocodiumLogo.png";
import { useAuthStore } from "../Store/useAuthStore";
import { Loader } from "lucide-react";

const Navbar = () => {
  const { authUser, logout, isLoggingOut} = useAuthStore();

  const handleLogout = async() => {
    try {
      await logout()
    } catch (error) {
      console.log(error)
    }
  }
  


  return (
    <nav className=" fixed flex justify-around items-center text-[15px] bg-black text-white w-full h-17 font-medium gap-60 z-50">
      <Link to={"/"} className="text-3xl flex gap-2">
        <img src={Neurocodium} className="w-20" />
        <span>Neurocodium</span>
      </Link>
      <div>
        <ul className="flex gap-14">
          {NavbarMenu.map((navMenu) => (
            <li key={navMenu.id}>{navMenu.label}</li>
          ))}
        </ul>
      </div>
      <div className="flex gap-5 items-center">
        {!authUser ? (
          <Link
            className="bg-[#3000cf] pt-1.5 pb-1.5 px-8 rounded-full w-35 text-center hover:drop-shadow-[0px_0px_10px_#0090FF]"
            to={"/login"}
          >
            Login
          </Link>
        ) : (
          <button
            className="bg-[#3000cf] pt-1.5 pb-1.5 px-8 rounded-full w-35 h-10 text-center hover:bg-blue-900"
            onClick={handleLogout}
          >
            {
              isLoggingOut? ( 
                <div className='flex justify-center items-center gap-2'>
                <Loader className="size-6 animate-spin" />
                </div>
            ):"Login" 
            }
          </button>
        )}
        {!authUser ? (
          <Link
            className=" bg-white  text-[#3000cf] pt-1.5 pb-1.5 px-8 rounded-full w-35 text-center"
            to={"/Signup"}
          >
            sign Up
          </Link>
        ) : (
          null
        )}
      </div>
    </nav>
  );
};

export default Navbar;
