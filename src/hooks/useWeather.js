import { useState, useEffect } from 'react';

const CACHE_DURATION_MS = 30 * 60 * 1000; // 30 minutes
const cache = {};

export function useWeather({ lat, lng, apiKey }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!apiKey || apiKey === 'YOUR_OPENWEATHER_API_KEY') return;

    const cacheKey = `${lat},${lng}`;
    const cached = cache[cacheKey];
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION_MS) {
      setWeather(cached.data);
      return;
    }

    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`
    )
      .then((r) => r.json())
      .then((data) => {
        const result = {
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        };
        cache[cacheKey] = { data: result, timestamp: Date.now() };
        setWeather(result);
      })
      .catch(() => setWeather(null))
      .finally(() => setLoading(false));
  }, [lat, lng, apiKey]);

  return { weather, loading };
}
