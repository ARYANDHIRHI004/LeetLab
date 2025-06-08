import React from "react";
import { Link } from "react-router-dom";
import { NavbarMenu } from "../constents";
import Neurocodium from "../assets/neurocodiumLogo.png";
import { useAuthStore } from "../Store/useAuthStore";
import { Loader } from "lucide-react";
import ProfileMenu from "./ProfileMenu";

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
    <nav className=" fixed flex justify-between px-20 items-center text-[12px] bg-[#000000] text-white w-[100vw] font-medium gap-60 z-50 h-17">
      <Link to={"/"} className="text-[25px] flex gap-2 items-center">
        <img src={Neurocodium} width={60}/>
        <span>Neurocodium</span>
      </Link>
      {
        !authUser?(
          <div>
        <ul className="flex gap-14 text-[15px] max-[1028px]:hidden">
          {NavbarMenu.map((navMenu) => (
            <li key={navMenu.id}>{navMenu.label}</li>
          ))}
        </ul>
      </div>
        ):("")
      }
      <div className="flex gap-5 items-center max-[790px]:hidden">
        {!authUser ? (
          <Link
            className="bg-[#3000cf] pt-1.5 pb-1.5 px-8 rounded-full w-[110px] text-center hover:drop-shadow-[0px_0px_10px_#0090FF] text-[15px] h-10 "
            to={"/login"}
          >
            Login
          </Link>
        ) : (
          <button
            className="bg-[#3000cf] pt-1.5 pb-1.5 px-8 rounded-full w-[110px] h-10 text-center hover:bg-blue-900 text-[15px] "
            onClick={handleLogout}
          >
            {
              isLoggingOut? ( 
                <div className='flex justify-center items-center gap-2'>
                <Loader className="size-6 animate-spin" />
                </div>
            ):"Logout" 
            }
          </button>
        )}
        {!authUser ? (
          <Link
            className=" bg-white  text-[#3000cf] pt-1.5 pb-1.5 px-8 rounded-full w-[110] text-center text-[15px] h-10"
            to={"/Signup"}
          >
            sign Up
          </Link>
        ) : (
          <ProfileMenu />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
