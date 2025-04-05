import { DEFAULT_WEATHER_POSITION } from '@/constants/weatherApi.config';
import { Position } from '@/types/position.types';
import { WeatherState } from '@/types/weather.types';
import { WeatherResponse } from '@/types/weather.types';
import { convertLatLngToGrid } from '@/utils/convertCoordinate';

export const fetchWeather = async (position: Position | null): Promise<WeatherResponse> => {
  try {
    let nx = DEFAULT_WEATHER_POSITION.latitude.toString();
    let ny = DEFAULT_WEATHER_POSITION.longitude.toString();

    if (position) {
      const { nx: convertedNx, ny: convertedNy } = convertLatLngToGrid(position.latitude, position.longitude);
      nx = convertedNx.toString();
      ny = convertedNy.toString();
    }

    const response = await fetch(`/api/weather?nx=${nx}&ny=${ny}`);

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
  const skyData = data.response.body.items.item.find((item) => item.category === 'SKY');
  const rainData = data.response.body.items.item.find((item) => item.category === 'PTY');

  if (!skyData || !rainData) return 'sunny';

  const skyValue = parseInt(skyData.fcstValue);
  const rainValue = parseInt(rainData.fcstValue);

  if (rainValue === 3 || rainValue === 7) return 'snowy';
  else if (rainValue !== 0 && rainValue !== 3 && rainValue !== 7) return 'rainy';
  else if (rainValue === 0 && skyValue < 6) return 'sunny';
  else if (rainValue === 0 && skyValue >= 6 && skyValue < 9) return 'cloudy';
  else if (rainValue === 0 && skyValue >= 9) return 'gloomy';
  else return 'sunny';
};
