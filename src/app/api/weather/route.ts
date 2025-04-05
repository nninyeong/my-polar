import { DEFAULT_WEATHER_POSITION, WEATHER_API_CONFIG } from '@/constants/weatherApi.config';
import { convertDateForUltraShortForecast, convertTimeForUltraShortForecast } from '@/utils/convertDate';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const nx = searchParams.get('nx') ?? DEFAULT_WEATHER_POSITION.latitude;
    const ny = searchParams.get('ny') ?? DEFAULT_WEATHER_POSITION.longitude;

    const date = new Date();
    const baseDate = convertDateForUltraShortForecast(date);
    const baseTime = convertTimeForUltraShortForecast(date);

    const params = new URLSearchParams({
      serviceKey: process.env.WEATHER_API_KEY || '',
      ...WEATHER_API_CONFIG.COMMON_PARAMS,
      base_date: baseDate,
      base_time: baseTime,
      nx: nx.toString(),
      ny: ny.toString(),
    });

    const response = await fetch(
      `${WEATHER_API_CONFIG.BASE_URL}${WEATHER_API_CONFIG.ENDPOINTS.ULTRA_SHORT_FORECAST}?${params}`,
    );

    if (!response.ok) {
      console.error(`날씨 API 응답 에러: ${response.statusText}`);
      return NextResponse.json({ message: `날씨 API 응답 에러: ${response.statusText}` });
    }

    const data = await response.json();

    if (data.response.header.resultCode !== '00') {
      console.error(`날씨 API 요청 실패: ${data.response.header.resultMsg}`);
      return NextResponse.json({ message: `날씨 API 요청 실패: ${data.response.header.resultMsg}` });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('날씨 API 요청 실패: ', error);
    return NextResponse.json({ message: `날씨 API 요청 실패: ${error}` });
  }
}
