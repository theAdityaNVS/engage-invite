export const COUPLE = {
  GROOM_NAME:       'Aditya',
  BRIDE_NAME:       'Jyoti',
  HASHTAG:          '#JyotiWedsAditya',
  RSVP_WHATSAPP:    '',
};

export const TRANSLATIONS = {
  NAMES: {
    en: { groom: 'Aditya',  bride: 'Jyoti'  },
    hi: { groom: 'आदित्य',  bride: 'ज्योति' },
    te: { groom: 'ఆదిత్య',  bride: 'జ్యోతి' },
    or: { groom: 'ଆଦିତ୍ୟ',  bride: 'ଜ୍ୟୋତି' },
  },
};

export const ENGAGEMENT = {
  DATE:             '2026-06-17',
  DATE_DISPLAY:     '17th June 2026',
  DAY:              'Wednesday',
  TIME:             '10:00 AM Onwards',
  VENUE_NAME:       'Suryansh Hotels and Resorts',
  VENUE_CITY:       'Bhubaneswar',
  VENUE_ADDRESS:    'P-1, Nandankanan Rd, NALCO Nagar, Jayadev Vihar, Bhubaneswar, Odisha 751023',
  VENUE_LAT:        20.2961,
  VENUE_LNG:        85.8245,
  VENUE_MAPS_URL:   'https://maps.google.com/?q=Suryansh+Hotels+and+Resorts+Jayadev+Vihar+Bhubaneswar',
  COUNTDOWN_ISO:    '2026-06-17T10:00:00+05:30',
  MUHURTHAM_TIME:   '10:00 AM',
  WEATHER_ADVISORY: 'Expect warm weather (~32°C). Light breathable attire recommended.',
  TEMPLE_NAME:    'Ramanarayan Temple',
  TEMPLE_ADDRESS: 'NALCO Nagar, Jayadev Vihar, Bhubaneswar, Odisha 751023',
  EVENTS: [
    {
      id:           'engagement-puja',
      name:         'Engagement Puja',
      date:         '17th June 2026',
      day:          'Wednesday',
      time:         '10:00 AM',
      venue:        'NALCO Temple, Jayadev Vihar',
      address:      'NALCO Temple, NALCO Nagar, Jayadev Vihar, Bhubaneswar, Odisha 751023',
      lat:          20.2970,
      lng:          85.8232,
      mapsUrl:      'https://maps.google.com/?q=NALCO+Temple+Jayadev+Vihar+Bhubaneswar',
      illustration: 'puja',
    },
    {
      id:           'ring-ceremony',
      name:         'Ring Ceremony',
      date:         '17th June 2026',
      day:          'Wednesday',
      time:         '11:30 AM',
      venue:        'Suryansh Hotels and Resorts, Bhubaneswar',
      address:      'P-1, Nandankanan Rd, NALCO Nagar, Jayadev Vihar, Bhubaneswar, Odisha 751023',
      lat:          20.2961,
      lng:          85.8245,
      mapsUrl:      'https://maps.google.com/?q=Suryansh+Hotels+and+Resorts+Jayadev+Vihar+Bhubaneswar',
      illustration: 'ring',
    },
    {
      id:           'family-lunch',
      name:         'Family Lunch',
      date:         '17th June 2026',
      day:          'Wednesday',
      time:         '1:00 PM',
      venue:        'Suryansh Hotels and Resorts, Bhubaneswar',
      address:      'P-1, Nandankanan Rd, NALCO Nagar, Jayadev Vihar, Bhubaneswar, Odisha 751023',
      lat:          20.2961,
      lng:          85.8245,
      mapsUrl:      'https://maps.google.com/?q=Suryansh+Hotels+and+Resorts+Jayadev+Vihar+Bhubaneswar',
      illustration: 'lunch',
    },
  ],
};

export const WEDDING = {
  DATE:             '2026-11-25',
  DATE_DISPLAY:     '25th November 2026',
  DAY:              'Wednesday',
  TIME:             '9:00 AM Onwards',
  VENUE_NAME:       'Sai Priya Resorts',
  VENUE_CITY:       'Visakhapatnam',
  VENUE_ADDRESS:    'Sai Priya Resorts, Rushikonda, Visakhapatnam, Andhra Pradesh',
  VENUE_LAT:        17.7643,
  VENUE_LNG:        83.3892,
  VENUE_MAPS_URL:   'https://maps.google.com/?q=Sai+Priya+Resorts+Rushikonda+Visakhapatnam',
  COUNTDOWN_ISO:    '2026-11-25T09:00:00+05:30',
  WEATHER_ADVISORY: 'Pleasant coastal weather (~26°C). Light formals or traditional attire.',
};

export const GOOGLE_API = {};

export const FAMILIES = {
  GROOM_PARENTS:    'Smt. Nadamuni Sunitha & Shri Nadamuni Thirumala Prasad',
  BRIDE_PARENTS:    'Smt. Pranati Swain & Shri Ranjan Kumar Swain',
  GROOM_SIBLING:    'Nadamuni Dhruv',
  BRIDE_SIBLING:    '',
  GROOM_GOTRA:      '',
  BRIDE_GOTRA:      '',
  GROOM_NAKSHATRA:  '',
  BRIDE_NAKSHATRA:  '',
  ELDERS:           [],
};

export const MEDIA = {
  // No track shipped yet — keep null so MusicPlayer hides (avoids a 404 + dead button).
  // When re-enabling: drop the file at public/music/engagement-track.mp3 AND fix the
  // MusicPlayer/LanguageSwitcher top-right overlap (both pinned top-right) before shipping.
  MUSIC_SRC:      null,
  COUPLE_PHOTO:   '',
  MOMENTS: [
    '', // Moment 1 (Moments Together Gallery)
    '', // Moment 2
    '', // Moment 3
  ],
};

export const DOMAIN = {
  BASE:       'https://adityanvs.in',
  ENGAGEMENT: 'https://adityanvs.in/engagement',
  WEDDING:    'https://adityanvs.in',
};
