export const NAVER_CONFIG = {
  AUTH_URL: 'https://nid.naver.com/oauth2.0/authorize',
  TOKEN_URL: 'https://nid.naver.com/oauth2.0/token',
  USER_INFO_URL: 'https://openapi.naver.com/v1/nid/me',
  CLIENT_ID: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
  CLIENT_SECRET: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
  CALLBACK_URL: process.env.NEXT_PUBLIC_NAVER_CALLBACK_URL,
};
