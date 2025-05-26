import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Video } from 'lucide-react'
import React, { useState } from 'react'
import SelectFile from './steps/select-file'
import VideoDetails from './steps/video-details'
import Visibility from './steps/visibility'
import FinalizeVideoUpload from './steps/final'
import { useUploadVideoStore } from '@/stores/uploadStore'
import {CrossIcon} from "lucide-react"
const VideoUploadDialog = () => {
   const {activeStep,nextStep,setActiveStep,status} = useUploadVideoStore()
   const [open, setOpen] = useState(false)
    const steps = [
        {
            id:"select-file",
            title:"Select File",
            description:"Select file",
            component:<SelectFile/>
        },
        {
            id:"video-details",
            title:"Video Details",
            description:"Enter the video details",
            component:<VideoDetails/>
        },
 
            {
                id:"finalize",
                title:"Video Uploaded Successfully",
                description:"Video uploaded",
                component:<FinalizeVideoUpload/>
            }
        
    ]
  return (
    <Dialog  open={open} onOpenChange={(o)=>{
      if(!o && status!="uploading")
      {
        setOpen(o)
      }
      else{
        setOpen(o)
      }
    }}>
  <DialogTrigger asChild>
    <Button variant="ghost" onClick={()=>setOpen(true)}  className="flex items-center rounded-md bg-gray-100 hover:bg-gray-300">
              <Video className="w-5 h-5"/>
            <span>Create</span>
          
        </Button>
  </DialogTrigger>
  <DialogContent onInteractOutside={(e)=>e.preventDefault()} onEscapeKeyDown={(e)=>e.preventDefault()}>
    <DialogHeader>
      
 <DialogTitle>{steps[activeStep].title}</DialogTitle>
      <DialogDescription>
       {steps[activeStep].description}
      </DialogDescription>
     
   
     
    </DialogHeader>
    {steps[activeStep].component}
    <DialogFooter className='flex justify-end'>
    <div className='flex gap-2'>
        <Button disabled={activeStep<=1} onClick={(e)=>{setActiveStep(activeStep-1)}}>Back</Button>
        <Button disabled={activeStep==2 || activeStep>=nextStep} onClick={(e)=>{setActiveStep(activeStep+1)}}>Next</Button>
    </div>
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default VideoUploadDialog