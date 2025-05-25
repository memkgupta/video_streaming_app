import { ChannelContext } from "@/context/ChannelContext";
import { useContext } from "react";

export const useChannel = ()=>{
    const context = useContext(ChannelContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}