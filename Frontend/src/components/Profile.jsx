import React, { useEffect } from "react";
import { useAuthStore } from "../Store/useAuthStore";
import { CloudCog, Loader, User } from "lucide-react";
import { useSubmisions } from "../Store/useSubmissions";
import { useProblemStore } from "../Store/useProblemStore";

const Profile = () => {
  const { authUser } = useAuthStore();
  const { getAllSubmission, AllSubmissions, isAllSubmissionsLoading } =
    useSubmisions();

    const {solvedProblem} = useProblemStore()

  let languagesUsed = new Set();
  

  useEffect(() => {
    getAllSubmission();
  }, [getAllSubmission]);

  AllSubmissions?.forEach((submission) => {
    languagesUsed.add(submission.language);
  });
 

  return (
    <div className="bg-[#000000] h-[100vh] pt-20 md:px-5 px-10 md:flex gap-5 overflow-auto pb-8">
      <div className="bg-[#080614]  lg:w-[22vw] h-[89vh] rounded-2xl md:mb-0 mb-5 overflow-auto">
        <div className="flex flex-col items-center mt-10">
          <div className="bg-gray-300 w-[25vh] h-[25vh] rounded-full"></div>
          <p className="text-white px-5 text-[25px] mt-5">{authUser?.name}</p>
        </div>
          <div className="px-8 text-white ">
            <p className="flex justify-between border-b-1 border-[#424242] mb-5"><span>Email: </span>{authUser?.email}</p>
            <p className="flex justify-between border-b-1 border-[#424242] mb-5"><span>Role: </span>{authUser?.role}</p>
            <p className="flex justify-between border-b-1 border-[#424242] mb-5"><span>Joine Date: </span>{authUser?.createdAt}</p>
            <p className="flex justify-between border-b-1 border-[#424242] mb-5"><span>Participated in: </span>{authUser?.eventAssignedTo.length} Events</p>
          </div>
        <div>
          {!isAllSubmissionsLoading ? (
            <div className="text-white ">
              <div className="flex justify-between px-8 text-[11px]">
                <p>All submissions</p>
                <p>{AllSubmissions?.length}</p>
              </div>
              <div className="px-8 text-[11px]">
                {
                     Array.from(languagesUsed.values()).map((language)=>(
                        <p>{language}</p>
                    ))
                }
              </div>
            </div>
          ) : (
            <Loader className="animate-spin" />
          )}
        </div>
      </div>
      <div className="bg-[#0e0e0e]  md:w-[78vw] h-[89vh] rounded-2xl">dhirhi</div>
    </div>
  );
};

export default Profile;
