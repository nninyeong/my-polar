import { WeatherState } from '@/types/weather.types';
import { WeatherResponse } from '@/types/weather.types';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';

export const fetchWeather = async (): Promise<WeatherResponse> => {
  try {
    // 초단기예보조회 url
    const response = await fetch(
      `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=20250404&base_time=0100&nx=55&ny=127`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.response.header.resultCode !== '00') {
      throw new Error(data.response.header.resultMsg);
    }

    return data;
  } catch (error) {
    console.error('날씨 데이터를 가져오는데 실패했습니다:', error);
    throw error;
  }
};

// TODO: 기획 확정 후 날씨 판별 로직 구현
export const determineWeatherState = (data: WeatherResponse): WeatherState => {
  const targetTime = '0200';

  // SKY 카테고리이고 fcstTime이 0200인 요소 찾기
  const skyData = data.response.body.items.item.find((item) => item.category === 'SKY' && item.fcstTime === targetTime);

  if (!skyData) {
    throw new Error('날씨 데이터를 찾을 수 없습니다.');
  }

  const skyValue = parseInt(skyData.fcstValue);

  if (skyValue >= 0 && skyValue <= 5) {
    return 'sunny';
  } else if (skyValue >= 6 && skyValue <= 8) {
    return 'cloudy';
  } else if (skyValue >= 9 && skyValue <= 10) {
    return 'rainy';
  } else {
    return 'sunny';
  }
};
