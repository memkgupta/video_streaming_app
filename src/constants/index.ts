export const BACKEND_BASE_URL = `http://localhost:8001/api`
export const LOGIN_ENDPOINT = `/user/auth/login`
export const REGISTER_ENDPOINT = `/user/auth/register`
export const VERIFY_AUTH_ENDPOINT =`/user/auth/authenticate`
export const REFRESH_TOKEN_ENDPOINT = `/user/token/refresh-token`
export const UPDATE_USER_ENDPOINT = (id:string)=>{
  return `/user/${id}`;
}
export const sampleUser = {
  id: "user_123456",
  username: "mayankdev",
  email: "mayank@example.com",
  avatar: "https://api.dicebear.com/6.x/personas/svg?seed=Mayank",
  createdAt: new Date().toISOString(),
};
export const sampleAuthState = {
  user: sampleUser,
  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.sampleAccessToken",
  refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.sampleRefreshToken",
  isAuthenticated: true,
  isLoading: false,
  error: null,
};
const unauthenticatedAuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authTokens = {
  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.access_token_sample",
  refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refresh_token_sample",
};