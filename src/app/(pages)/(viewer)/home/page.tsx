"use client"
import { VideoCard } from '@/components/features/videos/VideoCard'
import { useApiInfinite } from '@/hooks/api_hooks'
import { APIResponse, Video } from '@/types'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [ress,setRess] = useState<any>()
  const {data,isFetching} = useApiInfinite<APIResponse<Video[]>>(`/video/videos`,{params:{

  }},{
    queryKey:[""],
    onSuccess:(data)=>{
      console.log(data)
    }
  })
  useEffect(()=>{
    console.log(data)
  },[data])
  return (
    <div>
  <div className="p-12">
   {data?.pages.map((page,index)=>(
    <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ' key={index}>
       {page.data.data?.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
   ))}
    </div>
    </div>
  )
}

export default Home