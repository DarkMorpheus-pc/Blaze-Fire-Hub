/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — Genel yardımcı fonksiyonlar

import { t } from './i18n.js';

/** document.getElementById kısayolu. */
export const el = (id) => document.getElementById(id);

/** XSS'e karşı güvenli HTML escape. Null/undefined/sayı gruplarını emniyetle işler. */
export function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[ch]);
}

const AVATAR_COLORS = [
  '#BF360C', '#6750A4', '#2E7D32', '#0061A4', '#9A4500',
  '#006A60', '#C2185B', '#7B1FA2', '#1976D2', '#388E3C',
];

/** Kullanıcı adından tutarlı bir avatar rengi üretir (basit hash). */
export function avatarColor(name) {
  if (!name) return '#E8714C';
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

/** Arama için Türkçe karakterleri sadeleştirir (diyakritiksiz karşılaştırma). */
export function normalizeSearchText(value) {
  return String(value)
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i')
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');
}

/**
 * "Dynamic Island" tarzı üstte beliren bildirimi gösterir.
 * @param {string} title - Düz metin ya da içinde "." geçen bir i18n anahtarı
 * @param {string} [subtitle] - Düz metin ya da i18n anahtarı
 * @param {Record<string,string>} [params] - i18n şablon parametreleri
 * @param {boolean} [isError=false]
 */
export function showToast(title, subtitle, params, isError = false) {
  el('islT').textContent = typeof title === 'string' && title.includes('.')
    ? t(title, params)
    : title;
  el('islS').textContent = typeof subtitle === 'string' && subtitle.includes('.')
    ? t(subtitle, params)
    : subtitle || '';

  const checkIcon = document.querySelector('#isl .fh-i-check');
  if (checkIcon) {
    checkIcon.style.background = isError ? '#CF6679' : '#4CAF50';
    checkIcon.innerHTML = isError
      ? '<i class="ti ti-x" style="font-size:17px;"></i>'
      : '<i class="ti ti-check"></i>';
  }

  const island = el('isl');
  island.classList.remove('isl-error', 'isl-ok');
  island.classList.add(isError ? 'isl-error' : 'isl-ok');
  island.classList.add('show');

  clearTimeout(window._islandTimer);
  window._islandTimer = setTimeout(
    () => island.classList.remove('show'),
    isError ? 7000 : 5000,
  );
}
