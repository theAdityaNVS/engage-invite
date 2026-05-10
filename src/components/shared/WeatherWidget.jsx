import { useWeather } from '@/hooks/useWeather';
import { GOOGLE_API } from '@/config';

const CONDITION_EMOJI = {
  Clear:        '☀️',
  Clouds:       '⛅',
  Rain:         '🌧️',
  Drizzle:      '🌦️',
  Thunderstorm: '⛈️',
  Snow:         '❄️',
  Mist:         '🌫️',
  Fog:          '🌫️',
  Haze:         '🌤️',
  Smoke:        '🌫️',
};

export default function WeatherWidget({ lat, lng, advisory }) {
  const { weather, loading } = useWeather({ lat, lng, apiKey: GOOGLE_API.WEATHER_API_KEY });

  if (loading) {
    return (
      <div style={{ textAlign: 'center', color: '#6B4E3D', padding: '1rem' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', animation: 'spin 2s linear infinite' }}>⏳</div>
        <p style={{ fontSize: '0.85rem' }}>Checking weather…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (weather) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>
          {CONDITION_EMOJI[weather.condition] || '🌡️'}
        </div>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.8rem',
          color: '#2D1810',
          fontWeight: 600,
        }}>
          {weather.temp}°C
        </p>
        <p style={{ fontSize: '0.85rem', color: '#6B4E3D', textTransform: 'capitalize' }}>
          {weather.description}
        </p>
        {advisory && (
          <p style={{ fontSize: '0.78rem', color: '#6B4E3D', marginTop: '0.5rem', lineHeight: 1.4 }}>
            {advisory}
          </p>
        )}
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>🌤️</div>
      <p style={{ fontSize: '0.85rem', color: '#6B4E3D', lineHeight: 1.5 }}>
        {advisory || 'Check weather on the day.'}
      </p>
    </div>
  );
}
