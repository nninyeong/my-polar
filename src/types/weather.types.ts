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

export type WeatherState = 'sunny' | 'cloudy' | 'gloomy' | 'rainy' | 'snowy';

export type WeatherRule = {
  condition: (rainValue: number, skyValue: number) => boolean;
  state: WeatherState;
};
