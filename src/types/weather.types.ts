export type WeatherItem = {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
};

export type WeatherResponse = {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      dataType: string;
      items: {
        item: WeatherItem[];
      };
    };
  };
};

// TODO: 날씨 상태 기획 확정시 수정
export type WeatherState = 'sunny' | 'cloudy' | 'gloomy' | 'rainy' | 'snowy';
