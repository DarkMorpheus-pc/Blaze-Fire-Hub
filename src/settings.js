/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — Ayarlar paneli (tema, profil, hesap silme, dil, hakkında)
// Deobfuscate edilmiş build'den (v1.7.10) geri kazanılmıştır.

import { t, setLang, getCurrentLang, getAvailableLanguages, applyTranslations } from './i18n.js';
import { el, escapeHtml, avatarColor, showToast } from './utils.js';
import { state } from './state.js';
import { signOut, deleteAccount } from './firebase/auth.js';
import { renderPopularStrip, renderTrendingList, refreshBrowseView } from './browse.js';
import { refreshAppBadges } from './detail.js';
import { APP_CATALOG } from './data/catalog.js';

const THEMES = ['coral', 'purple', 'forest', 'ocean', 'sunset', 'mint', 'dark'];
const rootEl = () => el('fh');

/** Temayı uygular, kök elemente sınıf ekler, seçim göstergesini günceller, localStorage'a kaydeder. */
function applyTheme(theme) {
  THEMES.forEach((th) => rootEl().classList.remove(`t-${th}`));
  rootEl().classList.add(`t-${theme}`);
  document.querySelectorAll('.fh-th').forEach((el2) => {
    el2.classList.toggle('sel', el2.getAttribute('data-theme') === theme);
  });
  try { localStorage.setItem('firehub.theme', theme); } catch {}
}

/** Kayıtlı temayı (varsa) yükler. */
function restoreSavedTheme() {
  try {
    const saved = localStorage.getItem('firehub.theme');
    if (saved && THEMES.includes(saved)) applyTheme(saved);
  } catch {}
}

/** Ayarlar > Hesap bölümündeki profil kutusunu (giriş yapılmışsa profil, değilse CTA) render eder. */
function renderProfileBox() {
  const box = el('profileBox');
  if (!box) return;

  if (state.currentUser) {
    const user = state.currentUser;
    const name = user.displayName || user.email?.split('@')[0] || 'User';
    box.innerHTML = `
      <div class="fh-prof">
        <div class="fh-prof-av" style="background:${avatarColor(user.uid)};">${escapeHtml(name.charAt(0).toUpperCase())}</div>
        <div class="fh-prof-i">
          <div class="fh-prof-n">${escapeHtml(name)}</div>
          <div class="fh-prof-e">${escapeHtml(user.email || '')}</div>
        </div>
      </div>
      <div class="fh-set-card">
        <div class="fh-set-row" id="profEdit">
          <div class="fh-set-ic"><i class="ti ti-edit"></i></div>
          <div class="fh-set-info">
            <div class="fh-set-n">${escapeHtml(t('settings.profile.edit'))}</div>
            <div class="fh-set-s">${escapeHtml(t('settings.profile.edit.sub'))}</div>
          </div>
          <i class="ti ti-chevron-right fh-set-chev"></i>
        </div>
        <div class="fh-set-row" id="profOut">
          <div class="fh-set-ic" style="background:var(--warn-c);color:var(--warn);"><i class="ti ti-logout"></i></div>
          <div class="fh-set-info">
            <div class="fh-set-n" style="color:var(--warn);">${escapeHtml(t('settings.signout'))}</div>
            <div class="fh-set-s">${escapeHtml(t('settings.signout.sub'))}</div>
          </div>
        </div>
        <div class="fh-set-row" id="profDelete">
          <div class="fh-set-ic" style="background:rgba(207,102,121,0.15);color:#CF6679;"><i class="ti ti-trash"></i></div>
          <div class="fh-set-info">
            <div class="fh-set-n" style="color:#CF6679;">Hesabımı sil</div>
            <div class="fh-set-s">Bu işlem geri alınamaz</div>
          </div>
        </div>
      </div>`;

    document.getElementById('profEdit')?.addEventListener('click', () => showToast('isl.soon', 'isl.soon.profile'));
    document.getElementById('profOut')?.addEventListener('click', async () => {
      try {
        await signOut();
        el('setM').classList.remove('act');
        showToast('isl.signedout', 'isl.signedout.sub');
      } catch (err) {
        showToast('Error', err.message || 'Unknown');
      }
    });
    document.getElementById('profDelete')?.addEventListener('click', openDeleteAccountModal);
  } else {
    box.innerHTML = `
      <div class="fh-prof-cta">
        <i class="ti ti-user-circle"></i>
        <h4>${escapeHtml(t('settings.profile.cta.title'))}</h4>
        <p>${escapeHtml(t('settings.profile.cta.sub'))}</p>
        <button class="fh-bf" id="loginFromSet" style="width:auto;display:inline-flex;padding:10px 22px;">
          <i class="ti ti-login-2"></i>${escapeHtml(t('topbar.signin'))}
        </button>
      </div>`;
    document.getElementById('loginFromSet')?.addEventListener('click', () => {
      el('setM').classList.remove('act');
      setTimeout(() => el('logM').classList.add('act'), 200);
    });
  }
}

