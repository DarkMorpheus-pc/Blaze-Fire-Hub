/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — Kurulum akışı (platform seçim modalı, indirme progress, kurulum)
// Deobfuscate edilmiş build'den (v1.7.10) geri kazanılmıştır.

import { APP_CATALOG } from './data/catalog.js';
import { t } from './i18n.js';
import { el, escapeHtml, showToast } from './utils.js';
import { state } from './state.js';
import { refreshAppDetailButtons, openAppDetail } from './app-detail-controller.js';

const PLATFORM_NAMES = {
  fedora: 'Fedora/RHEL',
  pisi: 'Pisi Linux',
  debian: 'Debian/Ubuntu',
  windows: 'Windows',
};

const PLATFORM_ORDER = ['fedora', 'pisi', 'debian', 'windows'];

/** Platform seçim modalını açar; uygulamanın desteklediği platformlara göre butonları günceller. */
export function openPlatformModal() {
  state.selectedPlatform = null;
  const app = APP_CATALOG[state.currentAppId];
  if (!app) return;

  document.querySelectorAll('.fh-p2').forEach((btn) => {
    const platform = btn.getAttribute('data-plat');
    const config = app.install?.[platform];
    const supported = config != null;

    btn.classList.remove('sel');
    btn.classList.toggle('unsupported', !supported);
    btn.disabled = !supported;

    const commandLabel = btn.querySelector('.fh-pcm');
    if (!commandLabel) return;

    if (!supported) {
      commandLabel.textContent = t('plat.unsupported');
    } else if (config.type === 'pkg') {
      const cmd = platform === 'fedora' ? 'dnf install' : platform === 'pisi' ? 'pisi it' : 'apt install';
      commandLabel.textContent = `${cmd} ${config.value}`;
    } else if (config.type === 'flatpak') {
      commandLabel.textContent = `flatpak · ${config.value}`;
    } else if (config.type === 'url') {
      commandLabel.textContent = `${config.ext || '.pkg'} · direct download`;
    }
  });

  const supportedPlatforms = PLATFORM_ORDER.filter((p) => app.install?.[p] != null);
  if (supportedPlatforms.length === 0) {
    showToast('Platform yok', 'Bu uygulama hiçbir platformu desteklemiyor', undefined, true);
    return;
  }
  if (supportedPlatforms.length === 1) {
    const only = supportedPlatforms[0];
    document.querySelector(`.fh-p2[data-plat="${only}"]`)?.classList.add('sel');
    state.selectedPlatform = only;
    el('pOk').disabled = false;
  } else {
    el('pOk').disabled = true;
  }

  el('platM').classList.add('act');
}

/** Platform seçim modalındaki tıklama/onay/iptal olaylarını bağlar (tek seferlik init). */
export function initPlatformModal() {
  document.querySelectorAll('.fh-p2').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('unsupported')) {
        const app = APP_CATALOG[state.currentAppId];
        const platform = btn.getAttribute('data-plat');
        const supportedNames = PLATFORM_ORDER
          .filter((p) => app.install?.[p] != null)
          .map((p) => ({ fedora: 'Fedora', pisi: 'Pisi Linux', debian: 'Debian/Ubuntu', windows: 'Windows' })[p])
          .filter(Boolean);
        const message = supportedNames.length
          ? `${app.name} yalnızca ${supportedNames.join(', ')} üzerinde çalışır`
          : `${app.name} bu platformda kullanılabilir değil`;
        showToast(message, `${PLATFORM_NAMES[platform]} desteklenmiyor`, undefined, true);
        return;
      }
      document.querySelectorAll('.fh-p2').forEach((b) => b.classList.remove('sel'));
      btn.classList.add('sel');
      state.selectedPlatform = btn.getAttribute('data-plat');
      el('pOk').disabled = false;
    });
  });

  el('pC').addEventListener('click', () => el('platM').classList.remove('act'));
  el('pOk').addEventListener('click', () => {
    if (state.selectedPlatform && state.currentAppId) {
      el('platM').classList.remove('act');
      startInstall();
    }
  });

  el('instIsl')?.addEventListener('click', () => {
    const appId = Object.keys(state.activeInstalls)[0];
    if (appId) openAppDetail(appId);
  });
}

