// Minimal inline user-agent parser — enough for browser / OS / device-type
// breakdowns without pulling in ua-parser-js. Order matters: check the more
// specific tokens first (e.g. Edg before Chrome, since Edge UAs contain both).

export function parseUA(ua = '') {
  const s = ua || '';

  let browser = 'Unknown';
  if (/Edg\//.test(s)) browser = 'Edge';
  else if (/OPR\/|Opera/.test(s)) browser = 'Opera';
  else if (/SamsungBrowser/.test(s)) browser = 'Samsung Internet';
  else if (/Chrome\//.test(s) && !/Chromium/.test(s)) browser = 'Chrome';
  else if (/CriOS/.test(s)) browser = 'Chrome';
  else if (/Firefox\/|FxiOS/.test(s)) browser = 'Firefox';
  else if (/Version\/.*Safari/.test(s) || /Safari/.test(s)) browser = 'Safari';

  let os = 'Unknown';
  if (/Windows NT/.test(s)) os = 'Windows';
  else if (/iPhone|iPad|iPod/.test(s)) os = 'iOS';
  else if (/Android/.test(s)) os = 'Android';
  else if (/Mac OS X/.test(s)) os = 'macOS';
  else if (/Linux/.test(s)) os = 'Linux';

  let device_type = 'desktop';
  if (/iPad|Tablet/.test(s) || (/Android/.test(s) && !/Mobile/.test(s))) device_type = 'tablet';
  else if (/Mobi|iPhone|iPod|Android.*Mobile/.test(s)) device_type = 'mobile';

  return { browser, os, device_type };
}
