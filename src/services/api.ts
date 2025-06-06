import { BACKEND_BASE_URL } from "@/constants";
import { APIResponse } from "@/types";
import { getAuthToken } from "@/utils/cookies";
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import {toast} from "sonner"
import { refreshAuth } from "./auth";
const api : AxiosInstance = axios.create({
    baseURL:BACKEND_BASE_URL,
   withCredentials:true,
    timeout:30000
})

api.interceptors.request.use(
    async(config:InternalAxiosRequestConfig)=>{
        const token = getAuthToken();
        if(token && config.headers && !config.url?.endsWith("/refresh-token") && !config.url?.endsWith("/login") && !config.url?.endsWith("/register") )
        {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if(!token && !config.url?.endsWith("/refresh-token") && !config.url?.endsWith("/login") && !config.url?.endsWith("/register") )
        {
          console.log("hello")
        console.log(  await refreshAuth())
          config.headers.Authorization = `Bearer ${getAuthToken()}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response:AxiosResponse):AxiosResponse=>{
        return response;
    },
    (error)=>{
        const aError = error as AxiosError<APIResponse<string>>
        const status = aError.response?.status;
    const msg = aError.response?.data.message || error.message;
    console.log(msg)
if (!aError.response) {
      toast.error("Network error. Please check your internet connection.");
    } else if (status === 400 || status === 422) {
      toast.error(msg);
    } else if (status === 401) {
      toast.error("You’ve been logged out.");
      // maybe redirect
    } else if (status === 403) {
      toast("Permission denied", { icon: "🔒" });
    } else if (status === 404) {
      toast("Not found", { icon: "🔎" });
    } else if (status! >= 500) {
      toast.error("Server error. Try again later.");
    }
    else{
      toast.error(msg)
    }
        
        return error;
    }
)
export default api
// Generic GET request
