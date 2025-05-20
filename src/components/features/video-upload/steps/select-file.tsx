import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { FileVideo, UploadCloud } from 'lucide-react'
import React, { ChangeEvent, useState } from 'react'

const SelectFile = () => {
     const [video, setVideo] = useState<File | null>(null);
     const [uploading,setUploading] = useState<boolean>(false);
 const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideo(file);
      setUploading(true)
    } else {
      alert("Please select a valid video file.");
    }
  };
  return (
      <div className="border-2 border-dashed border-muted rounded-xl p-6 text-center space-y-4">
      <UploadCloud className="mx-auto w-10 h-10 text-muted-foreground" />

      <div className="space-y-1 flex justify-center">
        <Label htmlFor="video-upload" className="cursor-pointer">
          <Button disabled={uploading} asChild variant="secondary">
            <span>Select Video</span>
          </Button>
        </Label>
        <input
          id="video-upload"
          type="file"
          disabled={uploading}
          accept="video/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {video && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <FileVideo className="w-4 h-4" />
          <span>{video.name}</span>
        </div>
      )}
    </div>
  )
}

export default SelectFile