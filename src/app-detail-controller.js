/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — Detay sayfası kontrolcüsü (aç/kapa, kurulum durumu, launch/uninstall)
// Deobfuscate edilmiş build'den (v1.7.10) geri kazanılmıştır.

import { APP_CATALOG } from './data/catalog.js';
import { t } from './i18n.js';
import { el, escapeHtml, showToast } from './utils.js';
import { state } from './state.js';
import { renderRatingSummary, renderReviewList, refreshAppBadges } from './detail.js';
import { listenReviews, computeRatingStats } from './firebase/reviews.js';
import { openPlatformModal, resumeInstallProgressUI } from './install.js';
import { showReviewPromptForSignedOutUser, prefillMyReview, resetReviewForm } from './review-form.js';

const BADGE_LABELS = {
  opn: 'Open source',
  suc: 'Trusted',
  ver: 'Verified',
  warn: 'Third-party',
};

let activeReviewsUnsubscribe = null;

/** Bir uygulamanın detay sayfasını açar: tüm alanları doldurur, kurulum durumunu kontrol eder. */
export function openAppDetail(appId) {
  const app = APP_CATALOG[appId];
  if (!app) return;

  state.currentAppId = appId;

  el('dIc').innerHTML = app.ic;
  el('dIc').className = `fh-dic ${app.co}`;
  el('dN').textContent = app.name;
  el('dDv').textContent = app.dev;
  el('dCt').textContent = app.cat;
  el('dDn').textContent = app.dn;
  el('dSz').textContent = `${app.sz} MB`;
  el('dAg').textContent = app.ag;
  el('dVr').textContent = app.vr;
  el('dLi').textContent = app.li;
  el('dSu').textContent = app.src;
  el('dSn').textContent = app.sn;
  el('dDs').textContent = app.ds;

  el('dTr').innerHTML = app.tr
    .map(([cssClass, icon, labelKey]) =>
      `<span class="fh-tc ${cssClass}"><i class="ti ti-${icon}"></i>${escapeHtml(BADGE_LABELS[labelKey] || labelKey)}</span>`)
    .join('');

  // Ekran görüntüleri galerisi renderi
  const galSec = el('dGalSec');
  const galStrip = el('dGalStrip');
  if (galSec && galStrip) {
    if (app.screenshots && app.screenshots.length > 0) {
      galSec.style.display = 'block';
      galStrip.innerHTML = app.screenshots.map((src) => `
        <div class="fh-gal-thumb" data-src="${escapeHtml(src)}">
          <img src="${escapeHtml(src)}" alt="${escapeHtml(app.name)} preview" loading="lazy" />
        </div>`).join('');

      galStrip.querySelectorAll('.fh-gal-thumb').forEach((thumb) => {
        thumb.addEventListener('click', () => {
          const imgSrc = thumb.dataset.src;
          const imgM = el('imgM');
          const imgMSrc = el('imgMSrc');
          if (imgM && imgMSrc) {
            imgMSrc.src = imgSrc;
            imgM.classList.add('act');
          }
        });
      });
    } else {
      galSec.style.display = 'none';
    }
  }

  const imgMClose = el('imgMClose');
  if (imgMClose) {
    imgMClose.onclick = () => {
      el('imgM')?.classList.remove('act');
    };
  }

  el('dSu').style.cursor = 'pointer';
  el('dSu').onclick = () => window.firehub?.openExternal(app.src);

  renderRatingSummary(appId);
  renderReviewList(appId);
  // Bu uygulama için arka planda devam eden bir kurulum varsa (kullanıcı
  // kurulum sırasında başka bir sayfaya geçip geri döndüyse), checkInstalled
  // ile "kurulu değil" yanılgısı yaratmak yerine bilinen ilerlemeyi göster.
  if (state.activeInstalls[appId]) {
    resumeInstallProgressUI(appId);
  } else {
    checkAppInstalled(appId);
  }

  el('wrS').textContent = t(state.currentUser ? 'review.share' : 'review.signin');
  el('rF').classList.remove('show');
  resetReviewForm();

  if (state.currentUser) {
    prefillMyReview(appId);
  } else {
    showReviewPromptForSignedOutUser();
  }

  // Bu uygulama için canlı yorum dinleyicisini (yeniden) başlat
  activeReviewsUnsubscribe?.();
  activeReviewsUnsubscribe = listenReviews(appId, (reviews) => {
    state.reviewsCache[appId] = reviews;
    // Yalnızca şu an açık olan uygulama için canlı dinleyici var (43 uygulamanın
    // tamamı için değil), o yüzden rozet/istatistik güncellemesi burada ucuz.
    state.globalStats[appId] = computeRatingStats(reviews);
    refreshAppBadges(appId);
    if (state.currentAppId === appId) {
      renderRatingSummary(appId);
      renderReviewList(appId);
    }
  });

  el('home').style.display = 'none';
  el('detail').style.display = 'flex';
  el('detail').classList.add('act');
  el('detail').querySelector('.fh-sc').scrollTop = 0;
}

/** Detay sayfasını kapatır, ana sayfaya döner. */
export function closeAppDetail() {
  el('detail').style.display = 'none';
  el('detail').classList.remove('act');
  el('home').style.display = 'flex';
}

