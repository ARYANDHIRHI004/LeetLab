import React, { useState } from "react";
import { useAuthStore } from "../Store/useAuthStore";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
  const { authUser } = useAuthStore();
  const [dropDown, setDropDown] = useState(false);

  return (
    <div>
      <div>
        {authUser.image ? (
          <img src={authUser.image} alt="userImage" />
        ) : (
          <div>
            <button
              onClick={() => setDropDown(!dropDown)}
              className="bg-[#3000cf] h-10 flex justify-center items-center rounded-full  cursor-pointer w-50 transition-all hover:delay-100 text-[12px] gap-2"
            >
              <User color="white" size={"20px"} />
              <p className=" text-white">{authUser.name}</p>
            </button>
          </div>
        )}

        {dropDown ? (
          <div
            style={dropDown ? { top: 42 } : ""}
            className="text-white absolute left-[20%] transition-all "
          >
            <ul className=" w-300 flex justify-center items-center gap-20 rounded-[5px] h-20 backdrop-blur-lg">
              <li>
                <Link onClick={() => setDropDown(!dropDown)} to={"/profile"}>
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setDropDown(!dropDown)}
                  to={"/solved-problems"}
                >
                  Solved Problems
                </Link>
              </li>
              <li>
                <Link onClick={() => setDropDown(!dropDown)} to={"/playlist"}>
                  My Playlist
                </Link>
              </li>
              
              {authUser.role === "ADMIN" ? (
                <li>
                  <Link
                    onClick={() => setDropDown(!dropDown)}
                    to={"/create-problem"}
                  >
                    Create Problem
                  </Link>
                </li>
              ) : null}
              <li>
                <Link onClick={() => setDropDown(!dropDown)} to={"/event"}>
                  Events
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
