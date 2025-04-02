import SignOutButton from '@/components/SignOutButton';
import { getUserInfo } from '@/utils/supabase/auth';
import { getUserNickname } from '@/utils/supabase/user';
import { redirect } from 'next/navigation';

const MyPage = async () => {
  const user = await getUserInfo();
  if (!user) {
    return redirect('/signin');
  }

  const nickname = await getUserNickname(user.id);

  return (
    <>
      <p>{nickname}님 안녕하세요</p>
      <SignOutButton />
    </>
  );
};

export default MyPage;
