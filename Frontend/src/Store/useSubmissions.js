import { create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useSubmisions = create((set) => ({
    submissions: null,
    isLoading: false,


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
    
}))