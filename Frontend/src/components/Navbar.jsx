import React from "react";
import { Link } from "react-router-dom";
import { NavbarMenu } from "../constents";
import Neurocodium from "../assets/neurocodiumLogo.png";
import { useAuthStore } from "../Store/useAuthStore";

const Navbar = () => {
  const { authUser } = useAuthStore();

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
            className="bg-[#3000cf] pt-1.5 pb-1.5 px-8 rounded-full w-35 text-center"
            to={"/login"}
          >
            Login
          </Link>
        ) : (
          ""
        )}
        {!authUser ? (
          <Link
            className=" bg-white  text-[#3000cf] pt-1.5 pb-1.5 px-8 rounded-full w-35 text-center"
            to={"/Signup"}
          >
            sign Up
          </Link>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default Navbar;
