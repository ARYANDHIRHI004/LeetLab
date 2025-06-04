import { create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useExecution = create((set) => ({
    submission: null,
    isExecuting: false,

    executeCode: async ({source_code, language_id, stdin, expected_outputs, problemId}) => {
      set({isExecuting: true});
      try {
          const res = await axiosInstance.post("/execute-code",{source_code, language_id, stdin, expected_outputs, problemId})
          
          set({submission: res.data.submissionWithTestCase})
        } catch (error) {
            console.log('error while fetching', error);
            set({isExecuting: false})
        }finally{
            set({isExecuting: false});
        }
    }
    
}))