import { create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAssignments = create((set) => ({

    assignmentCreated: null,
    isCreatingAssignment: false,

    allAssignments: [],
    isLoadingAllAssignments: false,


    createAssignment: async(data) => {
        set({isCreatingAssignment: true})
        try {
          const res = await axiosInstance.post(`/assignment/create-assignment`, data)
         set({assignmentCreated: res.data.message})
        } catch (error) {
            console.log('error while fetching', error);

        }        
    },
    getAllAssignments: async() => {
        set({isLoadingAllAssignments: true})
        try {
          const res = await axiosInstance.get(`/assignment/get-all-assignments`)
              
          set({allAssignments: res.data.allAssignments})
        } catch (error) {
            console.log('error while fetching', error);
            set({isLoadingAllAssignments: false})
        }finally{
            set({isLoadingAllAssignments: false});
        }        
    },

    getAssignmentsById: async(id) => {
        set({isPlaylistLoading: true})
        try {
          const res = await axiosInstance.get(`/assignment/${id}`)
              
          set({playlist: res.data.playlist})
        } catch (error) {
            console.log('error while fetching', error);
            set({isPlaylistLoading: false})
        }finally{
            set({isPlaylistLoading: false});
        }        
    },
    
}))
