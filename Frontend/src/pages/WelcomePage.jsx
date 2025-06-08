import React from "react";
import { Link } from "react-router-dom";
import Neurocodium from "../assets/neurocodiumLogo.png";
import Tilt from "react-parallax-tilt";
import Footer from "../components/Footer";
import BlurBlob from "../components/BlurBlob";

const WelcomePage = () => {
  return (
    <div>
      <section
        id="home"
        className="bg-[linear-gradient(120deg,#090033,#000)] md:[mask-image:radial-gradient(ellipse_100%_200%_at_50%_155%,transparent_50%,black_50%)] h-[100vh] "
      >
        <div className="max-[1028px]:hidden">
          <BlurBlob
            position={{ top: "45%", left: "75%" }}
            size={{ width: "30%", height: "48%" }}
          />
        </div>
            <div className="absolute right-0 top-[20%] w-full flex max-[710]:justify-center 2xl:justify-end px-30 ">
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                scale={1.05}
                transitionSpeed={1000}
                gyroscope={true}
              >
                <div>
                  <img
                    className=" max-sm:w-100 w-180"
                    src={Neurocodium}
                    alt=""
                  />
                </div>
              </Tilt>
            </div>
        <div className=" text-white pt-56 max-sm:pt-90">
          <div className="text-7xl font-medium  flex max-[1028px]:flex-col max-sm:items-center px-30">
            <div className="text-[80px] max-sm:text-center max-[710px]:text-center max-sm:text-[40px] max-[700px]:text-[80px]">
              Welcome to
              <div className="text-[100px] max-sm:text-[50px] max-[710px]:text-[90px] font-bold text-[#6b6b6b]">
                Neurocoduim
              </div>
              <div className="text-[20px] max-sm:text-[20px] px-2 font-normal">
                <i>Boost Your Problem Solving Skills...</i>
              </div>
            </div>
          </div>
        </div>
        <div className=" pt-10 text-[15px] text-white px-32 max-sm:p-0 max-sm:text-center max-sm:pt-10">
          <Link
            to={"/signup"}
            className="bg-[#3000cf] px-8 pt-2.5 pb-2.5 rounded-full drop-shadow-[0px_0px_11px_#0090FF] animate-bounce "
          >
            Register Now
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default WelcomePage;
