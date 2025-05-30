export interface APIResponse<T> 
{
    success:boolean,
    data?:T,
    message?:string,
    error?:string,
    nextCursor?:string|number
    previousCursor?:string|number
}
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?:string;
  name?:string;
  channelId?:string
theme?:string;
language?:string;
  createdAt: string;
}
export interface FileMetaData{
    fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  uploadStatus: string; // e.g., "success", "failed", "in-progress"
  errorMessage: string; // keep it empty if no error
  videoId: string;   
}
export interface FileUploadDetails{
    key:string,
    uploadId:string,
    assetId:string
}
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
export interface Link{
  title:string,
  url:string
}
export interface Channel {
  id: string;
  name: string;
  description: string;
  links: Link[];
  userId: string;
  banner: string;
  handle: string;
  profile: string;
  subscribersCount: number;
}
export interface Video  {
  id: string;
  title: string;
  thumbnailUrl: string;
  visibility: "Public" | "Private" | "Unlisted";
  views: number;
  uploadedAt: string;
};
export interface VideoPlayerDetails extends Video{
  url:string;
  likes:number;
  totalComments?:number;
  description:string,
  channelDetails:Channel
}
export interface VideoDetailsForm{
  title:string,
  description?:string,
  category?:string,
  thumbnail?:string,
  fileId?:string,
  videoId?:string,
  visibility:string
}
export interface VideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  controls?: boolean;
  width?: string;
  height?: string;
}
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}


