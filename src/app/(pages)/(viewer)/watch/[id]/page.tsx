"use client"
import { VideoCard } from '@/components/features/videos/VideoCard'
import VideoPlayer from '@/components/features/videos/VideoPlayer'
import Loader from '@/components/layout/Loader'
import { BACKEND_BASE_URL } from '@/constants'
import { useApiGet } from '@/hooks/api_hooks'
import { APIResponse, Video, VideoPlayerDetails, VideoPlayerProps } from '@/types'
import React, { useState } from 'react'

const VideoWatchPage = ({params}:{params:{id:string}}) => {
  const [video,setVideo] = useState<VideoPlayerProps|null>(null);
  const {data,isFetching:isVideoFetching} = useApiGet<VideoPlayerDetails>(`${BACKEND_BASE_URL}/aggregate/videos/watch`,
    {params:{
      videoId:params.id
    }},
    {
      queryKey:[params.id],
      onSuccess :(data)=> {
       
        const videoData = data
        console.log(videoData)
        if(videoData!=undefined)
        {
            setVideo({
            src:videoData.url,
            autoPlay:true,
            controls:true,
            height:"auto",
            width:"100%"
          })
        }
        
      },
    }
  )
  return (
    <div>
      {isVideoFetching ? <Loader/> :(
        <div>
           {video!=null && <VideoPlayer {...video}></VideoPlayer>}
          </div>


      )}
      
    </div>
  )
}

export default VideoWatchPage