/** Seçilen platform için indirme/kurulumu başlatır ve ilerlemeyi izler. */
async function startInstall() {
  const appId = state.currentAppId;
  const app = APP_CATALOG[appId];
  const platform = state.selectedPlatform;
  const config = app.install?.[platform];

  if (!config) {
    const platformLabel = PLATFORM_NAMES[platform] || platform;
    showToast('Desteklenmiyor', `${app.name} ${platformLabel} uzerinde calismaz`, undefined, true);
    return;
  }

  const { type, value, ext = '.pkg', note } = config;
  const stageLabel = { url: `Indiriliyor... (${ext})`, pkg: 'Paket yoneticisi ile kuruluyor', flatpak: 'Flatpak ile kuruluyor' }[type] || 'Kuruluyor';

  const installId = Date.now() + '_' + Math.random().toString(36).slice(2);

  // GÜVENLİK/DÜZELTME: kurulum durumu artık appId'ye göre state.activeInstalls'ta
  // tutuluyor (tek bir global "activeInstallToken" yerine) — kullanıcı kurulum
  // sırasında başka bir uygulamaya/sayfaya geçse bile (arka planda kurulum
  // gerçekten sürdüğü için) ilerleme kaybolmuyor; detay sayfası tekrar
  // açıldığında resumeInstallProgressUI() ile buradan devam ettiriliyor.
  // Ayrıca iki farklı uygulamanın eşzamanlı kurulumu artık birbirini
  // ezmiyor (öncesinde tek global token bunu bozuyordu).
  state.activeInstalls[appId] = {
    installId, appName: app.name, appIcon: app.ic, appColor: app.co,
    type, ext, platform, stage: 'start', statusText: stageLabel + '...',
    percent: 0, received: 0, total: 0,
  };
  updateGlobalInstallIsland();

  renderInstallProgress(appId, installId, stageLabel + '...', 0, type, ext, app);
  attachInstallBoxHandler(appId, installId);

  const unsubscribeProgress = window.firehub?.onInstallProgress((progress) => {
    if (progress.id !== installId) return;
    if (!state.activeInstalls[appId] || state.activeInstalls[appId].installId !== installId) return;
    applyProgressUpdate(appId, progress, app, ext, type, platform);
  });

  try {
    // GÜVENLİK: main process'e yalnızca id/appId/platform gönderilir.
    // Gerçek url/pkgName/flatpakId değerleri main process'teki katalogdan
    // okunur — renderer bunları hiç taşımaz (bkz. electron/main.js).
    const result = await window.firehub.installApp({ id: installId, appId, platform });

    unsubscribeProgress?.();
    if (!state.activeInstalls[appId] || state.activeInstalls[appId].installId !== installId) return;

    if (result.ok) {
      onInstallSuccess(appId, app, platform);
    } else {
      handleInstallFailure(appId, result.error || '', installId, app, ext, type);
    }
  } catch (err) {
    unsubscribeProgress?.();
    if (!state.activeInstalls[appId] || state.activeInstalls[appId].installId !== installId) return;
    handleInstallFailure(appId, err.message || '', installId, app, ext, type);
  }
}

