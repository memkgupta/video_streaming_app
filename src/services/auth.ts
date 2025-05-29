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
        setAuthTokens(tokens.accessToken,tokens.refreshToken)
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
        setAuthTokens(tokens.accessToken,tokens.refreshToken)
    }
return response.data;
}

export const refreshAuth = async (): Promise<APIResponse<AuthTokens>> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken || refreshToken==null || refreshToken=="null") {
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
    setAuthTokens(response.data.accessToken, response.data.refreshToken);
  } else {
    // If refresh fails, it's critical to remove old (now invalid) tokens
    // to prevent loops or using stale data.

    removeAuthTokens(); 
  }

  return response
};
const verifyTokenAndGetUserWithRefresh = async (): Promise<APIResponse<User>> => {
    const accessToken = getAuthToken();

    try {
        const res = await api.get<APIResponse<User>>(VERIFY_AUTH_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    } catch (error: any) {
        console.error("Token verification failed:", error?.message || error);
        return {
            success: false,
            error: "Token verification failed",
        };
    }
};

/**
 * Log out user by removing tokens and clearing any user state
 */
export const logout = (): void => {
  removeAuthTokens();
  // Also clear any client-side user state if you have one (e.g., in Zustand, Redux, Context)
};
export const isAuthenticated = async (): Promise<boolean> => {
    const accessToken = getAuthToken();
    const refreshToken = getRefreshToken();

    if (!accessToken || !refreshToken || refreshToken === "null") {
        return false;
    }

    let response = await verifyTokenAndGetUserWithRefresh();

    // If token verification failed, try refreshing
    if (!response.success && refreshToken && refreshToken !== "null") {
        const refreshResponse = await refreshAuth();

        if (!refreshResponse.success || !refreshResponse.data) {
            return false; // Couldn't refresh, so not authenticated
        }

        // Try verifying again with new token
        response = await verifyTokenAndGetUserWithRefresh();
    }

    return response.success && !!response.data;
};

export const getCurrentUser = async (): Promise<User | null> => {
    const accessToken = getAuthToken();
    if (!accessToken) {
        return null;
    }

    let response = await verifyTokenAndGetUserWithRefresh();

    if (!response.success) {
        const refreshed = await refreshAuth();
        if (!refreshed.success) return null;

        response = await verifyTokenAndGetUserWithRefresh();
    }

    if (response.success && response.data) {
        return response.data;
    } else {
        console.error(response.error);
        return null;
    }
};
