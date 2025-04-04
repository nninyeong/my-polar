'use client';

import { handleSocialSignIn } from '@/utils/supabase/singIn';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const searchParams = useSearchParams();
  const social = searchParams.get('social');

  useEffect(() => {
    handleSocialSignIn(social);
  }, [social]);

  return <div>홈</div>;
}