/** #iw içindeki kurulum kutusuna cancel/retry/back tıklama dinleyicisini bağlar. */
function attachInstallBoxHandler(appId, installId) {
  const installBox = el('iw');
  if (installBox._installHandler) {
    installBox.removeEventListener('click', installBox._installHandler);
  }

  const clickHandler = (event) => {
    const actionBtn = event.target.closest('[data-action]');
    if (!actionBtn) return;
    const action = actionBtn.dataset.action;

    if (action === 'cancel') {
      actionBtn.innerHTML = '<div class="fh-sp" style="width:14px;height:14px;border-color:rgba(255,255,255,0.3);border-top-color:#fff;"></div>';
      actionBtn.disabled = true;
      window.firehub?.cancelInstall(installId);
      delete state.activeInstalls[appId];
      updateGlobalInstallIsland();
      setTimeout(() => {
        installBox.removeEventListener('click', clickHandler);
        installBox._installHandler = null;
        if (state.currentAppId === appId) refreshAppDetailButtons(appId);
        showToast('isl.install.canceled', 'isl.install.canceled.sub', {}, false);
      }, 400);
    } else if (action === 'retry') {
      installBox.removeEventListener('click', clickHandler);
      installBox._installHandler = null;
      startInstall();
    } else if (action === 'back') {
      installBox.removeEventListener('click', clickHandler);
      installBox._installHandler = null;
      if (state.currentAppId === appId) refreshAppDetailButtons(appId);
    }
  };
  installBox.addEventListener('click', clickHandler);
  installBox._installHandler = clickHandler;
}

/**
 * Bir uygulamanın detay sayfası, o uygulama için arka planda devam eden bir
 * kurulum varken açıldığında çağrılır — checkAppInstalled() yerine bilinen
 * son ilerlemeyi #iw'ye tekrar çizer (bkz. app-detail-controller.js).
 */
export function resumeInstallProgressUI(appId) {
  const install = state.activeInstalls[appId];
  if (!install) return;
  const app = APP_CATALOG[appId];
  renderInstallProgress(appId, install.installId, install.statusText, install.percent, install.type, install.ext, app);
  attachInstallBoxHandler(appId, install.installId);
}

const NETWORK_ERROR_PATTERN = /ENOTFOUND|ECONNRESET|ETIMEDOUT|ECONNREFUSED|ENETUNREACH|socket hang|fetch failed|ERR_NETWORK/i;

function handleInstallFailure(appId, errorMessage, installId, app, ext, type) {
  delete state.activeInstalls[appId];
  updateGlobalInstallIsland();
  if (state.currentAppId !== appId) {
    showToast('isl.install.fail', `${app.name}: ${errorMessage}`, {}, true);
    return;
  }
  if (NETWORK_ERROR_PATTERN.test(errorMessage)) {
    renderNetworkErrorPanel(errorMessage);
  } else {
    showToast('isl.install.fail', errorMessage, {}, true);
    refreshAppDetailButtons(appId);
  }
}

function renderInstallProgress(appId, installId, statusText, percent, type, ext, app) {
  const sizeText = type === 'url' ? `0 / ${app.sz} MB` : statusText;
  const percentText = type === 'url' ? `${percent}%` : '...';
  el('iw').innerHTML = `
    <div class="fh-inst" data-install-id="${installId}">
      <div class="fh-it">
        <div class="fh-iif">
          <div class="fh-sp"></div>
          <span id="iSt">${escapeHtml(statusText)}</span>
        </div>
        <button class="fh-icl" data-action="cancel" aria-label="Iptal">
          <i class="ti ti-x"></i>
        </button>
      </div>
      <div class="fh-pw"><div class="fh-pb" id="iPb" style="width:${percent}%"></div></div>
      <div class="fh-pt">
        <span id="iSz">${escapeHtml(sizeText)}</span>
        <span><b id="iPc">${percentText}</b></span>
      </div>
    </div>`;
}

function renderNetworkErrorPanel(message) {
  el('iw').innerHTML = `
    <div style="display:flex;flex-direction:column;gap:10px;">
      <div style="font-size:12px;color:var(--warn);padding:8px 4px;line-height:1.5;display:flex;gap:8px;align-items:flex-start;">
        <i class="ti ti-wifi-off" style="flex-shrink:0;margin-top:1px;"></i>
        <span>${escapeHtml(message || 'Baglanti kesildi')}</span>
      </div>
      <button class="fh-ib2" data-action="retry">
        <i class="ti ti-refresh"></i>
        <span>Yeniden dene</span>
      </button>
      <button class="fh-ib2 fh-ib2-reinstall" data-action="back">
        <i class="ti ti-arrow-left"></i>
        <span>Vazgec</span>
      </button>
    </div>`;
}