/** Hesap silme onay modalını açar (Google girişliyse şifre alanını gizler). */
function openDeleteAccountModal() {
  if (!state.currentUser) return;
  el('delAccPass').value = '';
  const isGoogleUser = state.currentUser.providerData?.[0]?.providerId === 'google.com';
  el('delAccPass').style.display = isGoogleUser ? 'none' : '';
  el('delAccM').classList.add('act');
}

/** Dil seçici modalını açar ve mevcut dilleri listeler. */
function openLanguageModal() {
  const list = el('langList');
  const current = getCurrentLang();
  list.innerHTML = Object.entries(getAvailableLanguages()).map(([code, lang]) => `
    <button class="fh-lang ${code === current ? 'sel' : ''}" data-lang="${code}">
      <span class="fh-lang-flag">${lang.flag}</span>
      <span class="fh-lang-name">${lang.name}</span>
      ${code === current ? '<i class="ti ti-check" style="color:var(--p);font-size:18px;"></i>' : ''}
    </button>`).join('');

  list.querySelectorAll('.fh-lang').forEach((btn) => {
    btn.addEventListener('click', () => {
      const langCode = btn.getAttribute('data-lang');
      setLang(langCode);
      applyTranslations();
      updateLangCurrentLabel();
      renderProfileBox();
      renderTrendingList();
      renderPopularStrip();
      Object.keys(APP_CATALOG).forEach(refreshAppBadges);
      refreshBrowseView();
      el('langM').classList.remove('act');
      showToast('isl.lang.changed', 'isl.lang.changed.sub', { name: getAvailableLanguages()[langCode].name });
    });
  });

  el('langM').classList.add('act');
}

function updateLangCurrentLabel() {
  el('langCurrent').textContent = getAvailableLanguages()[getCurrentLang()].name;
}

