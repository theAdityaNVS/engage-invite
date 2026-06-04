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
  TIME:             '8:45 AM Onwards',
  VENUE_NAME:       'Suryansh Hotels and Resorts',
  VENUE_CITY:       'Bhubaneswar',
  VENUE_ADDRESS:    'P-1, Nandankanan Rd, NALCO Nagar, Jayadev Vihar, Bhubaneswar, Odisha 751023',
  VENUE_LAT:        20.2961,
  VENUE_LNG:        85.8245,
  VENUE_MAPS_URL:   'https://maps.google.com/?q=Suryansh+Hotels+and+Resorts+Jayadev+Vihar+Bhubaneswar',
  COUNTDOWN_ISO:    '2026-06-17T08:45:00+05:30',
  MUHURTHAM_TIME:   '8:45 AM',
  WEATHER_ADVISORY: 'Expect warm weather (~32°C). Light breathable attire recommended.',
  TEMPLE_NAME:    'Ramanarayan Temple',
  TEMPLE_ADDRESS: 'NALCO Nagar, Jayadev Vihar, Bhubaneswar, Odisha 751023',
  EVENTS: [
    {
      id:           'engagement-puja',
      name:         'Engagement Puja',
      date:         '17th June 2026',
      day:          'Wednesday',
      time:         '8:45 AM',
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
      time:         '10:30 AM',
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
      time:         '12:30 PM',
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
  // Three selectable background tracks. ?music=1|2|3 sets the initial track
  // (1 = default); guests can also switch tracks from the player's panel.
  // Streamed via HTML5 audio. If the whole array is empty the player is hidden.
  MUSIC_TRACKS: [
    { id: 1, src: '/music/amaran.mp3',     label: 'Amaran' },
    { id: 2, src: '/music/apna_bana.mp3',  label: 'Apna Bana Le' },
    { id: 3, src: '/music/vachindamma.mp3', label: 'Vachindamma' },
  ],
  COUPLE_PHOTO:   '/images/couple_portrait.jpg',
  MOMENTS: [
    '/images/moment_1.jpg', // Moment 1 (Moments Together Gallery)
    '/images/moment_2.jpg', // Moment 2
    '/images/moment_3.jpg', // Moment 3
  ],
};

export const DOMAIN = {
  BASE:       'https://adityanvs.in',
  ENGAGEMENT: 'https://adityanvs.in/engagement',
  WEDDING:    'https://adityanvs.in',
};
