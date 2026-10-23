/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz.
 */

// ============================================================================
// FIREHUB GÜNCELLEME MERKEZİ (UPDATES HUB CONTROLLER)
// ============================================================================
// BCDL Kinetic Glass mimarisi ile Flatpak ve sistem uygulama güncellemelerini
// tarar, sürüm farklarını gösterir ve tek tıkla güncelleme akışı sağlar.
// ============================================================================

import { el, showToast, escapeHtml } from './utils.js';
import { t } from './i18n.js';
import { state } from './state.js';

export const updatesState = {
  isChecking: false,
  isUpdatingAll: false,
  updatingAppId: null,
  list: [],
  lastChecked: null,
};

/**
 * Uygulama ikonunu render eder (yerel 128x128 ikon veya yedek Tabler ikonu)
 */
function renderUpdateIcon(app) {
  if (app.icon) {
    return `
      <img class="fh-app-img fh-img-md" src="./icons/${escapeHtml(app.icon)}.png" alt="${escapeHtml(app.name)}" onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='flex';" />
      <span class="fh-icon-fallback" style="display:none;color:var(--p);"><i class="ti ti-box"></i></span>
    `;
  }
  return `<span class="fh-icon-fallback" style="display:flex;color:var(--p);"><i class="ti ti-box"></i></span>`;
}

/**
 * Sekme rozetini günceller
 */
export function updateTabBadge() {
  const badge = el('updatesBadge');
  if (!badge) return;
  const count = updatesState.list.length;
  if (count > 0) {
    badge.textContent = count;
    badge.style.display = 'inline-flex';
  } else {
    badge.style.display = 'none';
  }
}

/**
 * Güncellemeleri arka planda sorgular
 */
export async function checkForUpdates(silent = false) {
  if (!window.firehub || typeof window.firehub.checkAppUpdates !== 'function') return;
  if (updatesState.isChecking) return;

  updatesState.isChecking = true;
  const refreshBtn = el('btnRefreshUpdates');
  if (refreshBtn) refreshBtn.classList.add('rotating');

  try {
    const res = await window.firehub.checkAppUpdates();
    if (res && Array.isArray(res.updates)) {
      updatesState.list = res.updates;
      updatesState.lastChecked = new Date();
      updateTabBadge();

      if (state.activeTab === 'updates') {
        renderUpdatesView();
      }

      if (!silent) {
        if (res.updates.length > 0) {
          showToast(`${res.updates.length} uygulama güncellemesi bulundu.`);
        } else {
          showToast('Tüm uygulamalarınız güncel.');
        }
      }
    }
  } catch (err) {
    console.error('[Updates Hub] Güncelleme sorgulama hatası:', err);
    if (!silent) showToast('Güncellemeler denetlenirken hata oluştu: ' + err.message);
  } finally {
    updatesState.isChecking = false;
    if (refreshBtn) refreshBtn.classList.remove('rotating');
  }
}

/**
 * Güncelleme Merkezi görünümünü render eder
 */
