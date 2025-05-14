import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://leetlab.onrender.com/api/v1",
    withCredentials: true
})
