import { createClient } from './server';

export const getIsSignedIn = async () => {
  const client = createClient();
  const {
    data: { session },
  } = await client.auth.getSession();
  return !!session;
};

export const getUserInfo = async () => {
  const client = createClient();
  const { data, error } = await client.auth.getUser();
  if (error) {
    console.error('Failed to fetch user: ', error);
  }

  return data.user ?? null;
};
