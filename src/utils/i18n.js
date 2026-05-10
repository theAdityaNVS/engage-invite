const cache = {};

export async function loadTranslations(lang) {
  if (cache[lang]) return cache[lang];
  try {
    const res = await fetch(`/translations/${lang}.json`);
    if (!res.ok) throw new Error('Failed to load');
    const data = await res.json();
    cache[lang] = data;
    return data;
  } catch {
    return {};
  }
}
