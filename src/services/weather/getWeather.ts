import { WeatherState } from '@/types/weather.types';
import { WeatherResponse } from '@/types/weather.types';
import { WEATHER_API_CONFIG } from '@/constants/weatherApi.config';

export const fetchWeather = async (): Promise<WeatherResponse> => {
  try {
    const response = await fetch(`/api/weather?nx=${55}&ny=${127}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
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
