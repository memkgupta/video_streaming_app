import { LOGIN_ENDPOINT, REFRESH_TOKEN_ENDPOINT, REGISTER_ENDPOINT, VERIFY_AUTH_ENDPOINT } from "@/constants";
import { useApiGet, useApiPost } from "@/hooks/api_hooks";
import { APIResponse, AuthResponse, AuthTokens, LoginCredentials, RegisterCredentials, User } from "@/types";
import { getAuthToken, getRefreshToken, removeAuthTokens, setAuthTokens } from "@/utils/cookies";
import api from "./api";

export const login = async(
    credentials:LoginCredentials
):Promise<APIResponse<AuthResponse>> =>{
    const response = await api.post<APIResponse<AuthResponse>>(LOGIN_ENDPOINT,credentials);
    if(response.data.success && response.data.data)
    {
        const {tokens} = response.data.data;
        setAuthTokens(tokens.acessToken,tokens.refreshToken)
    }
return response.data;
}
export const register = async(
    credentials:RegisterCredentials
):Promise<APIResponse<AuthResponse>> =>{
    const response = await api.post<APIResponse<AuthResponse>>(REGISTER_ENDPOINT,credentials);
        if(response.data.success && response.data.data)
    {
        const {tokens} = response.data.data;
        setAuthTokens(tokens.acessToken,tokens.refreshToken)
    }
return response.data;
}

export const refreshAuth = async (): Promise<APIResponse<AuthTokens>> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
   return{
    success:false,
    error:"No refresh token provided"
   }
  }

  // The backend /user/auth/refresh endpoint expects { refreshToken: "value" }
  const {data:response} =  await api.get<APIResponse<AuthTokens>>(REFRESH_TOKEN_ENDPOINT,{headers:{
    "X-REFRESH-TOKEN":refreshToken
  }})

  if (response.success && response.data) {
    setAuthTokens(response.data.acessToken, response.data.refreshToken);
  } else {
    // If refresh fails, it's critical to remove old (now invalid) tokens
    // to prevent loops or using stale data.

    removeAuthTokens(); 
  }

  return response
};
const verifyTokenAndGetUserWithRefresh = async (): Promise<APIResponse<User>> => {
  // Initial attempt to verify token and get user
  // Using POST here as per existing 'post' utility. A GET might be more idiomatic.
    const accessToken = getAuthToken()
  let {data:verifyResponse} =  await api.get<APIResponse<User>>(VERIFY_AUTH_ENDPOINT)

  // Check if the initial verification failed, potentially due to an expired token
  
  if (!verifyResponse.success) {
    
    const refreshResult = await refreshAuth();

    if (refreshResult.success && refreshResult.data) {
    
      setAuthTokens(refreshResult.data.acessToken,refreshResult.data.refreshToken)
    } else {
      return {
        success: false,
        error: refreshResult.error || 'Token refresh failed after initial verification failure.',
      };
    }
  }
  return verifyResponse;
};
/**
 * Log out user by removing tokens and clearing any user state
 */
export const logout = (): void => {
  removeAuthTokens();
  // Also clear any client-side user state if you have one (e.g., in Zustand, Redux, Context)
};
export const isAuthenticated = async (): Promise<boolean> => {
  const token = getAuthToken();
  if (!token) {
    return false; // No token, definitely not authenticated
  }

  const response = await verifyTokenAndGetUserWithRefresh();
  return response!=null;
};
export const getCurrentUser = async (): Promise<User | null> => {
  const token = getAuthToken();
  if (!token) {
    return null; // No token, no user
  }

  const response = await verifyTokenAndGetUserWithRefresh();
  if(response.success && response.data)
  {
    return response.data;
  }
  else{
    if(response.error){
        console.error(response.error)
    }
    return null;
  }
 
};