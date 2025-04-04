'use client';

import { createClient } from '@/utils/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { QUERY_KEYS } from '../queries/queryKeys';

export const useAuthStatus = () => {
  const client = createClient();
  const queryClient = useQueryClient();

  const { data: isSignedIn } = useQuery({
    queryKey: QUERY_KEYS.authStatus(),
    queryFn: async () => {
      const res = await fetch('/api/auth');
      const { initAuthenticated } = await res.json();
      return initAuthenticated;
    },
  });

  useEffect(() => {
    const { data: authListener } = client.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        queryClient.setQueryData(QUERY_KEYS.authStatus(), true);
      } else if (event === 'SIGNED_OUT') {
        queryClient.setQueryData(QUERY_KEYS.authStatus(), false);
      }
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.authStatus() });
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [queryClient]);

  return { isSignedIn };
};
