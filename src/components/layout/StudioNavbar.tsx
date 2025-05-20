"use client";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Upload, Search, PlusIcon, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "../ui/logo";
import VideoUploadDialog from "../features/video-upload/video-upload-dialog";
import { UploadVideoContextProvider } from "@/context/UploadVideoContext";

export default function StudioNavbar() {
  return (
    <header className="h-16  fixed w-full border-b bg-background px-4 flex items-center justify-between  shadow-sm shadow-gray-900/10 z-20">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <Logo  />
       
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search videos"
          className="pl-10 bg-muted"
        />
      </div>

      {/* Right: Icons & Avatar */}
      <div className="flex items-center gap-4">
      <UploadVideoContextProvider>
        <VideoUploadDialog/>

      </UploadVideoContextProvider>
        <Avatar>
          <AvatarImage src="/avatar.png" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
