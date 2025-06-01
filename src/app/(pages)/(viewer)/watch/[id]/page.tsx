import React from 'react'
import VideoWatchPage from './VideoWatchPage'

const page = async({params}:{params:Promise<{id:string}>}) => {
    const {id:videoId} = await params
  return (
    <div>
        <VideoWatchPage params={{id:videoId}}/>
    </div>
  )
}

export default page