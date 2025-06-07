import { create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const usePlaylist = create((set) => ({
    playlists: [],
    isPlaylistsLoading: false,

    playlist: null,
    isPlaylistLoading: false,



    createPlaylist: async(data) => {
        try {
          const res = await axiosInstance.post(`/playlist/create-playlist`, data)
          toast.success(res.data.message)
        } catch (error) {
            console.log('error while fetching', error);

        }        
    },
    getAllPlaylist: async() => {
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

    getPlaylistById: async(id) => {
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

    addProblemsInPlaylist: async(data, id) => {
        try {
          const res = await axiosInstance.post(`/playlist/${id}/add-problem`,data)
              toast.success(res.data.message)
        } catch (error) {
            toast.error(res.data.message)
            console.log('error while fetching', error);
        }   
    },  
    
}))
