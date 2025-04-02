'use client';
import { useAuthStatus } from '@/hooks/auth/useAuthStatus';
import Link from 'next/link';

const Navigation = () => {
  const { isSignedIn } = useAuthStatus();

  return (
    <nav>
      <Link href={'/'}>소개</Link>
      <Link href={'/challenge'}>챌린지</Link>
      <Link href={'/mypola'}>마이 폴라 </Link>
      <Link href={'/ranking'}>랭킹</Link>
      {isSignedIn ? <Link href={'/mypage'}>마이페이지</Link> : <Link href={'/signin'}>로그인</Link>}
    </nav>
  );
};

export default Navigation;
