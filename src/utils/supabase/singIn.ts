'use client';
import { NAVER_CONFIG } from '../config';
import { createClient } from './client';

const client = createClient();

export const handleGoogleSignIn = async () => {
  try {
    await client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.origin + 'auth/callback',
      },
    });
  } catch (error) {
    console.error('Google login failed: ', error);
  }
};

export const handleKakaoSignIn = async () => {
  try {
    await client.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: window.origin + 'auth/callback',
      },
    });
  } catch (error) {
    console.error('Kakao login failed: ', error);
  }
};

export const handleNaverSignIn = () => {
  const state = Math.random().toString(36).substring(2);

  const authUrl = `${NAVER_CONFIG.AUTH_URL}?response_type=code&client_id=${NAVER_CONFIG.CLIENT_ID}&redirect_uri=${NAVER_CONFIG.CALLBACK_URL}&state=${state}`;

  window.location.href = authUrl;
};
