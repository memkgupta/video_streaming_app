"use client"
import React, { useEffect, useRef, useState } from 'react'
import Hls, { Level } from "hls.js";
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VideoPlayerProps } from '@/types';

const VideoPlayer = ({src,autoPlay=true,controls=true,width = "100%",
  height = "auto"}:VideoPlayerProps) => {
     const videoRef = useRef<HTMLVideoElement | null>(null);
     const hlsRef = useRef<Hls | null>(null);

  const [levels, setLevels] = useState<Level[]>([]);
  const [currentLevel, setCurrentLevel] = useState<string>("auto");
   useEffect(() => {
   const video = videoRef.current;

    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
        setLevels(data.levels);
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
        const current = hls.levels[data.level];
        console.log("Switched to:", current);
      });

    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }

    return () => {
      hlsRef.current?.destroy();
    };
  }, [src]);
   const handleQualityChange = (value: string) => {
    setCurrentLevel(value);
    if (!hlsRef.current) return;

    if (value === "auto") {
      hlsRef.current.currentLevel = -1;
    } else {
      hlsRef.current.currentLevel = parseInt(value, 10);
    }
  };
  return (
     <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-4 space-y-4">
        <video
          ref={videoRef}
          autoPlay={autoPlay}
          controls={controls}
          className="rounded-lg w-full"
        />

        {levels.length > 0 && (
          <div className="w-48">
            <Select value={currentLevel} onValueChange={handleQualityChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                {levels.map((level, idx) => (
                  <SelectItem key={idx} value={idx.toString()}>
                    {level.height}p
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default VideoPlayer