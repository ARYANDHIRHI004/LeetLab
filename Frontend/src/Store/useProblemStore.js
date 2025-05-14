import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";

export const useProblemStore = create((set) => ({
    problems:[],
    problem: null,
    solvedProblem: [],

    getAllProblems: async () => {
      try {
        const res = await axiosInstance.get("/problems/get-all-problems")
        console.log(res.data);
        set({problems: res.data.problems})
        
      } catch (error) {
        
      }
    },
    
    getProblemId: async (id) => {
      try {
        const res = await axiosInstance.get("/problems/get-problem", {
            params: id
        })
        console.log(res.data);
        set({problem: res.data.problem})
        
      } catch (error) {
        
      }
    },

    updateProblem: async () => {
      
    },

    deleteProblem: async () => {
      
    },

    getSolvedProblem: async () => {
      
    },
    

    
})) 