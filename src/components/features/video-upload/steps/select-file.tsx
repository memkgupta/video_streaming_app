import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useChannel } from '@/hooks/use-channel'
import { useUploadContext } from '@/hooks/use-upload-context'
import api from '@/services/api'
import { useUploadVideoStore } from '@/stores/uploadStore'
import { APIResponse, FileUploadDetails, Video } from '@/types'
import axios from 'axios'
import { FileVideo, UploadCloud } from 'lucide-react'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

const SelectFile = () => {
  const CHUNK_SIZE = 5 * 1024 * 1024

  const { state: channelState } = useChannel()
 const { videoId, setVideoId, status, setStatus,setActiveStep,setAssetId,setUploadId,setNextStep } = useUploadVideoStore()
  const [video, setVideo] = useState<File | null>(null)
  // const [videoId, setVideoId] = useState<string | null>(null)
  // const [assetId, setAssetId] = useState<string | null>(null)
  // const [uploadId, setUploadId] = useState<string | null>(null)
  const [fileKey, setFileKey] = useState<string | null>(null)

  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const uploadedChunks = useRef<Map<number, string>>(new Map())

  const initiateVideoUpload = async () => {
    try {
      const res = await api.post<APIResponse<Video>>(`/video/videos/newDraft`, {}, {
        params: {
          channelId: channelState?.channelId || channelState?.id
        }
      })
      return res.data.data?.id || null
    } catch {
     throw new Error("Error uploading draft")
    }
  }

  const initiateFileUpload = async (file: File,videoId:string) => {
    try {
      const res = await api.post<APIResponse<FileUploadDetails>>(`/asset_onboarding/start-upload`, {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        videoId:videoId
      })

      const uploadResponse = res.data.data
      if (!uploadResponse?.assetId || !uploadResponse.uploadId || !uploadResponse.key) {
        throw new Error("Upload initiation failed")
      }

      setAssetId(uploadResponse.assetId)
      setUploadId(uploadResponse.uploadId)
      setFileKey(uploadResponse.key)
      return uploadResponse
    } catch (error: any) {
      toast.error("Some error occurred while initiating upload")
      throw new Error(error.message)
    }
  }

  const uploadFile = async (
    video: File,
    assetId: string,
    uploadId: string,
    fileKey: string
  ) => {
    if (!video || !assetId || !uploadId || !fileKey) return

    try {
      const totalChunks = Math.ceil(video.size / CHUNK_SIZE)

      for (let partNumber = 1; partNumber <= totalChunks; partNumber++) {
        const start = (partNumber - 1) * CHUNK_SIZE
        const end = Math.min(start + CHUNK_SIZE, video.size)
        const chunk = video.slice(start, end)

        try {
          const { data } = await api.post<APIResponse<{ url: string }>>(`/asset_onboarding/upload-chunk`, {
            key: fileKey,
            uploadId,
            assetId,
            partNumber,
          })

          if (!data || !data.data) throw new Error("Some error occurred")

          const res = await axios.put(data.data.url, chunk, {
            headers: {
              "Content-Type": "application/octet-stream",
            },
          })

          const ETag = res.headers["etag"]
          if (!ETag) throw new Error(`Missing ETag for part ${partNumber}`)

          uploadedChunks.current.set(partNumber, ETag)
          setUploadProgress((partNumber / totalChunks) * 100)
        } catch (err) {
          console.error(`Upload failed at part ${partNumber}`, err)
          throw new Error(`Failed to upload part ${partNumber}`)
        }
      }

      await api.post("/asset_onboarding/complete-upload", {
        uploadId,
        key: fileKey,
        etagMap: Object.fromEntries(uploadedChunks.current),
        assetId,
      })

      setStatus("uploaded")
      toast.success("Upload completed successfully!")
      setNextStep()
    } catch (error: any) {
      setStatus("error")
      toast.error(error?.message || "Something went wrong during video upload")
    }
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (status !== 'idle') {
      toast.error("One video is already being uploaded")
      return
    }

    const file = e.target.files?.[0]
    if (file && file.type.startsWith("video/")) {
      setVideo(file)
      setStatus("uploading")
      uploadedChunks.current.clear()
      setUploadProgress(0)

      try {
        const newVideoId = await initiateVideoUpload()
        if (!newVideoId) {
          setStatus("error")
          toast.error("Failed to create video draft")
          return
        }

        setVideoId(newVideoId)
        const { assetId, uploadId, key } = await initiateFileUpload(file,newVideoId)
        await uploadFile(file, assetId, uploadId, key)
      } catch (error) {
        setStatus("error")
        toast.error("Something went wrong while uploading.")
      }
    } else {
      toast.error("Please select a valid video file.")
    }
  }
useEffect(() => {
  console.log("Context state changed:",videoId);
}, [videoId]);
  return (
    <div className="border-2 border-dashed border-muted rounded-xl p-6 text-center space-y-4">
      <UploadCloud className="mx-auto w-10 h-10 text-muted-foreground" />

      <div className="space-y-1 flex justify-center">
        <Label htmlFor="video-upload" className="cursor-pointer">
          <Button disabled={status === "uploading"} asChild variant="secondary">
            <span>Select Video</span>
          </Button>
        </Label>
        <input
          id="video-upload"
          type="file"
          disabled={status === "uploading"}
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

      {status === "uploading" && (
        <div className="w-full bg-muted h-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      {/* Your Next button example */}
    
    </div>
  )
}

export default SelectFile
