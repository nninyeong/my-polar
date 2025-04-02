'use client';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export const useSignOut = () => {
  const client = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await client.auth.signOut();
    if (error) return console.error('Signout failed: ', error);

    router.refresh();
    router.push('/');
  };
  return { handleSignOut };
};