export function renderUpdatesView() {
  el('defaultView').style.display = 'none';
  const filteredView = el('filteredView');
  filteredView.style.display = '';

  const count = updatesState.list.length;

  if (count === 0) {
    filteredView.innerHTML = `
      <div class="fh-sec">
        <div class="fh-sech">
          <div style="display:flex;align-items:center;gap:12px;">
            <h2>Güncelleme Merkezi</h2>
            <span class="fh-up-checked-lbl">Tüm sistem paketleri denetlendi</span>
          </div>
          <button class="fh-b-glass" id="btnRefreshUpdates" title="Yeniden Denetle" style="padding:6px 14px;font-size:12px;gap:6px;">
            <i class="ti ti-refresh"></i> <span>Denetle</span>
          </button>
        </div>
      </div>
      <div class="fh-empty-view fh-empty-updates">
        <div class="fh-empty-circle"><i class="ti ti-circle-check"></i></div>
        <h3>Tüm Uygulamalarınız Güncel</h3>
        <p>Sisteminizdeki ve Flatpak ortamındaki tüm uygulamalar en son kararlı sürümde çalışıyor.</p>
      </div>
    `;
    const btn = el('btnRefreshUpdates');
    if (btn) btn.onclick = () => checkForUpdates(false);
    return;
  }

  filteredView.innerHTML = `
    <div class="fh-sec">
      <div class="fh-sech" style="align-items:center;">
        <div>
          <h2>Güncelleme Merkezi</h2>
          <span style="font-size:12px;color:var(--on-v);font-weight:500;">
            ${count} uygulama için yeni sürüm mevcut
          </span>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <button class="fh-b-glass" id="btnRefreshUpdates" title="Yeniden Denetle" style="padding:7px 14px;font-size:12px;gap:6px;">
            <i class="ti ti-refresh"></i> <span>Yenile</span>
          </button>
          <button class="fh-b-primary fh-b-update-all" id="btnUpdateAll" ${updatesState.isUpdatingAll ? 'disabled' : ''}>
            <i class="ti ${updatesState.isUpdatingAll ? 'ti-loader-2 fh-spin' : 'ti-sparkles'}"></i>
            <span>${updatesState.isUpdatingAll ? 'Güncelleniyor...' : 'Tümünü Güncelle'}</span>
          </button>
        </div>
      </div>
    </div>

    ${updatesState.isUpdatingAll ? `
      <div class="fh-up-global-progress">
        <div class="fh-up-gp-header">
          <span><i class="ti ti-download"></i> Tüm uygulamalar paket yöneticisi ile güncelleniyor...</span>
        </div>
        <div class="fh-up-bar-track"><div class="fh-up-bar-fill animate-pulse"></div></div>
      </div>
    ` : ''}

    <div class="fh-up-list">
      ${updatesState.list.map((item) => {
        const isThisUpdating = updatesState.updatingAppId === item.appId || updatesState.isUpdatingAll;
        return `
          <div class="fh-up-card" data-appid="${escapeHtml(item.appId)}" data-flatpak="${escapeHtml(item.flatpakId)}">
            <div class="fh-up-left">
              <div class="fh-lic c-violet" style="width:48px;height:48px;border-radius:10px;flex-shrink:0;">
                ${renderUpdateIcon(item)}
              </div>
              <div class="fh-up-info">
                <div class="fh-up-name">${escapeHtml(item.name)}</div>
                <div class="fh-up-meta">
                  <span class="fh-up-badge-flatpak">Flatpak</span>
                  <span class="fh-up-version-flow">
                    <span class="fh-up-ver-old">${escapeHtml(item.currentVersion)}</span>
                    <i class="ti ti-arrow-right"></i>
                    <span class="fh-up-ver-new">${escapeHtml(item.newVersion)}</span>
                  </span>
                </div>
              </div>
            </div>
            <div class="fh-up-actions">
              <button class="fh-lb fh-b-glass fh-btn-single-update" data-appid="${escapeHtml(item.appId)}" data-flatpak="${escapeHtml(item.flatpakId)}" ${isThisUpdating ? 'disabled' : ''}>
                <i class="ti ${isThisUpdating ? 'ti-loader-2 fh-spin' : 'ti-arrow-up'}"></i>
                <span>${isThisUpdating ? 'Güncelleniyor' : 'Güncelle'}</span>
              </button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Olay Dinleyicileri
  const refBtn = el('btnRefreshUpdates');
  if (refBtn) refBtn.onclick = () => checkForUpdates(false);

  const allBtn = el('btnUpdateAll');
  if (allBtn) allBtn.onclick = () => updateAll();

  document.querySelectorAll('.fh-btn-single-update').forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const appId = btn.getAttribute('data-appid');
      const flatpakId = btn.getAttribute('data-flatpak');
      updateSingle(appId, flatpakId);
    };
  });
}

/**
 * Tek bir uygulamayı günceller
 */
async function updateSingle(appId, flatpakId) {
  if (updatesState.updatingAppId || updatesState.isUpdatingAll) return;
  updatesState.updatingAppId = appId;
  renderUpdatesView();

  try {
    showToast(`${flatpakId} güncelleniyor...`);
    const res = await window.firehub.updateSingleApp({ appId, flatpakId });
    if (res && res.ok) {
      showToast('Güncelleme başarıyla tamamlandı!');
      updatesState.list = updatesState.list.filter((u) => u.appId !== appId);
      updateTabBadge();
    } else {
      showToast('Güncelleme başarısız: ' + (res?.error || 'Bilinmeyen hata'));
    }
  } catch (err) {
    showToast('Güncelleme hatası: ' + err.message);
  } finally {
    updatesState.updatingAppId = null;
    renderUpdatesView();
  }
}

/**
 * Tüm uygulamaları günceller
 */
async function updateAll() {
  if (updatesState.isUpdatingAll) return;
  updatesState.isUpdatingAll = true;
  renderUpdatesView();

  try {
    showToast('Tüm uygulamalar güncelleniyor, lütfen bekleyin...');
    const res = await window.firehub.updateAllApps();
    if (res && res.ok) {
      showToast('Tüm güncellemeler başarıyla yüklendi!');
      updatesState.list = [];
      updateTabBadge();
    } else {
      showToast('Toplu güncelleme hatası: ' + (res?.error || 'Bilinmeyen hata'));
    }
  } catch (err) {
    showToast('Hata: ' + err.message);
  } finally {
    updatesState.isUpdatingAll = false;
    checkForUpdates(true);
  }
}

/**
 * Controller'ı başlatır
 */
export function initUpdatesController() {
  // Arka planda 3 saniye sonra ilk kontrolü yap
  setTimeout(() => {
    checkForUpdates(true);
  }, 3000);
}
