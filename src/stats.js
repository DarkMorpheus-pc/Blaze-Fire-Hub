/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — Global puan istatistikleri
// Katalogdaki her uygulama için başlangıçta TEK SEFERLİK puan/yorum verisi
// çeker (küçük gruplar halinde, art arda) ve kart rozetlerini doldurur.
// Deobfuscate edilmiş build'den (v1.7.10) geri kazanılmıştır.
//
// Not (performans/kararlılık): Önceden burada katalogdaki her uygulama için
// kalıcı bir onSnapshot dinleyicisi açılıyordu (43 tane, oturum boyunca arka
// planda sürekli çalışan). Şu an açık olan uygulama detay sayfası zaten kendi
// canlı dinleyicisini kuruyor (bkz. app-detail-controller.js); genel kart/
// rozet görünümleri için saniyelik gerçek-zamanlılık gerekmediğinden, tek
// seferlik okuma eski/düşük donanımlı sistemlerde sürekli arka plan CPU/
// bellek/IndexedDB yükünü ortadan kaldırır.

import { APP_CATALOG } from './data/catalog.js';
import { state } from './state.js';
import { fetchReviewsOnce, computeRatingStats } from './firebase/reviews.js';
import { refreshAppBadges } from './detail.js';

const BATCH_SIZE = 6;

async function loadStatsFor(appId) {
  const reviews = await fetchReviewsOnce(appId);
  state.reviewsCache[appId] = reviews;
  state.globalStats[appId] = computeRatingStats(reviews);
  refreshAppBadges(appId);
}

/**
 * Her katalog uygulaması için puan/yorum verisini küçük gruplar halinde
 * (art arda, paralel patlama yapmadan) tek seferlik çeker ve rozetleri günceller.
 */
export async function initGlobalStats() {
  const appIds = Object.keys(APP_CATALOG);
  appIds.forEach((appId) => refreshAppBadges(appId));

  for (let i = 0; i < appIds.length; i += BATCH_SIZE) {
    const batch = appIds.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map((appId) => loadStatsFor(appId)));
  }
}
