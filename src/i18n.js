/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — i18n motoru
// data-i18n / data-i18n-placeholder / data-i18n-aria attribute'larını okuyup
// aktif dile göre DOM'u günceller.

import { TRANSLATIONS, LANGUAGES } from './data/i18n-data.js';

const STORAGE_KEY = 'firehub.lang';
const DEFAULT_LANG = 'en';

let currentLang = detectInitialLang();

function detectInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && TRANSLATIONS[saved]) return saved;
  } catch {
    // localStorage kapalı olabilir (privacy mode)
  }
  const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return TRANSLATIONS[nav] ? nav : DEFAULT_LANG;
}

/**
 * Verilen anahtar için aktif dildeki çeviriyi döner. Bulunamazsa İngilizce'ye,
 * o da yoksa anahtarın kendisine düşer.
 * @param {string} key
 * @param {Record<string,string|number>} [params] - "{ad}" gibi yer tutucuları değiştirir
 */
export function t(key, params) {
  let text = TRANSLATIONS[currentLang]?.[key]
      ?? TRANSLATIONS[DEFAULT_LANG]?.[key]
      ?? key;
  if (params) {
    Object.keys(params).forEach((paramKey) => {
      text = text.replace(new RegExp('\\{' + paramKey + '\\}', 'g'), params[paramKey]);
    });
  }
  return text;
}

/** Kısayol: t() ile aynı — bazı çağrı yerlerinde U() olarak da kullanılıyordu. */
export const U = t;

export function getCurrentLang() {
  return currentLang;
}

export function getAvailableLanguages() {
  return LANGUAGES;
}

/** Dili değiştirir, localStorage'a kaydeder ve tüm DOM'u günceller. */
export function setLang(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
  applyTranslations();
  document.dispatchEvent(new CustomEvent('firehub:langchange', { detail: { lang } }));
}

/** Belirtilen kök altındaki (varsayılan: document) tüm çeviri attribute'larını uygular. */
export function applyTranslations(root = document) {
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  root.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', t(key));
  });
  root.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    el.setAttribute('aria-label', t(key));
  });
}
