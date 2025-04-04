import { WEATHER_API_CONFIG } from '@/constants/weatherApi.config';
import { NextResponse } from 'next/server';
const DEFAULT_NX = '55';
const DEFAULT_NY = '127';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const nx = searchParams.get('nx') ?? DEFAULT_NX;
    const ny = searchParams.get('ny') ?? DEFAULT_NY;

    const params = new URLSearchParams({
      serviceKey: process.env.WEATHER_API_KEY || '',
      ...WEATHER_API_CONFIG.COMMON_PARAMS,
      base_date: '20250404',
      base_time: '0100',
      nx: nx.toString(),
      ny: ny.toString(),
    });

    const response = await fetch(
      `${WEATHER_API_CONFIG.BASE_URL}${WEATHER_API_CONFIG.ENDPOINTS.ULTRA_SHORT_FORECAST}?${params}`,
    );

    if (!response.ok) {
      throw new Error(`날씨 API 응답 에러: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.response.header.resultCode !== '00') {
      throw new Error(`날씨 API 요청 실패: ${data.response.header.resultMsg}`);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('날씨 API 요청 실패: ', error);
    return NextResponse.json({ error: `날씨 API 요청 실패: ${error}` }, { status: 500 });
  }
}
