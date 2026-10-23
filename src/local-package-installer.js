/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — BCDL (Kinetic Glass) Yerel Paket Kurucu (Local Package Installer) Kontrolcüsü
// .rpm, .deb, .flatpakref, .flatpak ve .pisi paketlerini sistemde açıp kurar

import { el, showToast, escapeHtml } from './utils.js';

let activePackageInfo = null;
let isInstalling = false;

export function initLocalPackageInstaller() {
  const modal = el('pkgM');
  const cancelBtn = el('pkgCancelBtn');
  const installBtn = el('pkgInstallBtn');

  if (!modal || !cancelBtn || !installBtn) return;

  // Modal dışına tıklayınca kapat (kurulum sürmüyorsa)
  modal.addEventListener('click', (e) => {
    if (e.target === modal && !isInstalling) {
      closeModal();
    }
  });

  cancelBtn.addEventListener('click', () => {
    if (!isInstalling) {
      closeModal();
    }
  });

  installBtn.addEventListener('click', async () => {
    if (isInstalling || !activePackageInfo) return;
    await executeInstall();
  });

  // Main process'ten paket açma bildirimini dinle
  window.firehub?.onOpenLocalPackage((pkgInfo) => {
    openPackageModal(pkgInfo);
  });

  // Kurulum konsol/ilerleme akışını dinle
  window.firehub?.onPackageProgress((data) => {
    if (!isInstalling) return;
    const msg = data?.msg || '';
    const statusEl = el('pkgProgressStatus');
    if (statusEl && msg) {
      const lastLine = msg.trim().split('\n').filter(Boolean).pop();
      if (lastLine) {
        statusEl.textContent = lastLine.slice(0, 75);
      }
    }
  });
}

export function openPackageModal(pkgInfo) {
  if (!pkgInfo) return;
  activePackageInfo = pkgInfo;
  isInstalling = false;

  const modal = el('pkgM');
  const nameEl = el('pkgName');
  const verEl = el('pkgVersion');
  const badgeEl = el('pkgBadge');
  const sizeEl = el('pkgSize');
  const typeEl = el('pkgType');
  const pathEl = el('pkgPath');
  const descEl = el('pkgDesc');
  const iconWrap = el('pkgIconWrap');
  const progressBox = el('pkgProgressBox');
  const installBtn = el('pkgInstallBtn');
  const installBtnText = el('pkgInstallBtnText');
  const cancelBtn = el('pkgCancelBtn');

  // Bilgileri yerleştir
  if (nameEl) nameEl.textContent = pkgInfo.name || pkgInfo.fileName;
  if (verEl) verEl.textContent = pkgInfo.version ? `v${pkgInfo.version}` : '';
  if (sizeEl) sizeEl.textContent = pkgInfo.sizeFormatted || '0 MB';
  if (typeEl) typeEl.textContent = pkgInfo.typeLabel || pkgInfo.ext.toUpperCase();
  if (pathEl) {
    pathEl.textContent = pkgInfo.filePath;
    pathEl.title = pkgInfo.filePath;
  }

  // Paket badge stili
  const ext = (pkgInfo.ext || '').toLowerCase();
  badgeEl.className = 'fh-pkg-type-badge';
  if (ext === '.rpm') {
    badgeEl.textContent = 'RPM PAKETİ';
    badgeEl.classList.add('fh-pkg-badge-rpm');
  } else if (ext === '.deb') {
    badgeEl.textContent = 'DEB PAKETİ';
    badgeEl.classList.add('fh-pkg-badge-deb');
  } else if (ext === '.flatpakref' || ext === '.flatpak') {
    badgeEl.textContent = 'FLATPAK';
    badgeEl.classList.add('fh-pkg-badge-flatpak');
  } else if (ext === '.pisi') {
    badgeEl.textContent = 'PİSİ PAKETİ';
    badgeEl.classList.add('fh-pkg-badge-pisi');
  } else {
    badgeEl.textContent = 'YEREL PAKET';
  }

  // İkon
  if (iconWrap) {
    if (pkgInfo.icon && pkgInfo.icon.startsWith('http')) {
      iconWrap.innerHTML = `<img src="${escapeHtml(pkgInfo.icon)}" alt="${escapeHtml(pkgInfo.name)}" class="fh-pkg-icon-img" onerror="this.outerHTML='<i class=\\'ti ti-box fh-pkg-icon\\'></i>';" />`;
    } else {
      let iconClass = 'ti ti-box';
      if (ext === '.rpm') iconClass = 'ti ti-brand-redhat';
      else if (ext === '.deb') iconClass = 'ti ti-brand-debian';
      else if (ext === '.flatpakref' || ext === '.flatpak') iconClass = 'ti ti-box';
      iconWrap.innerHTML = `<i class="${iconClass} fh-pkg-icon"></i>`;
    }
  }

  // Açıklama
  if (descEl) {
    if (pkgInfo.description) {
      descEl.textContent = pkgInfo.description;
      descEl.style.display = 'block';
    } else {
      descEl.style.display = 'none';
    }
  }

  // Buton ve ilerleme durumu
  if (progressBox) progressBox.style.display = 'none';
  if (installBtn) {
    installBtn.disabled = false;
    installBtn.classList.remove('loading');
  }
  if (installBtnText) installBtnText.textContent = 'Paketi Kur';
  if (cancelBtn) cancelBtn.disabled = false;

  modal.classList.add('act');
}

