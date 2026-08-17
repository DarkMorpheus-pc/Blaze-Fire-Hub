/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — Preload Script (v3.3)
// contextBridge ile renderer'a güvenli bir API açar.
// Tüm Node API'leri kapalı kalır; sadece bu beyaz liste erişilir.

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('firehub', {
  // Uygulama bilgileri
  getVersion: () => ipcRenderer.invoke('app:getVersion'),
  getPlatform: () => ipcRenderer.invoke('app:getPlatform'),
  getDistro: () => ipcRenderer.invoke('app:getDistro'),

  // GitHub Releases'te FireHub'ın kendisi için yeni sürüm var mı kontrol eder
  // (indirme/kurulum yapmaz — sonucu renderer'a döner, kullanıcı isterse
  // openExternal ile releases sayfasını kendisi açar).
  checkForUpdates: () => ipcRenderer.invoke('app:checkForUpdates'),

  // Dış link açma
  openExternal: (url) => ipcRenderer.send('app:openExternal', url),

  // ===== KURULUM =====
  // Paket indir + kur. Promise döner: { ok: true } veya { ok: false, error: string }
  installApp: (opts) => ipcRenderer.invoke('app:installApp', opts),

  // Aktif kurulumu iptal et
  cancelInstall: (id) => ipcRenderer.send('app:cancelInstall', id),

  // Progress event'lerini dinle. Geri dönen fonksiyon listener'ı kaldırır.
  onInstallProgress: (callback) => {
    const handler = (_event, data) => callback(data);
    ipcRenderer.on('install:progress', handler);
    return () => ipcRenderer.off('install:progress', handler);
  },

  // ===== KURULUM KONTROLÜ & BAŞLATMA =====
  // Sistemde uygulamanın kurulu olup olmadığını kontrol eder
  checkInstalled: (opts) => ipcRenderer.invoke('app:checkInstalled', opts),
  // Kurulu uygulamayı başlatır
  launchApp: (opts) => ipcRenderer.invoke('app:launchApp', opts),
  // Kurulu uygulamayı kaldırır
  uninstallApp: (opts) => ipcRenderer.invoke('app:uninstallApp', opts)
});
