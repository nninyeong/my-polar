import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKeys';
import { determineWeatherState, fetchWeather } from '@/services/weather/getWeather';

export const useWeather = () => {
  return useQuery({
    queryKey: QUERY_KEYS.weather(),
    queryFn: fetchWeather,
    select: determineWeatherState,
    retry: 1,
    staleTime: 1000 * 60 * 10,
  });
};
