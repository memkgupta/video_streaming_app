import { Button } from '@/components/ui/button';
import { CopyIcon, ExternalLinkIcon } from 'lucide-react';
import React, { useState } from 'react'

const FinalizeVideoUpload = () => {
     const [copied, setCopied] = useState(false);
     const thumbnailUrl = ""
     const videoUrl = ""
     const title = ""
  const handleCopy = () => {
    navigator.clipboard.writeText(videoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
   <div className="border rounded-xl p-6 shadow-md w-full  mx-auto space-y-4">
      <div className="flex flex-col  gap-4">
        <div className="relative w-full md:w-60 h-32 rounded overflow-hidden border">
          <img
            src={thumbnailUrl}
            alt="Video thumbnail"
           
            className="object-cover"
          />
        </div>

        <div className="flex-1 space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>

          <div className="text-sm break-all text-muted-foreground">
            {videoUrl}
          </div>

          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <CopyIcon className="w-4 h-4 mr-2" />
              {copied ? "Copied!" : "Copy Link"}
            </Button>

            <a href={videoUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="sm">
                <ExternalLinkIcon className="w-4 h-4 mr-2" />
                Open
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinalizeVideoUpload