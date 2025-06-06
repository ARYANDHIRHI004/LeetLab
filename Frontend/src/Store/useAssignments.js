import { create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAssignments = create((set) => ({


    createAssignment: async(data) => {
        try {
          const res = await axiosInstance.post(`/playlist/create-playlist`, data)
              
        } catch (error) {
            console.log('error while fetching', error);

        }        
    },
    getAllAssignments: async() => {
        set({isPlaylistsLoading: true})
        try {
          const res = await axiosInstance.get(`/playlist`)
              
          set({playlists: res.data.playLists})
        } catch (error) {
            console.log('error while fetching', error);
            set({isPlaylistsLoading: false})
        }finally{
            set({isPlaylistsLoading: false});
        }        
    },

    getAssignmentsById: async(id) => {
        set({isPlaylistLoading: true})
        try {
          const res = await axiosInstance.get(`/playlist/${id}`)
              
          set({playlist: res.data.playlist})
        } catch (error) {
            console.log('error while fetching', error);
            set({isPlaylistLoading: false})
        }finally{
            set({isPlaylistLoading: false});
        }        
    },
    
}))
