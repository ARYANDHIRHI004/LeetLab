import { create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLogingIn: false,
    isCheckingAuth: false,

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
        set({isLogingIn: true})
      try {
          const res = await axiosInstance.post("/auth/login", data)
          
          set({authUser: res.data.user})
          toast.success(res.data.message)
        } catch (error) {
            toast.error("error signing up")
        }finally{
            set({isLogingIn: false})
        }
    },

    logout: async () => {
      try {
          const res = await axiosInstance.post("/auth/logout")
          
          set({authUser: null})
          toast.success(res.data.message)
        } catch (error) {
            toast.error("error signing up")
        }
    }
    
}))