import { createClient } from './server';

export const getUserNickname = async (userId: string) => {
  const client = createClient();

  const { data, error } = await client.from('users').select('nickname').eq('id', userId).single();
  if (error) {
    console.error('Failed to fetch nickname:', error);
  }

  return data?.nickname ?? null;
};
