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
export const handleNaverSignIn = () => {};
