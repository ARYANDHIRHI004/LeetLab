import React, { useEffect } from "react";
import { useAuthStore } from "../Store/useAuthStore";
import { Link, useParams } from "react-router-dom";
import { useAssignments } from "../Store/useAssignments";
import { Loader } from "lucide-react";

const UserEventSection = () => {
  const { authUser } = useAuthStore();
  const { getAssignmentsById, isLoadingAssignment, Assignment } =
    useAssignments();
  const { assignmentId } = useParams();

  useEffect(() => {
    getAssignmentsById(assignmentId);
  }, [getAssignmentsById]);

  if (isLoadingAssignment) {
    return (
      <div className=" flex justify-center items-center h-[100vh] bg-black">
        <Loader color="white" className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-black h-[100vh] pt-19 px-5 text-white">
      <div className="flex gap-5">
        <div className="bg-gray-800 h-[90vh] w-[25vw] rounded-[5px] p-5">
          {!isLoadingAssignment ? (
            <div className="flex flex-col">
              <div>
                <p className="text-[18px]">
                  Event Name: <span>{Assignment?.event.name}</span>
                </p>
                <div className="text-[14px] flex justify-between mb-3">
                  <p>
                    Organization: {Assignment?.event.user.name.toUpperCase()}
                  </p>
                  <p>Email: {Assignment?.event.user.email}</p>
                </div>
                <p>Description: {Assignment?.event.description}</p>
              </div>
              <div>
                <p className="flex justify-between">
                  Date: <span>{Assignment?.event.createdAt}</span>
                </p>
                <p className="flex justify-between">
                  Time: <span>{Assignment?.event.createdAt}</span>
                </p>
                <p className="flex justify-between">
                  Mode: <span>{Assignment?.event.mode}</span>
                </p>
                <p className="flex justify-between">
                  Active: <span>{Assignment?.event.iaActive}</span>
                </p>
              </div>
            </div>
          ) : (
            "loading..."
          )}
        </div>
        <div className="bg-gray-800 h-[90vh] w-[75vw] flex flex-col gap-5 p-5 rounded-[5px]">
          <div className="bg-gray-900 h-[7vh] rounded-[5px]">
            {!isLoadingAssignment ? (
              <div className="flex justify-between text-[15px] items-center p-4">
                <p className="flex justify-between">
                  Date: <span>{Assignment?.event.eventDate}</span>
                </p>
                <p className="flex justify-between">
                  Date: <span>{Assignment?.event.eventTime}</span>
                </p>
                <p className="flex justify-between gap-2">
                  Date: <span>{Assignment?.event.mode}</span>
                </p>
              </div>
            ) : (
              "loading..."
            )}
          </div>
          <div className="bg-gray-900 h-[80vh] rounded-[5px] p-5 overflow-scroll">
            {!isLoadingAssignment ? (
              <div>
                {Assignment?.event.problems.map((problem) => (
                  <Link to={`/problem/${problem.problems.id}`}>
                    <div className="bg-gray-700 p-3 rounded-[5px]">
                      {
                        <div className="flex justify-between ">
                          <h3 className="text-[15px]">
                            {problem.problems.title}
                          </h3>
                          <p className="text-[13px]">
                            Difficulty: {problem.problems.difficulty}
                          </p>
                        </div>
                      }
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEventSection;
