import { VideoDetailsForm } from "@/types";
import React, { createContext, useState } from "react";

interface UploadVideoState {
    activeStep:number;
    videoDetails:VideoDetailsForm,
    fileUploadProgress:number,
    status:"idle" | "uploading" | "uploaded" | "error";
    nextStep?:number,
    videoId:string|null,
}

interface UploadVideoContextProps extends UploadVideoState {
  cancel:()=>void,
  setVideoId:(id:string)=>void;
  setActiveStep:(step:number)=>void
  setNextStep:()=>void;

  setVideoDetails: (data: VideoDetailsForm) => void;
  setUploadProgress: (value: number) => void;
  setStatus: (status: UploadVideoState["status"]) => void;
}

export const UploadVideoContext = createContext<UploadVideoContextProps|null>(null);

export const UploadVideoContextProvider = ({children}:{children:React.ReactNode})=>{
const [activeStep, setActiveStep] = useState<number>(0);
 
  const [videoDetails, setVideoDetails] = useState<VideoDetailsForm>(
    {
        title:"",
        visibility:"public",
        category:"",
        description:"",
       
    }
  );
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState<UploadVideoState["status"]>("idle");
  const [videoId,setVideoId] = useState<string|null>(null)
  const [nextStep,setNextStepState] = useState<number|undefined>(undefined);
  const setNextStep = ()=>{

    setNextStepState(nextStep?nextStep:0+1)
  }
  const cancel = ()=>{

  }
    return(
        <UploadVideoContext.Provider value={
         {   activeStep,
            setActiveStep,
            fileUploadProgress:uploadProgress,
            setUploadProgress,
            nextStep,
            setNextStep,
            videoId,
            setVideoId,
            status,
            setStatus,
            videoDetails,
            setVideoDetails,
            cancel
          }

        }> 
            {children}
        </UploadVideoContext.Provider>
    )
}