import { create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isCheckingAuth: false,
    Allusers:[],
    isLoadingAllusers:false,

    checkAuth: async () => {
      set({isCheckingAuth: true});
      try {
          const res = await axiosInstance.get("/auth/check")
          
          set({authUser: res.data.user})
        } catch (error) {
            set({authUser: null})
        }finally{
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({isSigningUp: true})
      try {
          const res = await axiosInstance.post("/auth/register", data)
          
          
          set({authUser: res.data.user})
          toast.success(res.data.message)
        } catch (error) {
            toast.error("error signing up")
        }finally{
            set({isSigningUp: false})
        }
    },

    login: async (data) => {
        set({isLoggingIn: true})
        try {
            const res = await axiosInstance.post("/auth/login", data)
            console.log(res.data.user);
            set({authUser: res.data.user})
            toast.success(res.data.message)
        } catch (error) {
            toast.error("error signing up")
        }finally{
            set({isLoggingIn: false})
        }
    },
    
    logout: async () => {
        set({isLoggingOut: true})
        try {
            const res = await axiosInstance.post("/auth/logout")
            
            set({authUser: null})
            toast.success(res.data.message)
        } catch (error) {
            toast.error("error signing up")
        }
        set({isLoggingOut: false})
    },

    getAllUsers: async () => {
        set({isLoadingAllusers: true})
        try {
            const res = await axiosInstance.get("/auth/getAllUser")
            
            set({Allusers: res.data.allExistingUser})
            toast.success(res.data.message)
        } catch (error) {
            toast.error("error signing up")
        }
        set({isLoadingAllusers: false})
    }
    
}))