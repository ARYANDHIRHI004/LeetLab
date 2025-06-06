import { create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAssignments = create((set) => ({

    assignmentCreated: null,
    isCreatingAssignment: false,

    allAssignments: [],
    isLoadingAllAssignments: false,
    
    Assignment: null,
    isLoadingAssignment: false,

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
        set({isLoadingAssignment: true})
        try {
          const res = await axiosInstance.get(`/assignment/get-assignment/${id}`)
              
          set({Assignment: res.data.assignment})
        } catch (error) {
            console.log('error while fetching', error);
            set({isLoadingAssignment: false})
        }finally{
            set({isLoadingAssignment: false});
        }        
    },
    
}))
