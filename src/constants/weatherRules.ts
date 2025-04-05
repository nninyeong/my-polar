import { WeatherRule } from '@/types/weather.types';

export const WEATHER_RULES: WeatherRule[] = [
  {
    condition: (rainValue) => rainValue === 3 || rainValue === 7,
    state: 'snowy',
  },
  {
    condition: (rainValue) => rainValue !== 0 && rainValue !== 3 && rainValue !== 7,
    state: 'rainy',
  },
  {
    condition: (rainValue, skyValue) => rainValue === 0 && skyValue < 6,
    state: 'sunny',
  },
  {
    condition: (rainValue, skyValue) => rainValue === 0 && 6 <= skyValue && skyValue < 9,
    state: 'cloudy',
  },
  {
    condition: (rainValue, skyValue) => rainValue === 0 && 9 <= skyValue,
    state: 'gloomy',
  },
];
