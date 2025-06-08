import React from "react";
import { NavbarMenu } from "../constents";
import Neurocodium from "../assets/neurocodiumLogo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="h-[60vh] bg-black">
      <div className="text-white  flex justify-between mx-10 pt-20 ">
        <span className="text-[22px]">
          <Link to={"/"} className="text-3xl flex gap-2 items-center">
            <img src={Neurocodium} className="w-16 h-6" />
            <span>Neurocodium</span>
          </Link>
        </span>
        <div>
          <ul className="text-[12px] flex flex-col gap-3">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>{menu.label}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-gradient-to-t from-[#000000] via-[#150079] to-[#150079] text-transparent bg-clip-text text-center font-extrabold text-[150px] max-sm:text-[20px] max-[1206px]:text-[20px] mt-12 h-60 ">
        NEUROCODIUM
      </div>
      <div className=" h-0.5 bg-gray-700 "></div>
      <div className="text-gray-700 text-center text-[13px] font-serif mt-2">
        COPYRIGHT | ALL RIGHTS RESERVE
      </div>
    </section>
  );
};

export default Footer;
