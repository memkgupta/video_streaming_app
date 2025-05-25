"use client"
import queryClient from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { createContext,ReactNode, useState } from "react";

interface ChannelState {
    channelId:string,
    id?:string
    name:string,
    description:string,
    links:{title:string,url:string}[],
    handle:string,
    banner?:string,
    profile?:string,
    userId:string
}
interface ChannelContextProps {
    state:ChannelState|null,
    setState:(data:ChannelState|null)=>void
}
export const ChannelContext = createContext<ChannelContextProps|null>(null);

export const ChannelContextProvider = ({children}:{children:ReactNode})=>{
    const [state,setState] = useState<ChannelState|null>(null)
    return(
        <QueryClientProvider client={queryClient}>
  <ChannelContext.Provider value={{state,setState}}>
            {children}
        </ChannelContext.Provider>
        </QueryClientProvider>
      
    )
}