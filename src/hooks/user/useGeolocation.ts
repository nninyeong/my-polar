'use client';

import { CustomError } from '@/types/error.types';
import { Position } from '@/types/position.types';
import { useEffect, useState } from 'react';

export const useGeolocation = () => {
  const [position, setPosition] = useState<Position | null>(null);
  const [error, setError] = useState<CustomError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError({ message: '브라우저가 위치 정보를 지원하지 않습니다.' });
      setIsLoading(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    const success = (position: GeolocationPosition) => {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      setIsLoading(false);
    };

    const error = (error: GeolocationPositionError) => {
      console.error('위치 정보 에러:', error);
      setError({ message: error.message });
      setIsLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return { position, error, isLoading };
};
