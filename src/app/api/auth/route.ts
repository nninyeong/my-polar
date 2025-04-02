import { getIsSignedIn } from '@/utils/supabase/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const initAuthenticated = await getIsSignedIn();
  return NextResponse.json({ initAuthenticated });
}
