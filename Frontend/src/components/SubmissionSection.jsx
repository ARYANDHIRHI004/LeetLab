import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSubmisions } from "../Store/useSubmissions";
import { Loader } from "lucide-react";
import { useExecution } from "../Store/useExecution";

const SubmissionSection = () => {
  const { submissions, submissionRequest, isLoading } = useSubmisions();
  const { submitResult } = useExecution();
  const { id } = useParams();

  useEffect(() => {
    submissionRequest(id);
  }, [submissionRequest, submitResult]);

  return (
    <div>
      {submissions?.length !== 0 ? (
        !isLoading ? (
          <div>
            {
              <div className="text-[13px]">
                <table className="w-full text-left bg-gray-600 rounded-2xl  ">
                  <thead className=" bg-gray-700  h-10 ">
                    <tr>
                      <th className="p-5">Status</th>
                      <th>Language</th>
                      <th>Time</th>
                      <th>Memory</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions?.map((submission) => (
                      <tr>
                        <td
                          className={`${
                            submission.status === "Accepted"
                              ? "text-green-400"
                              : "text-red-400"
                          } h-8 p-5 font`}
                        >
                          {submission.status}
                        </td>
                        <td>{submission.language}</td>
                        <td>{JSON.parse(submission.memory).join(" ") || ""}</td>
                        <td>{JSON.parse(submission.time).join(" ") || ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }
          </div>
        ) : (
          <div className=" flex justify-center h-[50vh] items-center">
            <Loader className="size-10 animate-spin" />
          </div>
        )
      ) : (
        <div>No Submissions</div>
      )}
    </div>
  );
};

export default SubmissionSection;
