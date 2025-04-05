import { DEFAULT_WEATHER_POSITION } from '@/constants/weatherApi.config';
import { WEATHER_RULES } from '@/constants/weatherRules';
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
      console.error('날씨데이터 응답 실패: ', response.status);
      throw new Error(`날씨데이터 응답 실패: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('날씨 데이터를 가져오는데 실패했습니다:', error);
    throw error;
  }
};

export const determineWeatherState = (data: WeatherResponse): WeatherState => {
  const skyData = data.response.body.items.item.find((item) => item.category === 'SKY');
  const rainData = data.response.body.items.item.find((item) => item.category === 'PTY');

  if (!skyData || !rainData) return 'sunny';

  const skyValue = parseInt(skyData.fcstValue);
  const rainValue = parseInt(rainData.fcstValue);

  const matchedWeatherState = WEATHER_RULES.find((rule) => rule.condition(rainValue, skyValue));
  return matchedWeatherState?.state ?? 'sunny';
};
