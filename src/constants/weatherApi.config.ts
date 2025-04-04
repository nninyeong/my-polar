export const WEATHER_API_CONFIG = {
  BASE_URL: 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0',
  ENDPOINTS: {
    ULTRA_SHORT_FORECAST: '/getUltraSrtFcst', // 초단기예보조회
    SHORT_FORECAST: '/getVilageFcst',
  },
  COMMON_PARAMS: {
    pageNo: '1',
    numOfRows: '1000',
    dataType: 'JSON',
  },
} as const;

export const DEFAULT_WEATHER_POSITION = {
  latitude: '55',
  longitude: '127',
} as const;
