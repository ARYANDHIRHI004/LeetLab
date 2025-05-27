import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://172.105.60.107/api/v1",
    withCredentials: true
})
