import { create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSignedUp: false,
    isLoggedIn: false,
    isCheckingAuth: false,

    checkAuth: async () => {
      set({isCheckingAuth: true});
      try {
          const res = await axiosInstance.get("/auth/check")
          console.log(res.data)
          
          set({authUser: res.data.user})
        } catch (error) {
            set({authUser: null})
        }finally{
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({isSignedUp: true})
      try {
          const res = await axiosInstance.post("/auth/register", data)
          console.log(res.data)
          
          set({authUser: res.data.user})
          toast.success(res.data.message)
        } catch (error) {
            toast.error("error signing up")
        }finally{
            set({isSignedUp: false})
        }
    },

    login: async (data) => {
        set({isLoggedIn: true})
      try {
          const res = await axiosInstance.post("/auth/login", data)
          console.log(res.data)
          
          set({authUser: res.data.user})
          toast.success(res.data.message)
        } catch (error) {
            toast.error("error signing up")
        }finally{
            set({isLoggedIn: false})
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