import { create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useSubmisions = create((set) => ({
    submissions: [],
    isLoading: false,

    AllSubmissions: [],
    isAllSubmissionsLoading: false,
    
    AllSubmissionsForProblem: null,
    isAllSubmissionsForProblemLoading: false,


    submissionRequest: async(id) => {
        set({isLoading: true})
        try {
          const res = await axiosInstance.get(`/submisstion/get-submission/${id}`)
              
          set({submissions: res.data.submissions})
        } catch (error) {
            console.log('error while fetching', error);
            set({isLoading: false})
        }finally{
            set({isLoading: false});
        }        
    },    

    getAllSubmission: async() => {
        set({isAllSubmissionsLoading: true})
        try {
          const res = await axiosInstance.get(`/submisstion/get-all-submissions`)
              
          set({AllSubmissions: res.data.submissions})
        } catch (error) {
            console.log('error while fetching', error);
            set({isAllSubmissionsLoading: false})
        }finally{
            set({isAllSubmissionsLoading: false});
        }        
    },    

    getAllTheSubmissionsForProblem: async() => {
        set({isAllSubmissionsForProblemLoading: true})
        try {
          const res = await axiosInstance.get(`/submisstion/get-submission-count/${id}`)
              
          set({AllSubmissionsForProblem: res.data.submissions})
        } catch (error) {
            console.log('error while fetching', error);
            set({isAllSubmissionsForProblemLoading: false})
        }finally{
            set({isAllSubmissionsForProblemLoading: false});
        }        
    },    
    
}))