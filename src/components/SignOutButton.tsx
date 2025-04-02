'use client';
import { useSignOut } from '@/hooks/auth/useSignOut';
import Button from './ui/buttons/Button';

const SignOutButton = () => {
  const { handleSignOut } = useSignOut();

  return (
    <Button
      size='medium'
      variant='primary'
      onClick={handleSignOut}
    >
      로그아웃
    </Button>
  );
};

export default SignOutButton;
