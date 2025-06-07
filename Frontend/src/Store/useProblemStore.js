import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProblemStore = create((set) => ({
    problems:[],
    problem: null,
    solvedProblem: [],
    isProblemsLoading: false,
    isProblemLoading: false,
    isSolvedProblemLoading: false,
    problemsCreatedByme:[],
    isproblemsCreatedBymeLoading: false,
    isCreating: false,
    
    createProblem: async (data) => {
      try {
        
        set({isCreating: true})
        const res = await axiosInstance.post("/problems/create-problem", data)
        
        // set({problems: res.data.problems})
        toast.success(res.data.message)
        
      } catch (error) {
        console.log("error", error);
        set({isCreating: false})
        
      }
      finally{
        set({isCreating: false})
      }
    },

    getAllProblems: async () => {
      try {
        
        set({isProblemsLoading: true})
        const res = await axiosInstance.get("/problems/get-all-problems")
        
        set({problems: res.data.problems})
        
      } catch (error) {
        console.log("error", error);
        
      }
      finally{
        set({isProblemsLoading: false})
      }
    },
    
    getProblemId: async (id) => {
      
      try {
        set({isProblemLoading: true})
        const res = await axiosInstance.get(`/problems/get-problem/${id}`);
        set({problem: res.data.problem})
        
      } catch (error) {
        console.log("error", error);
        
      }finally{
        set({isProblemLoading: false})
      }
    },
    
    getSolvedProblemByUser: async () => {
      try {
        set({isSolvedProblemLoading: true})
        const res = await axiosInstance.get("/problems/get-solved-problems")
        set({solvedProblem: res.data.problems})
      } catch (error) {
        set({isSolvedProblemLoading: false})
        console.log("error", error);
      }finally{
        set({isSolvedProblemLoading: false})
      }
    },

    getAllProblemsCreatedByMe: async () => {
      try {
        set({isproblemsCreatedBymeLoading: true})
        const res = await axiosInstance.get("/problems/get-all-problems-created-by-me")
        set({problemsCreatedByme: res.data.problems})
      } catch (error) {
        set({isproblemsCreatedBymeLoading: false})
        console.log("error", error);
      }finally{
        set({isproblemsCreatedBymeLoading: false})
      }
    },
    
})) 