/** Sistemde tespit edilen Linux dağıtımını (fedora/pisi/debian) önbelleğe alarak döner. */
let cachedDistro = null;
async function getDistro() {
  if (cachedDistro) return cachedDistro;
  try {
    cachedDistro = (await window.firehub?.getDistro()) || 'fedora';
  } catch {
    cachedDistro = 'fedora';
  }
  return cachedDistro;
}

/** "Install" butonunu gösterir (varsayılan/kurulu-değil durumu). */
function showInstallButton() {
  el('iw').innerHTML = `<button class="fh-ib2" id="instB"><i class="ti ti-download"></i><span>${escapeHtml(t('install'))}</span></button>`;
  el('instB').addEventListener('click', openPlatformModal);
}

/** Kuruluysa Launch/Reinstall/Uninstall butonlarını gösterir. */
function showInstalledButtons(detection, appName) {
  el('iw').innerHTML = `
    <div style="display:flex;gap:10px;flex-direction:column;">
      <button class="fh-ib2 fh-ib2-launch" id="launchB">
        <i class="ti ti-player-play-filled"></i>
        <span>${escapeHtml(t('launch'))}</span>
      </button>
      <div style="display:flex;gap:10px;">
        <button class="fh-ib2 fh-ib2-reinstall" id="reinstB" style="flex:1;">
          <i class="ti ti-refresh"></i>
          <span>${escapeHtml(t('reinstall'))}</span>
        </button>
        <button class="fh-ib2 fh-ib2-uninstall" id="uninstB" style="flex:1;">
          <i class="ti ti-trash"></i>
          <span>${escapeHtml(t('uninstall'))}</span>
        </button>
      </div>
    </div>`;

  el('launchB').addEventListener('click', async () => {
    const btn = el('launchB');
    const originalHtml = btn.innerHTML;
    btn.innerHTML = '<div class="fh-sp" style="border-color:rgba(255,255,255,0.3);border-top-color:#fff;"></div>';
    try {
      const result = await window.firehub?.launchApp({ appId: state.currentAppId, ...detection });
      if (result?.ok) {
        showToast('isl.opening', 'isl.opening.sub', { name: appName });
      } else {
        showToast('Başlatılamadı', result?.error || 'Uygulama açılamadı', {}, true);
      }
    } catch (err) {
      showToast('Başlatılamadı', err.message || '', {}, true);
    } finally {
      btn.innerHTML = originalHtml;
    }
  });

  el('reinstB').addEventListener('click', openPlatformModal);

  el('uninstB').addEventListener('click', async () => {
    if (!state.currentAppId) return;
    const app = APP_CATALOG[state.currentAppId];
    if (!window.confirm(`${appName} uygulamasını kaldırmak istediğinize emin misiniz?`)) return;

    const btn = el('uninstB');
    const originalHtml = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<div class="fh-sp" style="width:16px;height:16px;border-color:rgba(255,255,255,0.3);border-top-color:#fff;"></div>';

    const platform = await getDistro();
    const detect = app.detect || {};
    // GÜVENLİK: main process pkgName/flatpakId'yi katalogdan kendisi okur;
    // burada yalnızca appId + method + platform gönderiyoruz.
    const uninstallOpts = {
      appId: state.currentAppId,
      method: detection.method || (detection.flatpakId || detect.flatpakId ? 'flatpak' : 'system'),
      platform,
    };

    try {
      const result = await window.firehub?.uninstallApp(uninstallOpts);
      if (result?.ok) {
        showToast(`${app.name} kaldırıldı`, 'Uygulama sistemden silindi');
        refreshAppDetailButtons(state.currentAppId);
      } else {
        showToast('Kaldırılamadı', result?.error || 'Bilinmeyen hata', {}, true);
        btn.disabled = false;
        btn.innerHTML = originalHtml;
      }
    } catch (err) {
      showToast('Kaldırılamadı', err.message || '', {}, true);
      btn.disabled = false;
      btn.innerHTML = originalHtml;
    }
  });
}

/** Uygulamanın kurulu olup olmadığını kontrol edip install-alanını (iw) günceller. */
export async function checkAppInstalled(appId) {
  const app = APP_CATALOG[appId];
  if (!app) return;

  el('iw').innerHTML = `
    <div class="fh-ib2 fh-ib2-checking">
      <div class="fh-sp" style="width:16px;height:16px;border-color:rgba(255,255,255,0.25);border-top-color:#fff;flex-shrink:0;"></div>
      <span>${escapeHtml(t('checking'))}</span>
    </div>`;

  if (!window.firehub?.checkInstalled) {
    showInstallButton();
    return;
  }

  try {
    // GÜVENLİK: main process katalogdan (detect.*) kendisi okuyor;
    // burada yalnızca appId gönderiyoruz.
    const detection = await window.firehub.checkInstalled({ appId });

    if (detection.installed) {
      showInstalledButtons(detection, app.name);
      showToast(`${app.name} zaten kurulu`, 'Çalıştırmak için butona bas');
    } else {
      showInstallButton();
    }
  } catch {
    showInstallButton();
  }
}

/** İnstall/launch/uninstall alanını yeniden değerlendirir (kurulum sonrası, iptal sonrası vb.). */
export function refreshAppDetailButtons(appId) {
  return checkAppInstalled(appId);
}