function applyProgressUpdate(appId, progress, app, ext, type, platform) {
  const install = state.activeInstalls[appId];
  if (!install) return;

  install.stage = progress.stage;

  if (progress.stage === 'download') {
    const pct = progress.total > 0 ? Math.min(99, Math.round((progress.received / progress.total) * 100)) : 0;
    install.percent = pct;
    install.received = progress.received;
    install.total = progress.total;
    install.statusText = t('plat.downloading', { ext });
  } else if (progress.stage === 'verify') {
    install.statusText = t('plat.verifying');
    install.percent = 90;
  } else if (progress.stage === 'install') {
    const cmd = platform === 'windows' ? 'MSI' : platform === 'fedora' ? 'dnf' : 'dpkg';
    install.statusText = t('plat.installing', { cmd });
    install.percent = 100;
  } else if (progress.stage === 'pkg') {
    install.statusText = progress.msg || t('plat.installing', { cmd: platform === 'fedora' ? 'dnf' : platform === 'pisi' ? 'pisi' : 'apt' });
    install.percent = 70;
  } else if (progress.stage === 'flatpak') {
    install.statusText = progress.msg || 'flatpak install...';
    install.percent = 65;
  }

  updateGlobalInstallIsland();

  // #iw yalnızca şu an bu uygulamanın detay sayfası açıksa güncellenir —
  // kullanıcı başka bir sayfadaysa DOM'a dokunmuyoruz (bkz. resumeInstallProgressUI).
  if (state.currentAppId !== appId) return;

  const progressBar = el('iPb');
  const percentLabel = el('iPc');
  const sizeLabel = el('iSz');
  const statusLabel = el('iSt');
  if (!progressBar) return;

  progressBar.style.width = `${install.percent}%`;
  if (statusLabel) statusLabel.textContent = install.statusText;
  if (progress.stage === 'download') {
    if (percentLabel) percentLabel.textContent = `${install.percent}%`;
    if (sizeLabel) {
      const receivedMb = (progress.received / 1048576).toFixed(1);
      const totalMb = progress.total > 0 ? (progress.total / 1048576).toFixed(1) : app.sz;
      sizeLabel.textContent = `${receivedMb} / ${totalMb} MB`;
    }
  } else if (progress.stage === 'install' && percentLabel) {
    percentLabel.textContent = '100%';
  }
}

function onInstallSuccess(appId, app, platform) {
  delete state.activeInstalls[appId];
  updateGlobalInstallIsland();
  const platformLabel = PLATFORM_NAMES[platform];
  showToast('isl.installed', 'isl.installed.sub', { name: app.name, platform: platformLabel });
  setTimeout(() => {
    if (state.currentAppId === appId) refreshAppDetailButtons(appId);
  }, 1500);
}

/**
 * Sağ altta kalıcı kurulum göstergesini state.activeInstalls'a göre günceller/
 * gösterir/gizler. Birden fazla eşzamanlı kurulum varsa en son güncelleneni
 * gösterir ve "+N" ile diğerlerinin sayısını belirtir.
 */
function updateGlobalInstallIsland() {
  const island = el('instIsl');
  if (!island) return;

  const entries = Object.entries(state.activeInstalls);
  if (entries.length === 0) {
    island.classList.remove('show');
    return;
  }

  const [appId, install] = entries[entries.length - 1];
  const nameEl = el('instIslName');
  const pctEl = el('instIslPct');
  const barEl = el('instIslBar');
  const iconEl = el('instIslIcon');

  if (iconEl) {
    iconEl.innerHTML = install.appIcon || '';
    iconEl.className = `fh-ii-icon ${install.appColor || ''}`;
  }
  if (nameEl) {
    const extra = entries.length > 1 ? ` (+${entries.length - 1})` : '';
    nameEl.textContent = install.appName + extra;
  }
  if (barEl) barEl.style.width = `${install.percent}%`;
  if (pctEl) pctEl.textContent = install.type === 'url' ? `${install.percent}%` : '';

  island.dataset.appId = appId;
  island.classList.add('show');
}
