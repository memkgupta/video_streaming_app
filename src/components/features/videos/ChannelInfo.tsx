'use client';

import { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { formatCount } from '@/lib/formatters';

interface ChannelInfoProps {
  channelName: string;
  subscribers: number;
  avatar: string;
  verified?: boolean;
}

export function ChannelInfo({ channelName, subscribers, avatar, verified = false }: ChannelInfoProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  return (
    <div className="flex items-start sm:items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
          <img src={avatar} alt={channelName} />
        </Avatar>
        
        <div>
          <div className="flex items-center gap-1">
            <h3 className="text-sm font-medium sm:text-base">{channelName}</h3>
            
            {verified && (
              <svg
                className="h-4 w-4 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground">
            {formatCount(subscribers)} subscribers
          </p>
        </div>
      </div>
      
      <Button
        variant={isSubscribed ? "outline" : "default"}
        onClick={handleSubscribe}
        className="transition-all"
      >
        {isSubscribed ? "Subscribed" : "Subscribe"}
      </Button>
    </div>
  );
}