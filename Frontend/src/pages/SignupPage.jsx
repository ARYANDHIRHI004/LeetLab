import React from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../Store/useAuthStore";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const SignupPage = () => {
  const { isSigningUp, signup } = useAuthStore();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()

  const onSubmit = async (data) => {
      await signup(data);
      navigate("/login")
  
  };

  return (
    <div className="bg-black text-white h-[100vh] flex items-center justify-center text-xl">
      <div className=" bg-gray-400 p-5 rounded-2xl w-100 h-110">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-5">
            <label htmlFor="Name">Name</label>
            <input
              className="border-blue-950 border-2 rounded-xl p-2 bg-black"
              type="text"
              name="email"
              placeholder="Enter Your email"
              {...register("name")}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="email">Email</label>
            <input
              className="border-blue-950 border-2 rounded-xl p-2 bg-black"
              type="text"
              name="email"
              placeholder="Enter Your email"
              {...register("email")}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              className="border-blue-950 border-2 rounded-xl p-2 bg-black"
              type="text"
              name="password"
              placeholder="*******"
              {...register("password")}
            />
          </div>

          <button
            className="bg-[#3000cf] mt-15 w-full h-10 rounded-2xl"
            type="submit"
          >
            {isSigningUp ? "Signing Up..." : "sign Up"}

          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
