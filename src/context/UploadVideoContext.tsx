"use client"
import React, { createContext, useReducer, useEffect, useRef } from "react";
import { VideoDetailsForm } from "@/types";

// State type
interface UploadVideoState {
  activeStep: number;
  videoDetails: VideoDetailsForm;
  fileUploadProgress: number;
  status: "idle" | "uploading" | "uploaded" | "error";
  nextStep?: number;
  fileKey?: string;
  awsUploadId?: string;
  uploadedChunks: React.RefObject<Map<number, string>>;
  video: File | null;
  videoId: string | null;
  assetId?: string;
}

// Action types
type UploadVideoAction =
  | { type: "SET_ACTIVE_STEP"; payload: number }
  | { type: "SET_VIDEO"; payload: File }
  | { type: "SET_VIDEO_ID"; payload: string }
  | { type: "SET_NEXT_STEP" }
  | { type: "SET_FILE_KEY"; payload: string }
  | { type: "SET_ASSET_ID"; payload: string | undefined }
  | { type: "SET_UPLOAD_ID"; payload: string }
  | { type: "SET_VIDEO_DETAILS"; payload: VideoDetailsForm }
  | { type: "SET_UPLOAD_PROGRESS"; payload: number }
  | { type: "SET_STATUS"; payload: UploadVideoState["status"] }
  | { type: "RESET"; uploadedChunks: React.RefObject<Map<number, string>> };

// Reducer function
function uploadReducer(state: UploadVideoState, action: UploadVideoAction): UploadVideoState {
  switch (action.type) {
    case "SET_ACTIVE_STEP": {
      console.log("Active step changing to:", action.payload);
      return { ...state, activeStep: action.payload };
    }
    case "SET_VIDEO": {
      console.log("Setting video:", action.payload.name);
      return { ...state, video: action.payload };
    }
    case "SET_VIDEO_ID": {
      console.log("Setting video ID:", action.payload);
      return { ...state, videoId: action.payload };
    }
    case "SET_NEXT_STEP": {
      const newStep = (state.nextStep ?? 0) + 1;
      console.log("Next step changing to:", newStep);
      return { ...state, nextStep: newStep };
    }
    case "SET_FILE_KEY": {
      console.log("Setting file key:", action.payload);
      return { ...state, fileKey: action.payload };
    }
    case "SET_ASSET_ID": {
      console.log("Setting asset ID:", action.payload);
      return { ...state, assetId: action.payload };
    }
    case "SET_UPLOAD_ID": {
      console.log("Setting upload ID:", action.payload);
      return { ...state, awsUploadId: action.payload };
    }
    case "SET_VIDEO_DETAILS": {
      console.log("Setting video details:", action.payload);
      return { ...state, videoDetails: action.payload };
    }
    case "SET_UPLOAD_PROGRESS": {
      console.log("Setting upload progress:", action.payload);
      return { ...state, fileUploadProgress: action.payload };
    }
    case "SET_STATUS": {
      console.log("Setting status:", action.payload);
      return { ...state, status: action.payload };
    }
    case "RESET": {
      console.log("Resetting state");
      // Clear the uploaded chunks map
      action.uploadedChunks.current?.clear();
      return {
        activeStep: 0,
        videoDetails: {
          title: "",
          visibility: "public",
          category: "",
          description: "",
        },
        fileUploadProgress: 0,
        status: "idle",
        uploadedChunks: action.uploadedChunks,
        video: null,
        videoId: null,
      };
    }
    default:
      return state;
  }
}

// Context interface
interface UploadVideoContextType extends UploadVideoState {
  setActiveStep: (step: number) => void;
  setVideo: (file: File) => void;
  setVideoId: (id: string) => void;
  setNextStep: () => void;
  setFileKey: (key: string) => void;
  setAssetId: (id: string | undefined) => void;
  setUploadId: (id: string) => void;
  setVideoDetails: (details: VideoDetailsForm) => void;
  setUploadProgress: (value: number) => void;
  setStatus: (status: UploadVideoState["status"]) => void;
  cancel: () => void;
}

// Create context with proper initial state
const createInitialState = (): UploadVideoState => ({
  activeStep: 0,
  videoDetails: {
    title: "",
    visibility: "public",
    category: "",
    description: "",
  },
  fileUploadProgress: 0,
  status: "idle",
  uploadedChunks: { current: new Map() },
  video: null,
  videoId: null,
});

export const UploadVideoContext = createContext<UploadVideoContextType>({
  ...createInitialState(),
  setActiveStep: () => {},
  setVideo: () => {},
  setVideoId: () => {},
  setNextStep: () => {},
  setFileKey: () => {},
  setAssetId: () => {},
  setUploadId: () => {},
  setVideoDetails: () => {},
  setUploadProgress: () => {},
  setStatus: () => {},
  cancel: () => {},
});

// Provider component
export const UploadVideoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const uploadedChunks = useRef<Map<number, string>>(new Map());
  
  // Create initial state with the ref
  const initialStateWithRef: UploadVideoState = {
    activeStep: 0,
    videoDetails: {
      title: "",
      visibility: "public",
      category: "",
      description: "",
    },
    fileUploadProgress: 0,
    status: "idle",
    uploadedChunks,
    video: null,
    videoId: null,
  };

  const [state, dispatch] = useReducer(uploadReducer, initialStateWithRef);

  // Action dispatchers
  const setActiveStep = (step: number) => dispatch({ type: "SET_ACTIVE_STEP", payload: step });
  const setVideo = (file: File) => dispatch({ type: "SET_VIDEO", payload: file });
  const setVideoId = (id: string) => dispatch({ type: "SET_VIDEO_ID", payload: id });
  const setNextStep = () => dispatch({ type: "SET_NEXT_STEP" });
  const setFileKey = (key: string) => dispatch({ type: "SET_FILE_KEY", payload: key });
  const setAssetId = (id: string | undefined) => dispatch({ type: "SET_ASSET_ID", payload: id });
  const setUploadId = (id: string) => dispatch({ type: "SET_UPLOAD_ID", payload: id });
  const setVideoDetails = (details: VideoDetailsForm) => dispatch({ type: "SET_VIDEO_DETAILS", payload: details });
  const setUploadProgress = (value: number) => dispatch({ type: "SET_UPLOAD_PROGRESS", payload: value });
  const setStatus = (status: UploadVideoState["status"]) => dispatch({ type: "SET_STATUS", payload: status });
  const cancel = () => dispatch({ type: "RESET", uploadedChunks });

  return (
    <UploadVideoContext.Provider
      value={{
        ...state,
        setActiveStep,
        setVideo,
        setVideoId,
        setNextStep,
        setFileKey,
        setAssetId,
        setUploadId,
        setVideoDetails,
        setUploadProgress,
        setStatus,
        cancel,
      }}
    >
      {children}
    </UploadVideoContext.Provider>
  );
};