/** Ayarlar panelindeki tüm olay dinleyicilerini bağlar (tek seferlik init). */
export function initSettings() {
  restoreSavedTheme();

  document.querySelectorAll('.fh-th').forEach((themeBtn) => {
    themeBtn.addEventListener('click', () => {
      const theme = themeBtn.getAttribute('data-theme');
      applyTheme(theme);
      showToast('isl.theme.changed', 'isl.theme.changed.sub', { name: themeBtn.querySelector('.fh-th-n').textContent });
    });
  });

  el('delAccCancel').addEventListener('click', () => el('delAccM').classList.remove('act'));
  el('delAccOk').addEventListener('click', async () => {
    const isGoogleUser = state.currentUser?.providerData?.[0]?.providerId === 'google.com';
    const password = isGoogleUser ? null : el('delAccPass').value;
    if (!isGoogleUser && !password) {
      showToast('Şifre gerekli', 'Hesap silmek için şifrenizi girin', {}, true);
      return;
    }

    const btn = el('delAccOk');
    btn.disabled = true;
    const originalHtml = btn.innerHTML;
    btn.innerHTML = '<div class="fh-sp" style="border-color:rgba(255,255,255,0.3);border-top-color:#fff;"></div>Siliniyor...';

    try {
      await deleteAccount(password);
      el('delAccM').classList.remove('act');
      el('setM').classList.remove('act');
      showToast('Hesabınız silindi', 'Tüm verileriniz kaldırıldı');
    } catch (err) {
      showToast('Hesap silinemedi', err.message || 'Bilinmeyen hata', {}, true);
    } finally {
      btn.disabled = false;
      btn.innerHTML = originalHtml;
    }
  });

  el('setB').addEventListener('click', () => {
    renderProfileBox();
    el('setM').classList.add('act');
  });

  document.getElementById('ghBtn')?.addEventListener('click', () => {
    window.firehub?.openExternal('https://github.com/DarkMorpheus-pc');
  });

  el('setClose').addEventListener('click', () => el('setM').classList.remove('act'));

  ['motionTog', 'updTog', 'newsTog', 'repTog'].forEach((id) => {
    const toggle = el(id);
    if (!toggle) return;
    try {
      const saved = localStorage.getItem(`firehub.toggle.${id}`);
      if (saved === 'on') toggle.classList.add('on');
      else if (saved === 'off') toggle.classList.remove('on');
    } catch {}
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('on');
      try {
        localStorage.setItem(`firehub.toggle.${id}`, toggle.classList.contains('on') ? 'on' : 'off');
      } catch {}
    });
  });

  updateLangCurrentLabel();
  el('langRow').addEventListener('click', openLanguageModal);
  el('langClose').addEventListener('click', () => el('langM').classList.remove('act'));

  el('aboutOpenRow').addEventListener('click', () => {
    el('aboutLicenseText').textContent = t('about.license.body');
    el('aboutM').classList.add('act');
  });
  el('aboutClose').addEventListener('click', () => el('aboutM').classList.remove('act'));
  el('ghRow').addEventListener('click', () => window.firehub?.openExternal('https://github.com/DarkMorpheus-pc/Blaze-Fire-Hub/releases'));

  el('chkUpdRow')?.addEventListener('click', () => {
    if (lastUpdateResult?.hasUpdate) {
      window.firehub?.openExternal(lastUpdateResult.releaseUrl);
      return;
    }
    checkForUpdatesUI(false);
  });
}

/** appId -> son güncelleme kontrolü sonucu (chkUpdRow tıklama davranışını belirler). */
let lastUpdateResult = null;

/**
 * GitHub Releases'i kontrol eder ve Ayarlar > Hakkında satırını günceller.
 * @param {boolean} silent - true ise satır metnini "kontrol ediliyor" ile değiştirmez
 *   (arka planda, kullanıcı ayarları açmamışken sessizce kontrol için).
 */
async function checkForUpdatesUI(silent) {
  const sub = el('chkUpdSub');
  const icon = el('chkUpdIcon');
  if (!silent && sub) sub.textContent = t('update.checking');
  icon?.classList.add('ti-spin');

  try {
    const result = await window.firehub?.checkForUpdates();
    icon?.classList.remove('ti-spin');
    if (!result?.ok) {
      lastUpdateResult = null;
      if (sub) sub.textContent = t('update.checkfailed');
      return;
    }
    lastUpdateResult = result;
    if (result.hasUpdate) {
      if (sub) sub.textContent = t('update.available', { version: result.latestVersion });
      // Sessiz (başlangıç) kontrolünde kullanıcı Ayarlar'a bakmıyor olabilir —
      // bunu kaçırmaması için ayrıca bir toast gösterilir. Kullanıcı Ayarlar'ı
      // açıp elle kontrol ettiyse satırın kendisi zaten sonucu gösteriyor.
      if (silent) {
        showToast('isl.update.available', 'isl.update.available.sub', { version: result.latestVersion });
      }
    } else if (sub) {
      sub.textContent = t('update.uptodate', { version: result.currentVersion });
    }
  } catch {
    icon?.classList.remove('ti-spin');
    lastUpdateResult = null;
    if (sub) sub.textContent = t('update.checkfailed');
  }
}

/**
 * Uygulama başlangıcında (main.js'ten) "App updates" bildirimleri açıksa
 * sessizce bir kere kontrol eder. Kapalıysa hiçbir ağ isteği yapılmaz.
 */
export function checkForUpdatesOnStartup() {
  let updatesEnabled = true;
  try { updatesEnabled = localStorage.getItem('firehub.toggle.updTog') !== 'off'; } catch {}
  if (updatesEnabled) checkForUpdatesUI(true);
}

export { renderProfileBox };
