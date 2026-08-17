/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — Detay sayfası ve kart rozeti render mantığı
// Deobfuscate edilmiş build'den (v1.7.10) geri kazanılmıştır.

import { APP_CATALOG } from './data/catalog.js';
import { t } from './i18n.js';
import { el, escapeHtml, avatarColor } from './utils.js';
import { state } from './state.js';
import { timeAgo } from './firebase/reviews.js';

/**
 * Bir uygulamanın kart rozetlerini (ana sayfa kartı, popüler şerit, arama
 * sonucu satırı) güncel puan istatistiğiyle günceller. initGlobalStats ve
 * canlı review dinleyicileri tarafından çağrılır.
 */
export function refreshAppBadges(appId) {
  const stats = state.globalStats[appId];
  const avgText = stats ? stats.avg.toFixed(1) : null;
  const app = APP_CATALOG[appId];
  if (!app) return;

  document.querySelectorAll(`.fh-ac[data-app="${appId}"]`).forEach((card) => {
    const catEl = card.querySelector('.fh-acat');
    if (catEl) catEl.textContent = t(app.scatKey || 'cat.foryou');

    const ratingEl = card.querySelector('.fh-ar');
    if (ratingEl) {
      ratingEl.innerHTML = avgText
        ? `<i class="ti ti-star-filled"></i>${avgText}`
        : `<span style="font-style:italic;opacity:0.75;">${escapeHtml(t('review.new'))}</span>`;
    }
  });

  document.querySelectorAll(`.fh-li[data-app="${appId}"] .fh-lm`).forEach((metaEl) => {
    let html = `${escapeHtml(t(app.scatKey || 'cat.foryou'))}<span class="d"></span>${app.sz} MB`;
    html += avgText
      ? `<span class="d"></span><i class="ti ti-star-filled" style="font-size:11px;color:var(--t);"></i> ${avgText}`
      : `<span class="d"></span><span style="font-style:italic;opacity:0.8;">${escapeHtml(t('review.new'))}</span>`;
    metaEl.innerHTML = html;
  });
}

/** Detay sayfasındaki büyük puan özetini (ortalama, yıldızlar, dağılım barları) render eder. */
export function renderRatingSummary(appId) {
  const stats = state.globalStats[appId];

  if (stats) {
    el('dR').textContent = stats.avg.toFixed(1);
    el('dRn').textContent = `${stats.count} ${t('detail.reviews')}`;
    el('rB').textContent = stats.avg.toFixed(1);
    el('rC').textContent = `${stats.count} ${t('detail.votes')}`;

    const rounded = Math.round(stats.avg);
    el('rS').innerHTML = Array(5).fill(0)
      .map((_, i) => `<i class="ti ti-star${i < rounded ? '-filled' : ''}"></i>`)
      .join('');

    el('rBars').innerHTML = stats.distPct
      .map((pct, i) => `
        <div class="fh-rbr">
          <span class="fh-rbn">${5 - i}</span>
          <div class="fh-rbt"><div class="fh-rbf" style="width:${pct}%"></div></div>
          <span class="fh-rbp">${pct}%</span>
        </div>`)
      .join('');
  } else {
    el('dR').textContent = '—';
    el('dRn').textContent = t('review.none').split('.')[0];
    el('rB').textContent = '—';
    el('rC').textContent = `0 ${t('detail.votes')}`;
    el('rS').innerHTML = Array(5).fill(0).map(() => '<i class="ti ti-star"></i>').join('');
    el('rBars').innerHTML = [5, 4, 3, 2, 1]
      .map((n) => `
        <div class="fh-rbr">
          <span class="fh-rbn">${n}</span>
          <div class="fh-rbt"><div class="fh-rbf" style="width:0%"></div></div>
          <span class="fh-rbp">0%</span>
        </div>`)
      .join('');
  }
}

/** Detay sayfasındaki yorum listesini (en fazla 8 yorum) render eder. */
export function renderReviewList(appId) {
  const reviews = state.reviewsCache[appId] || [];

  if (reviews.length === 0) {
    el('rL').innerHTML = `<div style="padding:14px;text-align:center;color:var(--on-v);font-size:13px;">${escapeHtml(t('review.none'))}</div>`;
    return;
  }

  el('rL').innerHTML = reviews.slice(0, 8).map((review) => {
    const initial = (review.displayName || '?').charAt(0).toUpperCase();
    const stars = Array(5).fill(0)
      .map((_, i) => `<i class="ti ti-star${i < review.rating ? '-filled' : ''}"></i>`)
      .join('');
    return `
      <div class="fh-rev">
        <div class="fh-ret">
          <div class="fh-rav" style="background:${avatarColor(review.uid)};">${escapeHtml(initial)}</div>
          <div class="fh-rem">
            <div class="fh-ren">${escapeHtml(review.displayName || 'Anonymous')}</div>
            <div class="fh-rew">${escapeHtml(timeAgo(review.createdAt))}</div>
          </div>
          <div class="fh-res">${stars}</div>
        </div>
        <div class="fh-rex">${escapeHtml(review.text)}</div>
      </div>`;
  }).join('');
}