function closeModal() {
  const modal = el('pkgM');
  if (modal) modal.classList.remove('act');
  activePackageInfo = null;
  isInstalling = false;
}

async function executeInstall() {
  if (!activePackageInfo) return;

  isInstalling = true;
  const installBtn = el('pkgInstallBtn');
  const installBtnText = el('pkgInstallBtnText');
  const cancelBtn = el('pkgCancelBtn');
  const progressBox = el('pkgProgressBox');
  const progressStatus = el('pkgProgressStatus');
  const barFill = el('pkgBarFill');

  if (installBtn) {
    installBtn.disabled = true;
    installBtn.classList.add('loading');
  }
  if (installBtnText) installBtnText.textContent = 'Kuruluyor...';
  if (cancelBtn) cancelBtn.disabled = true;

  if (progressBox) progressBox.style.display = 'flex';
  if (progressStatus) progressStatus.textContent = 'Kurulum başlatılıyor (yetki bekleniyor)...';
  if (barFill) {
    barFill.style.width = '35%';
    barFill.classList.add('indeterminate');
  }

  try {
    const res = await window.firehub.installLocalPackage({
      filePath: activePackageInfo.filePath
    });

    if (res.ok) {
      if (barFill) {
        barFill.classList.remove('indeterminate');
        barFill.style.width = '100%';
      }
      if (progressStatus) progressStatus.textContent = 'Kurulum başarıyla tamamlandı!';
      showToast(
        `${activePackageInfo.name || 'Paket'} Kuruldu`,
        'Sistem paket yöneticisi ile başarıyla yüklendi.',
        undefined,
        false
      );
      setTimeout(() => {
        closeModal();
      }, 1500);
    } else {
      throw new Error(res.error || 'Bilinmeyen kurulum hatası');
    }
  } catch (err) {
    if (barFill) {
      barFill.classList.remove('indeterminate');
      barFill.style.width = '0%';
    }
    if (progressStatus) progressStatus.textContent = `Hata: ${err.message}`;
    showToast('Kurulum Başarısız', err.message, undefined, true);
    if (installBtn) {
      installBtn.disabled = false;
      installBtn.classList.remove('loading');
    }
    if (installBtnText) installBtnText.textContent = 'Tekrar Dene';
    if (cancelBtn) cancelBtn.disabled = false;
    isInstalling = false;
  }
}
