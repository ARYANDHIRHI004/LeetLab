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
    <div className="bg-[#03030e] h-[100vh] pt-20 px-5 flex gap-5">
      <div className="bg-[#1d1d1d]  w-[22vw] h-[89vh] rounded-2xl">
        <div className="flex flex-col items-center mt-10">
          <div className="bg-gray-300 w-60 h-60 rounded-full"></div>
          <p className="text-white px-5 text-[20px] mt-5">{authUser?.name}</p>
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
      <div className="bg-[#5B5B5B] w-[78vw] h-[89vh] rounded-2xl">dhirhi</div>
    </div>
  );
};

export default Profile;
