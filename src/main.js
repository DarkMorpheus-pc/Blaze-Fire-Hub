/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — Uygulama başlangıç noktası
// Deobfuscate edilmiş build'den (v1.7.10) geri kazanılmıştır.

import './styles.css';
import { applyTranslations } from './i18n.js';
import { el, showToast } from './utils.js';
import { state } from './state.js';
import { onAuthChange } from './firebase/auth.js';
import { initBrowse, renderPopularStrip, renderTrendingList, refreshBrowseView } from './browse.js';
import { initPlatformModal } from './install.js';
import { initAuthModal } from './auth-modal.js';
import { initSettings, renderProfileBox, checkForUpdatesOnStartup } from './settings.js';
import { initReviewForm, prefillMyReview } from './review-form.js';
import { initGlobalStats } from './stats.js';
import { initLocalPackageInstaller } from './local-package-installer.js';
import { initUpdatesController } from './updates-controller.js';

function setupGlobalKeybindings() {
  document.addEventListener('keydown', (e) => {
    // Ctrl+K veya boştayken "/" tuşuna basıldığında aramaya odaklan
    if (
      (e.ctrlKey && (e.key === 'k' || e.key === 'K')) ||
      (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA')
    ) {
      e.preventDefault();
      const searchInput = el('searchInput') || document.querySelector('.fh-sr input');
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    } else if (e.key === 'Escape') {
      // Modalları kapat veya aramayı temizle
      const modals = ['pkgM', 'platM', 'setM', 'logM'];
      let closedModal = false;
      for (const mId of modals) {
        const modal = el(mId);
        if (modal && modal.classList.contains('act')) {
          modal.classList.remove('act');
          closedModal = true;
          break;
        }
      }
      if (!closedModal) {
        const searchInput = el('searchInput') || document.querySelector('.fh-sr input');
        if (searchInput && searchInput.value) {
          searchInput.value = '';
          searchInput.dispatchEvent(new Event('input'));
        }
      }
    }
  });
}

function bootstrap() {
  applyTranslations();

  initBrowse();
  initPlatformModal();
  initLocalPackageInstaller();
  initUpdatesController();
  setupGlobalKeybindings();
  initAuthModal();
  initSettings();
  initReviewForm();

  renderPopularStrip();
  renderTrendingList();

  // Ana sayfa varsayılan görünümde başlar (filtre yok)
  refreshBrowseView();

  // Puan/yorum istatistiklerini ilk boyamadan SONRAYA ertele — tarayıcı önce
  // gözle görülen arayüzü (kartlar, kategoriler) çizsin, ardından Firestore
  // okumaları arka planda başlasın. Eski/düşük donanımlı sistemlerde ilk
  // etkileşilebilirlik süresini kısaltır.
  const scheduleIdle = window.requestIdleCallback || ((fn) => setTimeout(fn, 0));
  scheduleIdle(() => initGlobalStats());

  // FireHub'ın kendisi için GitHub Releases'i sessizce bir kere kontrol eder
  // ("App updates" bildirimleri kapalıysa hiç ağ isteği yapılmaz, bkz. settings.js).
  scheduleIdle(() => checkForUpdatesOnStartup());

  // Auth durum değişikliklerini dinle — üst bar, ayarlar profili, hoş geldin bildirimi
  onAuthChange((user) => {
    state.currentUser = user;

    if (user) {
      const name = user.displayName || user.email?.split('@')[0] || 'User';
      el('uav').textContent = name.charAt(0).toUpperCase();
      el('un').textContent = name;
      el('loginB').classList.add('hide');
      el('uc').classList.add('show');

      if (state.currentAppId) {
        el('wrS').textContent = 'review.share';
        prefillMyReview(state.currentAppId);
      }

      showToast('isl.welcome', 'isl.welcome.sub', { name });
    } else {
      el('loginB').classList.remove('hide');
      el('uc').classList.remove('show');
      if (state.currentAppId) {
        el('wrS').textContent = 'review.signin';
      }
    }

    renderProfileBox();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
