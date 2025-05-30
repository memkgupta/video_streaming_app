"use client"
import Loader from '@/components/layout/Loader';
import StudioNavbar from '@/components/layout/StudioNavbar';
import StudioSideBar from '@/components/layout/StudioSideBar';
import { useAuth } from '@/context/AuthContext';
import { UploadVideoContextProvider } from '@/context/UploadVideoContext';
import { useApiGet } from '@/hooks/api_hooks';
import { useChannel } from '@/hooks/use-channel';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
const ChannelLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const authContext = useAuth()
  const channelContext = useChannel()
  if(!authContext.isAuthenticated){
    router.replace("/login")
  }
 const {data,isFetching,isSuccess} = useApiGet("/channel/channel/my-channel",{
  
  },{
    queryKey:[""],
    onSuccess:(d:any)=>{
      channelContext.setState(d)
    }
  });

  return (
    <>
    {
      isFetching ?<Loader/>:
      (

   (
       <div className="h-screen w-screen">
      {/* Fixed navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <StudioNavbar />
      </div>

      {/* Fixed sidebar */}
      <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 z-40 border-r bg-muted">
        <StudioSideBar />
      </div>

   <main className="pl-64 pt-16 h-full overflow-auto p-6">
        {children}
      </main>

      {/* Scrollable content */}
   
    </div>
    )

      )
    }
    </>

  
  );
};

export default ChannelLayout;
