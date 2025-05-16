import Cookies from 'js-cookie'

export const TOKEN_COOKIE = 'access_token'
export const REFRESH_TOKEN_COOKIE = 'refresh_token'

const COOKIE_OPTIONS = 
{
    expires:7,
    sameSite:'strict' as const,
    secure:true,
    path:'/'
};

const AUTH_TOKEN_OPTIONS = 
{
    ...COOKIE_OPTIONS,
    expires:1/24
}

export const setAuthTokens = (token: string, refreshToken: string): void => {
  Cookies.set(TOKEN_COOKIE, token, AUTH_TOKEN_OPTIONS);
  Cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, COOKIE_OPTIONS);
};
export const getAuthToken = (): string | undefined => {
  return Cookies.get(TOKEN_COOKIE);
};
export const getRefreshToken = ():string | undefined =>{
  return Cookies.get(REFRESH_TOKEN_COOKIE)
}
export const removeAuthTokens = (): void => {
  Cookies.remove(TOKEN_COOKIE, { path: '/' });
  Cookies.remove(REFRESH_TOKEN_COOKIE, { path: '/' });
};