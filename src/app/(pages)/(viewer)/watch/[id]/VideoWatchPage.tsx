"use client";

import { ChannelInfo } from "@/components/features/videos/ChannelInfo";
import {CommentSection} from "@/components/features/videos/comments/CommentSection";
import { VideoCard } from "@/components/features/videos/VideoCard";
import { VideoMetadata } from "@/components/features/videos/VideoMetaData";
import VideoPlayer from "@/components/features/videos/VideoPlayer";
import Loader from "@/components/layout/Loader";
import { Separator } from "@/components/ui/separator";
import { BACKEND_BASE_URL } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { useApiGet } from "@/hooks/api_hooks";
import { VideoPlayerDetails, VideoPlayerProps } from "@/types";
import React, { useState } from "react";

const VideoWatchPage =({ params }: { params: {id:string} }) => {
  const [video, setVideo] = useState<VideoPlayerProps | null>(null);
const {id:videoId} = params
const {isAuthenticated} = useAuth()
  const { data, isFetching: isVideoFetching } = useApiGet<VideoPlayerDetails>(
    `${BACKEND_BASE_URL}/aggregate/videos/watch`,
    {
      params: {
        videoId: videoId,
      },
    },
    {
      queryKey: [videoId],
      onSuccess: (data) => {
        if (data) {
          setVideo({
            src: data.url,
            autoPlay: true,
            controls: true,
            height: "auto",
            width: "100%",
          });
        }
      },
    }
  );

  return (
    <div className="flex flex-col w-full min-h-screen bg-white p-4">
      {isVideoFetching || !data ? (
        <Loader />
      ) : (
        // <div className="flex flex-col lg:flex-row gap-6">
        //   {/* Left Side - Video + Details */}
        //   <div className="flex-1 max-w-4xl">
        //     {video && <VideoPlayer {...video} />}
            
        //     {/* Video Details */}
        //     <div className="mt-4">
        //       <h1 className="text-xl font-semibold">Video Title Placeholder</h1>
        //       <div className="text-sm text-gray-600 mt-1">1M views • 2 days ago</div>
        //       <div className="mt-4">
        //         <p className="text-gray-800">
        //           Video description goes here. This is placeholder text describing the video content.
        //         </p>
        //       </div>
        //     </div>
        //   </div>

        //   {/* Right Side - Recommended Videos */}
        //   {/* <div className="w-full lg:w-1/3 flex flex-col gap-4">
        //     <h2 className="text-lg font-semibold mb-2">Recommended</h2>
        //     {[1, 2, 3, 4, 5].map((_, i) => (
        //       <VideoCard video={} key={i} /> // Dummy placeholders for now
        //     ))}
        //   </div> */}
        // </div>
         <div className="container max-w-screen-2xl mx-auto py-6 px-4 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {video!=null && <VideoPlayer  {...video}/>}
          
          <VideoMetadata
            title={data?.title}
            views={data?.views}
            uploadDate={data.uploadedAt || new Date().toISOString()}
            likes={data.likes}
            description={data.description}
          />
          
          <Separator />
          
          <ChannelInfo
            channelName={data.channelDetails.name}
            subscribers={data.channelDetails.subscribersCount || 0}
            avatar={data.channelDetails.profile}
            verified={false}
          />
          
          <Separator />
          
        {isAuthenticated&&  <CommentSection videoId={params.id}
          />}
        </div>
        
        {/* <div className="space-y-6">
          <RelatedVideos videos={relatedVideos} />
        </div> */}
      </div>
    </div>
      )}
    </div>
  );
};

export default VideoWatchPage;
