import { UploadVideoContext } from "@/context/UploadVideoContext"
import { useContext } from "react"

export const useUploadContext = ()=>{
    const context = useContext(UploadVideoContext)
    if(!context)
    {
        throw new Error("Upload context should used withing the Upload Provider")
    }
    return context
}