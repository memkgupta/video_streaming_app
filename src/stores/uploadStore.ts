import { VideoDetailsForm } from '@/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UploadVideoState {
  activeStep: number
  videoDetails: VideoDetailsForm
  fileUploadProgress: number
  status: "idle" | "uploading" | "uploaded" | "error"
  nextStep?: number
  fileKey?: string
  awsUploadId?: string
  uploadedChunks: Map<number, string>
  video: File | null
  videoId: string | null
  assetId?: string
}

interface UploadVideoActions {
  setActiveStep: (step: number) => void
  setVideo: (file: File) => void
  setVideoId: (id: string) => void
  setNextStep: () => void
  setFileKey: (key: string) => void
  setAssetId: (id: string | undefined) => void
  setUploadId: (id: string) => void
  setVideoDetails: (details: VideoDetailsForm) => void
  setUploadProgress: (value: number) => void
  setStatus: (status: UploadVideoState["status"]) => void
  cancel: () => void
  
  // Additional helper methods
  addUploadedChunk: (chunkNumber: number, etag: string) => void
  removeUploadedChunk: (chunkNumber: number) => void
  getUploadedChunksArray: () => Array<{ chunkNumber: number; etag: string }>
  getTotalUploadedChunks: () => number
}

type UploadVideoStore = UploadVideoState & UploadVideoActions
const initialState: UploadVideoState = {
  activeStep: 0,
  videoDetails: {
    title: "",
    visibility: "public",
    category: "",
    description: "",
  },
  fileUploadProgress: 0,
  status: "idle",
  uploadedChunks: new Map(),
  video: null,
  videoId: null,
}

export const useUploadVideoStore = create<UploadVideoStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      ...initialState,

      // Actions
      setActiveStep: (step) => {
        console.log("Active step changing to:", step)
        set({ activeStep: step }, false, 'setActiveStep')
      },

      setVideo: (file) => {
        console.log("Setting video:", file.name)
        set({ video: file }, false, 'setVideo')
      },

      setVideoId: (id) => {
        console.log("Setting video ID:", id)
        set({ videoId: id }, false, 'setVideoId')
      },

      setNextStep: () => {
        const currentNextStep = get().nextStep ?? 0
        const newStep = currentNextStep + 1
        console.log("Next step changing to:", newStep)
        set({ nextStep: newStep }, false, 'setNextStep')
      },

      setFileKey: (key) => {
        console.log("Setting file key:", key)
        set({ fileKey: key }, false, 'setFileKey')
      },

      setAssetId: (id) => {
        console.log("Setting asset ID:", id)
        set({ assetId: id }, false, 'setAssetId')
      },

      setUploadId: (id) => {
        console.log("Setting upload ID:", id)
        set({ awsUploadId: id }, false, 'setUploadId')
      },

      setVideoDetails: (details) => {
        console.log("Setting video details:", details)
        set({ videoDetails: details }, false, 'setVideoDetails')
      },

      setUploadProgress: (value) => {
        console.log("Setting upload progress:", value)
        set({ fileUploadProgress: value }, false, 'setUploadProgress')
      },

      setStatus: (status) => {
        console.log("Setting status:", status)
        set({ status }, false, 'setStatus')
      },

      cancel: () => {
        console.log("Resetting state")
        const newChunks = new Map()
        set({
          ...initialState,
          uploadedChunks: newChunks,
        }, false, 'cancel')
      },

      // Additional helper methods for uploaded chunks
      addUploadedChunk: (chunkNumber, etag) => {
        const currentChunks = get().uploadedChunks
        const newChunks = new Map(currentChunks)
        newChunks.set(chunkNumber, etag)
        console.log(`Adding uploaded chunk ${chunkNumber}:`, etag)
        set({ uploadedChunks: newChunks }, false, 'addUploadedChunk')
      },

      removeUploadedChunk: (chunkNumber) => {
        const currentChunks = get().uploadedChunks
        const newChunks = new Map(currentChunks)
        newChunks.delete(chunkNumber)
        console.log("Removing uploaded chunk:", chunkNumber)
        set({ uploadedChunks: newChunks }, false, 'removeUploadedChunk')
      },

      getUploadedChunksArray: () => {
        const chunks = get().uploadedChunks
        return Array.from(chunks.entries()).map(([chunkNumber, etag]) => ({
          chunkNumber,
          etag,
        }))
      },

      getTotalUploadedChunks: () => {
        return get().uploadedChunks.size
      },
    }),
    {
      name: 'upload-video-store', // DevTools name
    }
  )
)

// Selector hooks for better performance (optional but recommended)
export const useUploadVideoSelectors = {
  // Basic selectors
  activeStep: () => useUploadVideoStore(state => state.activeStep),
  video: () => useUploadVideoStore(state => state.video),
  videoId: () => useUploadVideoStore(state => state.videoId),
  videoDetails: () => useUploadVideoStore(state => state.videoDetails),
  uploadProgress: () => useUploadVideoStore(state => state.fileUploadProgress),
  status: () => useUploadVideoStore(state => state.status),
  
  // Computed selectors
  isUploading: () => useUploadVideoStore(state => state.status === 'uploading'),
  isUploaded: () => useUploadVideoStore(state => state.status === 'uploaded'),
  hasError: () => useUploadVideoStore(state => state.status === 'error'),
  isIdle: () => useUploadVideoStore(state => state.status === 'idle'),
  hasVideo: () => useUploadVideoStore(state => state.video !== null),
  hasVideoId: () => useUploadVideoStore(state => state.videoId !== null),
  
  // Upload progress helpers
  uploadProgressPercent: () => useUploadVideoStore(state => Math.round(state.fileUploadProgress * 100)),
  
  // Chunks helpers
  totalChunks: () => useUploadVideoStore(state => state.uploadedChunks.size),
  uploadedChunksArray: () => useUploadVideoStore(state => 
    Array.from(state.uploadedChunks.entries()).map(([chunkNumber, etag]) => ({
      chunkNumber,
      etag,
    }))
  ),
}

// Actions-only hook for components that only need actions
export const useUploadVideoActions = () => useUploadVideoStore(state => ({
  setActiveStep: state.setActiveStep,
  setVideo: state.setVideo,
  setVideoId: state.setVideoId,
  setNextStep: state.setNextStep,
  setFileKey: state.setFileKey,
  setAssetId: state.setAssetId,
  setUploadId: state.setUploadId,
  setVideoDetails: state.setVideoDetails,
  setUploadProgress: state.setUploadProgress,
  setStatus: state.setStatus,
  cancel: state.cancel,
  addUploadedChunk: state.addUploadedChunk,
  removeUploadedChunk: state.removeUploadedChunk,
  getUploadedChunksArray: state.getUploadedChunksArray,
  getTotalUploadedChunks: state.getTotalUploadedChunks,
}))

// Reset function for testing or manual reset
export const resetUploadVideoStore = () => {
  useUploadVideoStore.setState({
    ...initialState,
    uploadedChunks: new Map(),
  }, false)
}