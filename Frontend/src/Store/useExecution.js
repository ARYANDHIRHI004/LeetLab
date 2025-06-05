import { create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useExecution = create((set) => ({
    runResult: null,
    submitResult: null,
    isRunning: false,
    isSubmitting: false,

    clearRunResult: () => {
       set({runResult: null});
    },
    

    runCode: async ({source_code, language_id, stdin, expected_outputs, problemId}) => {
        set({isRunning: true});
        console.log(source_code);
      try {
          const res = await axiosInstance.post("/execute-code/run",{source_code, language_id, stdin, expected_outputs, problemId})
          console.log(res.data);
          
          set({runResult: res.data})
        } catch (error) {
            console.log('error while fetching', error);
            set({isRunning: false})
        }finally{
            set({isRunning: false});
        }
    },

    submitCode: async ({source_code, language_id, stdin, expected_outputs, problemId}) => {
        set({isSubmitting: true});
        console.log(source_code);
      try {
          const res = await axiosInstance.post("/execute-code/submit",{source_code, language_id, stdin, expected_outputs, problemId})
          console.log(res.data);
          
          set({submitResult: res.data.submissionWithTestCase})
        } catch (error) {
            console.log('error while fetching', error);
            set({isSubmitting: false})
        }finally{
            set({isSubmitting: false});
        }
    }

    
}))