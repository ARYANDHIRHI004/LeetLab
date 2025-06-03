import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.VITE_BASEURL,
    withCredentials: true,
  
})
