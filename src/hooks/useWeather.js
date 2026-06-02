import { useState, useEffect } from 'react';

const CACHE_DURATION_MS = 30 * 60 * 1000;
const cache = {};

export function useWeather({ lat, lng }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cacheKey = `${lat},${lng}`;
    const cached = cache[cacheKey];
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION_MS) {
      setWeather(cached.data);
      return;
    }

    setLoading(true);
    fetch(`/api/weather?lat=${lat}&lng=${lng}`)
      .then((r) => r.json())
      .then((data) => {
        cache[cacheKey] = { data, timestamp: Date.now() };
        setWeather(data);
      })
      .catch(() => setWeather(null))
      .finally(() => setLoading(false));
  }, [lat, lng]);

  return { weather, loading };
}
