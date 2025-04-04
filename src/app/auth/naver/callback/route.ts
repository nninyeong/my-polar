import { NAVER_CONFIG } from '@/utils/config';
import { createAdminClient } from '@/utils/supabase/admin';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) {
    return NextResponse.json({ error: '네이버 로그인 실패' }, { status: 400 });
  }

  const tokenResponse = await fetch(
    `${NAVER_CONFIG.TOKEN_URL}?grant_type=authorization_code&client_id=${NAVER_CONFIG.CLIENT_ID}&client_secret=${NAVER_CONFIG.CLIENT_SECRET}&code=${code}&state=${state}`,
    { method: 'GET' },
  );
  const tokenData = await tokenResponse.json();
  if (!tokenData?.access_token) {
    return NextResponse.json({ error: '토큰 발급 실패' }, { status: 400 });
  }

  const profileResponse = await fetch(`${NAVER_CONFIG.USER_INFO_URL}`, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const profileData = await profileResponse.json();
  if (profileData.resultcode !== '00') {
    return NextResponse.json({ error: '프로필 정보 가져오기 실패' }, { status: 400 });
  }

  const { email, id: naverUserId } = profileData.response;
  const supabaseAdmin = createAdminClient();

  const { data: users, error: fetchError } = await supabaseAdmin.auth.admin.listUsers();
  if (fetchError) {
    console.error('유저 조회 오류: ', fetchError.message);
    return NextResponse.json({ error: '유저 조회 실패' }, { status: 500 });
  }

  let user = users.users.find((u) => u.email === email);

  if (user) {
    const provider = user.app_metadata?.provider;
    if (provider === 'kakao') {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/?social=${provider}`);
    }
  } else {
    const { data: signUpData, error: signUpError } = await supabaseAdmin.auth.signUp({
      email,
      password: `naver-${naverUserId}`,
    });

    if (signUpError) {
      console.error('회원가입 오류:', signUpError.message);
      return NextResponse.json({ error: '회원가입 실패' }, { status: 400 });
    }

    if (!signUpData.user) {
      return NextResponse.json({ error: '회원가입 후 사용자 정보 없음' }, { status: 401 });
    }

    user = signUpData.user;
  }

  const supabase = createClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password: `naver-${naverUserId}`,
  });

  if (signInError) {
    console.error('로그인 오류:', signInError.message);
    return NextResponse.json({ error: '로그인 실패' }, { status: 401 });
  }

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}`);
}
