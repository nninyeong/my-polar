'use client';

import { useWeather } from '@/hooks/queries/useWeather';

export default function MypolaContainer() {
  const { data: weather, isLoading, isError } = useWeather();

  if (isLoading) {
    return <div>날씨 정보를 불러오는 중...</div>;
  }

  // TODO: 날씨 정보 불러오기 실패시 기본 날씨 맑음으로 할건지 논의 후 확정
  if (isError || !weather) {
    return <div>날씨 정보를 불러오는데 실패했습니다.</div>;
  }

  return (
    <div>
      <h1>현재 날씨: {weather}</h1>
    </div>
  );
}
