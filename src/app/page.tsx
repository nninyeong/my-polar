'use client';

import { handleKakaoSignIn } from '@/utils/supabase/singIn';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const searchParams = useSearchParams();
  const social = searchParams.get('social');

  useEffect(() => {
    if (social === 'kakao') {
      handleKakaoSignIn();
    }
  }, []);

  return <div>홈</div>;
}
