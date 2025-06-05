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
    
})) 