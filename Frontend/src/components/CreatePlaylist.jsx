import React from "react";
import { useForm } from "react-hook-form";
import { usePlaylist } from "../Store/usePlaylist";

const CreatePlaylist = () => {
  const { handleSubmit, register } = useForm();
  const {createPlaylist} = usePlaylist()

  const onSubmit = async(data) => {
    try {
      await createPlaylist(data)
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <div className="bg-black h-[100vh] text-white pt-20 px-5">
      <div className="w-[40vw] bg-[#1d1d1d] p-8 m-5 rounded-2xl">
        <form className="flex flex-col gap-10" action={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label className="text-[15px]"  htmlFor="">Name :</label>
          <input 
          className="bg-white p-2"
          type="text"
          {...register("name")}
           />
        </div>
        <div className="flex flex-col">
          <label className="text-[15px]"  htmlFor="">Description :</label>
          <input 
          className="bg-white p-2" 
          type="text"
          {...register("description")}
           />
        </div>
        <div className="flex flex-col">
          <button className="bg-blue-950 p-2 text-[15px]" type="submit">
            Create Event
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default CreatePlaylist;
