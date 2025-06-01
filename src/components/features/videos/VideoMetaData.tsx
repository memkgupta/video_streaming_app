'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Share2, Bookmark, MoreHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatCount, formatDate } from '@/lib/formatters';

interface VideoMetadataProps {
  title: string;
  views: number;
  uploadDate: string;
  likes: number;
  description: string;
}

export function VideoMetadata({ title, views, uploadDate, likes, description }: VideoMetadataProps) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const formattedDate = formatDate(uploadDate);
  const truncatedDescription = description.length > 200 && !showFullDescription
    ? `${description.substring(0, 200)}...`
    : description;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold md:text-2xl">{title}</h1>
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted-foreground">
          {formatCount(views)} views • {formattedDate}
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant={liked ? "default" : "outline"}
            size="sm"
            className="gap-1"
            onClick={handleLike}
          >
            <ThumbsUp size={16} className={liked ? "fill-current" : ""} />
            <span>{formatCount(liked ? likes + 1 : likes)}</span>
          </Button>
          
          <Button
            variant={disliked ? "default" : "outline"}
            size="sm"
            onClick={handleDislike}
          >
            <ThumbsDown size={16} className={disliked ? "fill-current" : ""} />
          </Button>
          
          <Button variant="outline" size="sm" className="gap-1">
            <Share2 size={16} />
            <span className="hidden md:inline">Share</span>
          </Button>
          
          <Button
            variant={saved ? "default" : "outline"}
            size="sm"
            className="gap-1"
            onClick={handleSave}
          >
            <Bookmark size={16} className={saved ? "fill-current" : ""} />
            <span className="hidden md:inline">Save</span>
          </Button>
          
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <MoreHorizontal size={16} />
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="rounded-lg bg-muted/50 p-4">
        <div className={showFullDescription ? "" : "line-clamp-2"}>
          <p className="whitespace-pre-line text-sm">{truncatedDescription}</p>
        </div>
        
        {description.length > 200 && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 flex items-center gap-1"
            onClick={toggleDescription}
          >
            {showFullDescription ? (
              <>
                <span>Show less</span>
                <ChevronUp size={16} />
              </>
            ) : (
              <>
                <span>Show more</span>
                <ChevronDown size={16} />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}