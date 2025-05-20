import { UploadVideoContext } from "@/context/UploadVideoContext"
import { useContext } from "react"

export const useUploadContext = ()=>{
    return useContext(UploadVideoContext)
}