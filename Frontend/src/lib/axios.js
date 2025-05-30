import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://api.neurocodium.com/api/v1",
    withCredentials: true,
})
