/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — Electron Main Process (v1.7.10 — güvenlik sertleştirmesi)
// Gerçek indirme & kurulum: pkexec (Linux GUI sudo) ve native UAC (Windows)
//
// GÜVENLİK MİMARİSİ (önceki denetim raporuna yanıt):
// - Renderer artık asla ham url/pkgName/flatpakId/launchCmd göndermez.
//   Sadece bir appId + platform gönderir; gerçek kurulum verisi bu dosyadaki
//   sabit APP_CATALOG'dan (electron/catalog.js) okunur. Bu, XSS veya bundle
//   tahrifi olsa bile renderer'ın rastgele URL indirmesini veya rastgele
//   komut çalıştırmasını yapısal olarak imkansız kılar.
// - İndirilen dosyalar: sadece HTTPS + izinli host allowlist'i, minimum
//   boyut kontrolü, ve dosya-türü (magic bytes) doğrulaması yapılır.
//   "latest" endpoint'leri (Firefox/Brave/VS Code) sürüm sabit olmadığı
//   için önceden SHA-256 sabitlenemez; bu durumlarda paket türü doğrulaması
//   ve (varsa) OS düzeyinde imza kontrolü (dpkg/rpm) devreye girer.
// - Debian kurulumunda artık `sh -c` ile shell string birleştirme yok;
//   dpkg/apt-get doğrudan argüman listesiyle çağrılıyor.
// - Flatpak kaldırma artık `--user` kapsamında (kurulumla simetrik).
// - Bilinmeyen Linux dağıtımı artık "fedora" değil "unknown" döner.

const { app, BrowserWindow, shell, ipcMain, Menu, dialog } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const https = require('node:https');
const http = require('node:http');
const { spawn } = require('node:child_process');
const { URL } = require('node:url');
const { tmpdir } = require('node:os');
const { APP_CATALOG } = require('./catalog.js');

// İndirmeye izin verilen host'lar — katalogdaki tüm "url" tipi kurulumların
// gerçek kaynak domain'leriyle eşleşir. Yeni bir uygulama eklendiğinde bu
// listeye de eklenmesi gerekir (bilinçli bir adım — sessiz genişleme yok).
// Düzeltme (2026-08): host listesi canlı olarak yeniden doğrulandı — Microsoft
// VS Code CDN'sini `az764295.vo.msecnd.net`'ten `vscode.download.prss.microsoft.com`'a
// taşımış; bu satır güncellenmediği için VS Code indirmeleri sessizce "Izin
// verilmeyen indirme kaynagi" hatasıyla başarısız oluyordu. Ayrıca Steam ve
// Obsidian/Blender/Spotify (Windows) hiç listede yoktu — onlar da başarısız
// oluyordu. GIMP/VLC coğrafi mirror'a yönlendiriyor (sabit host yok, bu
// yüzden listeye eklenemiyor); Discord bu ortamdan doğrulanamadı — ikisi de
// flatpak'a geçirilmesi önerilir (bkz. catalog'daki flatpak alternatifleri).
const ALLOWED_DOWNLOAD_HOSTS = new Set([
  'download.mozilla.org',
  'download-installer.cdn.mozilla.net', // mozilla redirect hedefi
  'laptop-updates.brave.com',
  'update.code.visualstudio.com',
  'vscode.download.prss.microsoft.com', // vscode güncel redirect hedefi (Azure CDN, eski az764295.vo.msecnd.net yerine)
  'cdn.cloudflare.steamstatic.com',
  'repo.steampowered.com', // steam redirect hedefi
  'github.com',
  'release-assets.githubusercontent.com', // obsidian github release redirect hedefi
  'download.blender.org',
  'download.scdn.co', // spotify
]);

// Sistem tarayıcısında açılmasına izin verilen host'lar — katalogdaki her
// uygulamanın resmi sitesi (dSu/app.src) + FireHub'ın kendi GitHub sayfası.
// Yeni bir uygulama eklendiğinde bu listeye de eklenmesi gerekir (bilinçli
// bir adım — sessiz genişleme yok, aynı ALLOWED_DOWNLOAD_HOSTS felsefesi).
const ALLOWED_EXTERNAL_HOSTS = new Set([
  'bitwarden.com',
  'brave.com',
  'code-industry.net',
  'code.visualstudio.com',
  'dbeaver.io',
  'desktop.telegram.org',
  'discord.com',
  'element.io',
  'getmailspring.com',
  'getsession.org',
  'github.com',
  'gparted.org',
  'handbrake.fr',
  'heroicgameslauncher.com',
  'inkscape.org',
  'insomnia.rest',
  'joplinapp.org',
  'kdenlive.org',
  'keepassxc.org',
  'krita.org',
  'learn.microsoft.com',
  'librewolf.net',
  'localsend.org',
  'logseq.com',
  'lutris.net',
  'mpv.io',
  'mullvad.net',
  'natrongithub.github.io',
  'neovide.dev',
  'obsidian.md',
  'obsproject.com',
  'penpot.app',
  'play0ad.com',
  'protonvpn.com',
  'rawtherapee.com',
  'revolt.chat',
  'signal.org',
  'slack.com',
  'store.steampowered.com',
  'supertuxkart.net',
  'tidal.com',
  'todoist.com',
  'usebottles.com',
  'veloren.net',
  'vivaldi.com',
  'vscodium.com',
  'www.audacityteam.org',
  'www.blender.org',
  'www.bleachbit.org',
  'www.chromium.org',
  'www.clementine-player.org',
  'www.darktable.org',
  'www.digikam.org',
  'www.docker.com',
  'www.figma.com',
  'www.freecad.org',
  'www.gimp.org',
  'www.gitkraken.com',
  'www.jetbrains.com',
  'www.libreoffice.org',
  'www.minetest.net',
  'www.mozilla.org',
  'www.notion.so',
  'www.onlyoffice.com',
  'www.opera.com',
  'www.playonlinux.com',
  'www.postman.com',
  'www.retroarch.com',
  'www.shotcut.org',
  'www.spotify.com',
  'www.strawberrymusicplayer.org',
  'www.sublimetext.com',
  'www.thunderbird.net',
  'www.torproject.org',
  'www.usebruno.com',
  'www.videolan.org',
  'www.waterfox.net',
  'www.wireshark.org',
  'zed.dev',
  'zoom.us',
]);

// Dosya türüne göre beklenen magic bytes (ilk birkaç byte). İndirilen dosyanın
// gerçekten iddia ettiği paket türü olduğunu doğrular (örn. bir HTML hata
// sayfasının .exe diye kaydedilmesini engeller).
const MAGIC_BYTES = {
  '.exe': [0x4d, 0x5a], // MZ
  '.msi': [0xd0, 0xcf, 0x11, 0xe0], // OLE/CFB
  '.deb': [0x21, 0x3c, 0x61, 0x72, 0x63, 0x68, 0x3e], // "!<arch>"
  '.rpm': [0xed, 0xab, 0xee, 0xdb],
};

// Auto-updater (electron-updater paketi gerekir)
// npm install electron-updater
let autoUpdater = null;
try {
  autoUpdater = require('electron-updater').autoUpdater;
  autoUpdater.autoDownload = false;  // kullaniciya sor
  autoUpdater.autoInstallOnAppQuit = true;
} catch {
  // Dev ortaminda veya paket kurulu degilse sessizce atla
}

const isDev = !app.isPackaged;

// Düzeltme (denetim raporu #8): bu anahtarlar önceden PAKETLENMİŞ build dahil
// her Linux çalıştırmada koşulsuz uygulanıyordu — webPreferences.sandbox'ı
// prod'da açmanın (bkz. createWindow) hiçbir anlamı kalmıyordu, çünkü bu
// global switch'ler zaten tüm süreç için sandbox'ı devre dışı bırakıyordu.
// Yalnızca dev modunda gerekli: node_modules/electron/dist/chrome-sandbox
// suid'siz gelir ve Debian/Ubuntu ailesi dağıtımlarda (AppArmor'ın
// unprivileged user namespace kısıtlaması) suid olmayan sandbox başlatmayı
// engelleyebilir. Paketlenmiş .deb/.rpm'de electron-builder chrome-sandbox
// yardımcı binary'sine doğru suid-root iznini kurulum sırasında veriyor,
// bu yüzden orada bu geçici çözüme ihtiyaç yok.
if (isDev && process.platform === 'linux') {
  app.commandLine.appendSwitch('no-sandbox');
  app.commandLine.appendSwitch('disable-gpu-sandbox');
  app.commandLine.appendSwitch('disable-setuid-sandbox');
}

// Uygulama adı — .desktop StartupWMClass=FireHub ile eşleşmeli
// (Wayland/X11'de pencerenin doğru ikona bağlanması için kritik)
app.setName('FireHub');

// Tekil instance
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) { app.quit(); process.exit(0); }

let mainWindow = null;

// Aktif indirme/kurulum işlemleri — iptal için takip edilir
const activeInstalls = new Map(); // id -> { req, proc, canceled }

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280, height: 820,
    minWidth: 960, minHeight: 640,
    show: false,
    backgroundColor: '#FFF8F6',
    titleBarStyle: 'default',
    autoHideMenuBar: true,
    icon: isDev
      ? path.join(__dirname, '..', 'build', 'icon.png')
      : path.join(process.resourcesPath, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      // OS sandbox prod'da acik: paketlenmis .deb/.rpm icin electron-builder
      // chrome-sandbox yardimci binary'sine dogru suid-root izinlerini
      // kurulum sirasinda ayarliyor. Dev'de (npm run electron:dev) kapali,
      // cunku node_modules/electron/dist/chrome-sandbox suid'siz gelir ve
      // gelistiricinin bunu manuel yapilandirmasini gerektirir.
      sandbox: !isDev,
      nodeIntegration: false,
      webSecurity: true
    }
  });

  // Uygulama hiçbir Web API izni (mikrofon, kamera, konum vb.) kullanmıyor —
  // hepsi reddedilir. Kullanılmayan bir izni önceden açık tutmak sadece
  // saldırı yüzeyini büyütür.
  mainWindow.webContents.session.setPermissionRequestHandler((_wc, _permission, callback) => {
    callback(false);
  });
  mainWindow.webContents.session.setPermissionCheckHandler(() => false);

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    if (mainWindow && !mainWindow.isDestroyed()) mainWindow.show();
    // electron-updater'ın sessiz indir+kur akışı yalnızca Windows NSIS için
    // anlamlı — NSIS kendini yerinde değiştirebilir. .deb/.rpm/.pisi ile
    // kurulmuş bir FireHub'ı paket yöneticisi (root) sahiplendiği için
    // uygulama kendi dosyalarını sessizce değiştiremez; Linux'ta bunun yerine
    // app:checkForUpdates (aşağıda) kullanılıyor — GitHub Releases'i kontrol
    // edip kullanıcıyı indirme sayfasına yönlendiriyor, dosya değiştirmiyor.
    if (!isDev && autoUpdater && process.platform === 'win32') {
      setTimeout(() => setupAutoUpdater(), 3000);
    }
  });

  // Fallback: ready-to-show bazı Linux pencerelerinde gecikirse pencereyi zorla göster
  setTimeout(() => {
    if (mainWindow && !mainWindow.isDestroyed() && !mainWindow.isVisible()) {
      mainWindow.show();
    }
  }, 1200);

  mainWindow.webContents.on('did-fail-load', (_event, errorCode, errorDescription, validatedURL) => {
    console.error('[FireHub] Page load failed:', errorCode, errorDescription, validatedURL);
  });

  // Kararlılık: eski/sorunlu GPU sürücülü sistemlerde renderer süreci
  // (GPU çökmesi, OOM vb. nedenlerle) beklenmedik şekilde sonlanabilir.
  // Bu olmadan pencere donuk/boş kalır; burada otomatik olarak yeniden
  // yükleniyor. 'clean-exit' (app.quit() sırasında) yeniden yüklenmez;
  // art arda çökme döngüsüne girmeyi önlemek için deneme sayısı sınırlı.
  let crashRecoveryCount = 0;
  mainWindow.webContents.on('render-process-gone', (_event, details) => {
    if (details.reason === 'clean-exit') return;
    console.error('[FireHub] Renderer sonlandı, nedeni:', details.reason);
    if (crashRecoveryCount >= 3 || !mainWindow || mainWindow.isDestroyed()) return;
    crashRecoveryCount++;
    if (isDev) {
      mainWindow.loadURL('http://localhost:5173');
    } else {
      mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http://') || url.startsWith('https://')) shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('http://localhost:5173') && !url.startsWith('file://')) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

function setupAutoUpdater() {
  if (!autoUpdater || !mainWindow) return;

  autoUpdater.checkForUpdates().catch(() => {});

  autoUpdater.on('update-available', (info) => {
    const { version } = info;
    dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'Guncelleme Mevcut',
      message: `FireHub ${version} hazir!`,
      detail: 'Yeni surum indirilerek otomatik kurulacak.',
      buttons: ['Indir', 'Sonra'],
      defaultId: 0,
      cancelId: 1
    }).then(({ response }) => {
      if (response === 0) {
        autoUpdater.downloadUpdate();
        mainWindow?.webContents.send('update:downloading', { version });
      }
    });
  });

  autoUpdater.on('update-downloaded', (info) => {
    dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'Guncelleme Hazir',
      message: 'Guncelleme indirildi. Yeniden baslat?',
      buttons: ['Yeniden Baslat', 'Sonra'],
      defaultId: 0,
      cancelId: 1
    }).then(({ response }) => {
      if (response === 0) autoUpdater.quitAndInstall();
    });
  });

  autoUpdater.on('error', (err) => {
    console.warn('Guncelleme hatasi:', err.message);
  });
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('app:getVersion', () => app.getVersion());
ipcMain.handle('app:getPlatform', () => process.platform);

/** "1.8.0" / "1.8" gibi basit sürüm dizgilerini karşılaştırır (a-b). */
function compareVersions(a, b) {
  const pa = a.split('.').map((n) => parseInt(n, 10) || 0);
  const pb = b.split('.').map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] || 0) - (pb[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

// Linux'ta (.deb/.rpm/.pisi) gerçek anlamda sessiz otomatik güncelleme
// yapılamıyor (bkz. yukarıdaki not) — bunun yerine GitHub Releases API'si
// sabit, güvenilir bir URL ile kontrol edilir (renderer'dan hiçbir girdi
// alınmıyor, bu yüzden ALLOWED_DOWNLOAD_HOSTS'a ihtiyaç yok) ve sonuç
// renderer'a iletilir; asıl indirme kullanıcının kendi tıklamasıyla
// tarayıcıda açılır (openExternal host allowlist'i zaten github.com'u kapsıyor).
ipcMain.handle('app:checkForUpdates', () => {
  return new Promise((resolve) => {
    const req = https.get(
      'https://api.github.com/repos/DarkMorpheus-pc/Blaze-Fire-Hub/releases/latest',
      { headers: { 'User-Agent': 'FireHub-UpdateChecker', Accept: 'application/vnd.github+json' } },
      (res) => {
        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
          try {
            if (res.statusCode !== 200) {
              resolve({ ok: false, error: `GitHub API HTTP ${res.statusCode}` });
              return;
            }
            const json = JSON.parse(body);
            // DÜZELTME: "||" ile tek bir alan seçmek yanlıştı — bu repo'nun
            // release tag/name alanları sürüm numarası İÇERMİYOR (ör.
            // tag_name="Blaze_FireHub_Pisi_Linux"), sürüm yalnızca body
            // metninde var (ör. "1.8 Pisi Update !"). "||" tag_name boş
            // olmadığı için hiç body'ye bakmadan orada duruyordu — gerçek
            // API verisiyle test edilerek bulundu. Her alan ayrı ayrı denenir.
            const VERSION_RE = /\d+\.\d+(?:\.\d+)?/;
            const versionMatch =
              VERSION_RE.exec(json.tag_name || '') ||
              VERSION_RE.exec(json.name || '') ||
              VERSION_RE.exec(json.body || '');
            const latestVersion = versionMatch ? versionMatch[0] : null;
            const currentVersion = app.getVersion();
            const hasUpdate = !!latestVersion && compareVersions(latestVersion, currentVersion) > 0;
            resolve({
              ok: true,
              currentVersion,
              latestVersion,
              hasUpdate,
              releaseName: json.name || null,
              releaseUrl: json.html_url || 'https://github.com/DarkMorpheus-pc/Blaze-Fire-Hub/releases',
            });
          } catch (err) {
            resolve({ ok: false, error: err.message });
          }
        });
      }
    );
    req.on('error', (err) => resolve({ ok: false, error: err.message }));
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({ ok: false, error: 'Zaman aşımı' });
    });
  });
});

// Linux dağıtım tespiti: fedora / pisi / debian / unknown
// Düzeltme (denetim raporu #6): bilinmeyen sistemlerde artık "fedora"
// varsayılmıyor — "unknown" dönüyor ve renderer buna göre kullanıcıdan
// manuel seçim istiyor. ID/ID_LIKE alanları satır satır parse ediliyor;
// "metin içinde ara" yaklaşımı (ör. os-release içinde başka bir yerde
// geçen "debian" kelimesi) artık yanlış eşleşmeye yol açmıyor.
ipcMain.handle('app:getDistro', async () => {
  if (process.platform !== 'linux') return process.platform;
  try {
    const fsSync = require('node:fs');
    const osRelease = fsSync.readFileSync('/etc/os-release', 'utf8');
    const fields = {};
    osRelease.split('\n').forEach((line) => {
      const match = line.match(/^([A-Z_]+)=(.*)$/);
      if (match) fields[match[1]] = match[2].replace(/^"|"$/g, '').toLowerCase();
    });

    const id = fields.ID || '';
    const idLike = fields.ID_LIKE || '';
    const combined = `${id} ${idLike}`;

    if (/^pisilinux$/.test(id) || /\bpisilinux\b/.test(idLike)) return 'pisi';
    if (/^(fedora|rhel|centos)$/.test(id) || /\b(fedora|rhel)\b/.test(idLike)) return 'fedora';
    if (/^(debian|ubuntu|linuxmint)$/.test(id) || /\bdebian\b/.test(idLike)) return 'debian';
    return 'unknown';
  } catch {
    return 'unknown';
  }
});

ipcMain.on('app:openExternal', (_e, url) => {
  if (typeof url !== 'string') return;
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return;
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return;
  if (!ALLOWED_EXTERNAL_HOSTS.has(parsed.hostname)) return;
  shell.openExternal(url);
});

// ====================================================================
// GERÇEK INDIRME & KURULUM
// ====================================================================

/**
 * URL'i indirir, progress event'leri renderer'a iletir.
 * 30x redirect'leri otomatik takip eder. Her adımda (ilk istek dahil)
 * protokol HTTPS olmalı ve host ALLOWED_DOWNLOAD_HOSTS içinde olmalı —
 * aksi halde indirme reddedilir (denetim raporu #2).
 *
 * @param {string} url
 * @param {string} destPath - kaydedilecek yer
 * @param {string} installId - iptal ve progress için
 * @param {number} [maxRedirects=5]
 * @param {string|null} [knownSha256] - redirect zincirinde şu ana kadar görülen
 *   en son `x-sha256` header değeri (varsa) — bkz. VS Code CDN'i.
 * @returns {Promise<{path: string, sha256: string|null}>}
 */
function downloadFile(url, destPath, installId, maxRedirects = 5, knownSha256 = null) {
  return new Promise((resolve, reject) => {
    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      reject(new Error('Gecersiz indirme adresi'));
      return;
    }

    if (parsed.protocol !== 'https:') {
      reject(new Error('Yalnizca HTTPS indirmelerine izin verilir: ' + url));
      return;
    }
    if (!ALLOWED_DOWNLOAD_HOSTS.has(parsed.hostname)) {
      reject(new Error('Izin verilmeyen indirme kaynagi: ' + parsed.hostname));
      return;
    }

    const proto = https;

    const req = proto.get(url, {
      headers: { 'User-Agent': 'FireHub/1.0.0' }
    }, (res) => {
      // Bazı CDN'ler (ör. VS Code) redirect yanıtında dosyanın gerçek SHA-256'ını
      // x-sha256 header'ında veriyor — indirme tamamlandığında bununla doğrulanır.
      const sha256 = res.headers['x-sha256'] || knownSha256;

      // Redirect handling
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        if (maxRedirects <= 0) {
          reject(new Error('Too many redirects'));
          return;
        }
        const nextUrl = new URL(res.headers.location, url).toString();
        // Mevcut bağlantıyı kapat ve yenisine git
        res.resume();
        downloadFile(nextUrl, destPath, installId, maxRedirects - 1, sha256).then(resolve, reject);
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        res.resume();
        return;
      }

      const total = parseInt(res.headers['content-length'] || '0', 10);
      let received = 0;
      const file = fs.createWriteStream(destPath);

      const install = activeInstalls.get(installId);
      if (install) install.req = req;

      res.on('data', (chunk) => {
        received += chunk.length;
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('install:progress', {
            id: installId,
            stage: 'download',
            received,
            total: total || received * 2 // total yoksa tahmin
          });
        }
      });

      res.pipe(file);
      file.on('finish', () => file.close(() => resolve({ path: destPath, sha256 })));
      file.on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    });

    req.on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });

    // İptal için referans tut
    const install = activeInstalls.get(installId);
    if (install) install.req = req;
  });
}

/**
 * İndirilen dosyanın uzantısına uygun magic bytes ile başladığını doğrular.
 * Bir sunucu/CDN/redirect zinciri hatasında (örn. HTML hata sayfası
 * .exe olarak kaydedilirse) kurulumu burada durdurur (denetim raporu #2).
 */
function verifyFileSignature(filePath, ext) {
  const expected = MAGIC_BYTES[ext];
  if (!expected) return true; // tanımlı imza yoksa (ör. .pkg) atla — boyut kontrolü zaten var

  const fd = fs.openSync(filePath, 'r');
  try {
    const buffer = Buffer.alloc(expected.length);
    fs.readSync(fd, buffer, 0, expected.length, 0);
    return expected.every((byte, i) => buffer[i] === byte);
  } finally {
    fs.closeSync(fd);
  }
}

/**
 * İndirilen dosyanın SHA-256'ını, CDN'in redirect yanıtında verdiği hash ile
 * karşılaştırır (bkz. downloadFile'daki x-sha256 yakalama). Yalnızca CDN
 * gerçekten bir hash verdiyse (şu an yalnızca VS Code) anlamlı; diğerlerinde
 * `expectedSha256` null olur ve bu kontrol atlanır — magic-byte kontrolü zaten
 * ayrıca çalışıyor.
 */
function verifyFileHash(filePath, expectedSha256) {
  if (!expectedSha256) return true;
  const crypto = require('node:crypto');
  const hash = crypto.createHash('sha256');
  hash.update(fs.readFileSync(filePath));
  return hash.digest('hex').toLowerCase() === expectedSha256.toLowerCase();
}

/**
 * Linux\'ta pkexec ile paketi kurar (GUI sudo prompt).
 * pkexec PolicyKit'in parçası ve çoğu desktop Linux\'ta yüklü gelir.
 *
 * Fedora/RHEL:   pkexec dnf install -y /path/to/pkg.rpm
 * Debian/Ubuntu: önce `pkexec dpkg -i <path>`, başarısız olursa ayrı bir
 *                `pkexec apt-get -f install -y` çağrısıyla bağımlılıklar
 *                çözülür. Düzeltme (denetim raporu #4): artık `sh -c` ile
 *                shell string birleştirme yok — dosya yolu shell'e hiç
 *                gitmiyor, doğrudan argüman olarak dpkg'ye geçiyor.
 */
async function installLinuxPackage(filePath, platform, installId) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('install:progress', { id: installId, stage: 'install' });
  }

  function runPkexec(args) {
    return new Promise((resolve, reject) => {
      const proc = spawn('pkexec', args, { stdio: ['ignore', 'pipe', 'pipe'] });
      const install = activeInstalls.get(installId);
      if (install) install.proc = proc;

      let stderr = '';
      proc.stderr.on('data', (d) => { stderr += d.toString(); });

      proc.on('error', (err) => {
        if (err.code === 'ENOENT') {
          reject(new Error('pkexec bulunamadı. PolicyKit / pkexec kurulu olmalı: "sudo apt install pkexec"'));
        } else {
          reject(err);
        }
      });

      proc.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else if (code === 126 || code === 127) {
          reject(new Error('Kurulum yetkisi reddedildi veya iptal edildi.'));
        } else {
          reject(Object.assign(new Error(`Kurulum başarısız (kod ${code}): ${stderr.trim() || 'bilinmeyen hata'}`), { code }));
        }
      });
    });
  }

  if (platform === 'fedora') {
    await runPkexec(['dnf', 'install', '-y', filePath]);
    return;
  }

  if (platform === 'debian') {
    try {
      await runPkexec(['dpkg', '-i', filePath]);
    } catch (err) {
      // dpkg bağımlılık hatasıyla başarısız olduysa apt-get -f install ile tamamla.
      // Yetki reddi (126/127) veya pkexec eksikse tekrar denemeden direkt hata ver.
      if (err.code === 126 || err.code === 127) throw err;
      await runPkexec(['apt-get', '-f', 'install', '-y']);
    }
    return;
  }

  throw new Error('Unsupported platform: ' + platform);
}

/**
 * Windows'ta .exe/.msi çalıştırır — kendi UAC dialog'unu açar.
 */
function installWindowsPackage(filePath, installId) {
  return new Promise((resolve, reject) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('install:progress', { id: installId, stage: 'install' });
    }
    // shell.openPath, OS'in dosyayı varsayılan davranışla açmasını sağlar.
    // .exe ve .msi yükleyiciler kendi UAC isteklerini gösterir.
    shell.openPath(filePath).then((err) => {
      if (err) reject(new Error(err));
      else resolve();
    }).catch(reject);
  });
}

/**
 * Ana indirme + kurulum akışı.
 */
/**
 * Ana indirme + kurulum akışı.
 *
 * GÜVENLİK (denetim raporu #3): renderer artık yalnızca {id, appId, platform}
 * gönderir. type/url/pkgName/flatpakId/ext/note gibi tüm kurulum detayları
 * APP_CATALOG'dan (bu process içinde sabit) okunur — renderer'ın rastgele
 * bir URL indirtmesi veya rastgele bir paket adı geçirmesi artık mümkün
 * değil, çünkü bu değerler hiç renderer'dan main'e taşınmıyor.
 */
ipcMain.handle('app:installApp', async (_event, opts) => {
  const { id, appId, platform } = opts || {};

  if (!id || !appId || !platform) {
    return { ok: false, error: 'Invalid options' };
  }

  const app = APP_CATALOG[appId];
  if (!app) {
    return { ok: false, error: 'Bilinmeyen uygulama: ' + appId };
  }

  const config = app.install?.[platform];
  if (!config) {
    return { ok: false, error: 'Bu platform icin kurulum yapilandirilmamis.' };
  }

  const { type, value, ext = '.pkg', note = '' } = config;
  const appName = app.name;

  activeInstalls.set(id, { canceled: false });

  function sendProgress(stage, extra = {}) {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('install:progress', { id, stage, ...extra });
    }
  }

  function isCanceled() { return activeInstalls.get(id)?.canceled === true; }

  // ── PKG INSTALL (dnf / apt-get) ───────────────────────────────────
  async function installViaPkg() {
    if (process.platform !== 'linux') {
      return { ok: false, error: 'Paket yöneticisi yalnızca Linux\'ta çalışır.' };
    }

    const cmd = 'pkexec';
    const args = platform === 'fedora' ? ['dnf', 'install', '-y', value]
      : platform === 'pisi' ? ['pisi', 'it', '-y', value]
      : ['apt-get', 'install', '-y', value];
    const pkgLabel = platform === 'fedora' ? 'dnf' : platform === 'pisi' ? 'pisi' : 'apt';

    sendProgress('pkg', { msg: `${pkgLabel} install ${value}...` });

    return new Promise((resolve) => {
      const proc = spawn(cmd, args, {
        stdio: ['ignore', 'pipe', 'pipe'],
        env: { ...process.env, DEBIAN_FRONTEND: 'noninteractive' }
      });

      const install = activeInstalls.get(id);
      if (install) install.proc = proc;

      let stderr = '';
      proc.stderr.on('data', (d) => { stderr += d.toString(); });

      proc.on('error', (err) => {
        if (err.code === 'ENOENT') {
          resolve({ ok: false, error: 'pkexec bulunamadı. Debian/Ubuntu için: sudo apt install pkexec' });
        } else {
          resolve({ ok: false, error: err.message });
        }
      });

      proc.on('close', (code) => {
        if (isCanceled()) { resolve({ ok: false, error: 'Canceled' }); return; }
        if (code === 0) {
          resolve({ ok: true });
        } else if (code === 126 || code === 127) {
          resolve({ ok: false, error: 'Kurulum yetkisi reddedildi veya iptal edildi.' });
        } else {
          const errMsg = stderr.trim().split('\n').slice(-3).join(' ') || `Hata kodu: ${code}`;
          if (note && (errMsg.includes('No match') || errMsg.includes('Unable to find'))) {
            resolve({ ok: false, error: `"${value}" bulunamadı. ${note}` });
          } else {
            resolve({ ok: false, error: errMsg || `Kurulum başarısız (kod ${code})` });
          }
        }
      });
    });
  }

  // ── FLATPAK INSTALL ───────────────────────────────────────────────
  async function installViaFlatpak() {
    const checkFlatpak = require('node:child_process').spawnSync('flatpak', ['--version'], { encoding: 'utf8' });
    if (checkFlatpak.error || checkFlatpak.status !== 0) {
      return { ok: false, error: 'Flatpak kurulu değil. Fedora: sudo dnf install flatpak — Ubuntu/Pisi: paket yöneticinizle flatpak kurun.' };
    }

    // Düzeltme: taze kurulmuş sistemlerde (ör. Pisi Linux) flatpak kurulu
    // olsa bile flathub remote'u eklenmemiş oluyor, kurulum "uzak referans
    // bulunamadı" hatasıyla başarısız oluyordu. --if-not-exists sayesinde
    // remote zaten varsa bu çağrı no-op — her kurulumdan önce güvenle
    // çalıştırılabilir, kullanıcıdan terminal komutu istemeye gerek kalmaz.
    // --user kapsamında oldugu için root/pkexec gerekmez.
    await new Promise((resolve) => {
      const addRemote = spawn('flatpak', [
        'remote-add', '--user', '--if-not-exists', 'flathub',
        'https://dl.flathub.org/repo/flathub.flatpakrepo',
      ], { stdio: ['ignore', 'pipe', 'pipe'] });
      addRemote.on('error', () => resolve());
      addRemote.on('close', () => resolve());
    });

    sendProgress('flatpak', { msg: `flatpak install ${value}...` });

    return new Promise((resolve) => {
      const proc = spawn('flatpak', ['install', '--user', '-y', 'flathub', value], {
        stdio: ['ignore', 'pipe', 'pipe']
      });

      const install = activeInstalls.get(id);
      if (install) install.proc = proc;

      let stderr = '';
      proc.stderr.on('data', (d) => { stderr += d.toString(); });

      proc.on('error', (err) => resolve({ ok: false, error: err.message }));
      proc.on('close', (code) => {
        if (isCanceled()) { resolve({ ok: false, error: 'Canceled' }); return; }
        if (code === 0) {
          resolve({ ok: true });
        } else {
          const errMsg = stderr.trim().split('\n').slice(-2).join(' ');
          if (errMsg.includes('not found') || errMsg.includes('No remote')) {
            resolve({ ok: false, error: 'Flathub remote bulunamadı. flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo' });
          } else {
            resolve({ ok: false, error: errMsg || `Flatpak kurulum başarısız (kod ${code})` });
          }
        }
      });
    });
  }

  // ── URL DOWNLOAD + INSTALL ────────────────────────────────────────
  async function installViaUrl() {
    let fileName;
    try {
      const u = new URL(value);
      fileName = path.basename(u.pathname);
      if (!fileName || !fileName.includes('.')) {
        fileName = appName.replace(/[^a-zA-Z0-9_-]/g, '_') + ext;
      }
    } catch {
      fileName = appName.replace(/[^a-zA-Z0-9_-]/g, '_') + ext;
    }
    const destPath = path.join(tmpdir(), 'firehub-' + id + '-' + fileName);

    let downloadedSha256 = null;
    try {
      const result = await downloadFile(value, destPath, id);
      downloadedSha256 = result.sha256;
    } catch (err) {
      return { ok: false, error: 'İndirme başarısız: ' + err.message };
    }

    if (isCanceled()) {
      try { fs.unlinkSync(destPath); } catch {}
      return { ok: false, error: 'Canceled' };
    }

    sendProgress('verify');
    const stat = fs.statSync(destPath);
    if (stat.size < 1024) {
      try { fs.unlinkSync(destPath); } catch {}
      return { ok: false, error: 'İndirilen dosya çok küçük — URL geçersiz olabilir' };
    }
    if (!verifyFileSignature(destPath, ext)) {
      try { fs.unlinkSync(destPath); } catch {}
      return { ok: false, error: 'İndirilen dosya beklenen paket türüyle eşleşmiyor (bütünlük doğrulaması başarısız)' };
    }
    // CDN bir x-sha256 header'ı verdiyse (şu an yalnızca VS Code), dosyanın
    // gerçekten o hash ile eşleştiğini doğrula — magic bytes sadece dosya
    // TÜRÜNÜ doğrular, İÇERİĞİN bozulmadığını/değiştirilmediğini doğrulamaz.
    if (!verifyFileHash(destPath, downloadedSha256)) {
      try { fs.unlinkSync(destPath); } catch {}
      return { ok: false, error: 'İndirilen dosyanın SHA-256 özeti kaynağın belirttiğiyle eşleşmiyor — bütünlük doğrulaması başarısız' };
    }

    let installResult;
    try {
      if (platform === 'windows') {
        await installWindowsPackage(destPath, id);
        installResult = { ok: true };
      } else {
        await installLinuxPackage(destPath, platform, id);
        installResult = { ok: true };
        try { fs.unlinkSync(destPath); } catch {}
      }
    } catch (err) {
      try { fs.unlinkSync(destPath); } catch {}
      installResult = { ok: false, error: err.message };
    }

    return installResult;
  }

  // ── DISPATCH ──────────────────────────────────────────────────────
  try {
    let result;
    if (type === 'pkg') {
      result = await installViaPkg();
    } else if (type === 'flatpak') {
      result = await installViaFlatpak();
    } else if (type === 'url') {
      result = await installViaUrl();
    } else {
      result = { ok: false, error: 'Unknown install type: ' + type };
    }
    return result;
  } catch (err) {
    return { ok: false, error: err.message || 'Unknown error' };
  } finally {
    activeInstalls.delete(id);
  }
});

/**
 * Aktif indirmeyi/kurulumu iptal eder.
 */
ipcMain.on('app:cancelInstall', (_event, id) => {
  const install = activeInstalls.get(id);
  if (!install) return;
  install.canceled = true;
  if (install.req) {
    try { install.req.destroy(); } catch {}
  }
  if (install.proc) {
    try { install.proc.kill('SIGTERM'); } catch {}
  }
});

// ======================================================================
// APP DETECTION — Sistemi tarayarak kurulu uygulamaları bulur
// ======================================================================
const { spawnSync } = require('node:child_process');

/**
 * Linux\'ta `which <binary>` ile binary PATH'te mi diye bakar.
 * Flatpak kurulumlar için `flatpak list --app` çıktısını kontrol eder.
 */
function checkLinux(binary, flatpakId) {
  // 1. System binary kontrolü (pkg veya url ile kurulmuş olabilir)
  if (binary) {
    const r = spawnSync('which', [binary], { encoding: 'utf8', timeout: 3000 });
    if (r.status === 0 && r.stdout.trim()) {
      return { installed: true, method: 'system', launchCmd: binary };
    }
  }
  // 2. Flatpak kontrolü
  if (flatpakId) {
    const r = spawnSync('flatpak', ['list', '--app', '--columns=application'], {
      encoding: 'utf8', timeout: 5000
    });
    if (r.status === 0 && r.stdout.includes(flatpakId)) {
      return { installed: true, method: 'flatpak', launchCmd: flatpakId };
    }
  }
  return { installed: false };
}

/**
 * Windows'ta `where.exe <binary>` ile PATH kontrolü yapar.
 * Bazı uygulamalar için Program Files altına bakar.
 */
function checkWindows(binary, programPaths) {
  if (binary) {
    const r = spawnSync('where.exe', [binary], { encoding: 'utf8', timeout: 3000 });
    if (r.status === 0 && r.stdout.trim()) {
      const found = r.stdout.trim().split('\n')[0].trim();
      return { installed: true, method: 'system', launchPath: found };
    }
  }
  // Bilinen yolları da kontrol et
  if (programPaths && programPaths.length > 0) {
    const expandedPaths = programPaths.map(p =>
      p.replace('%LOCALAPPDATA%', process.env.LOCALAPPDATA || '')
       .replace('%ProgramFiles%', process.env['ProgramFiles'] || 'C:\\Program Files')
       .replace('%ProgramFiles(x86)%', process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)')
    );
    for (const p of expandedPaths) {
      try {
        if (fs.existsSync(p)) {
          return { installed: true, method: 'system', launchPath: p };
        }
      } catch {}
    }
  }
  return { installed: false };
}

// GÜVENLİK (denetim raporu #3): renderer artık yalnızca appId gönderir.
// Tespit için kullanılan binary adı / flatpakId / windowsPaths APP_CATALOG'dan
// okunur — renderer'ın rastgele bir binary adını `which`e geçirmesi artık
// mümkün değil (zararı sınırlı olsa da, ilke aynı: main process güvenilir
// veriyle çalışır).
ipcMain.handle('app:checkInstalled', async (_event, opts) => {
  const { appId } = opts || {};
  const app = APP_CATALOG[appId];
  if (!app) return { installed: false, error: 'Bilinmeyen uygulama' };

  const detect = app.detect || {};
  try {
    if (process.platform === 'linux') {
      return checkLinux(detect.linux || null, detect.flatpakId || null);
    } else if (process.platform === 'win32') {
      return checkWindows(detect.windows || null, detect.windowsPaths || []);
    }
    return { installed: false };
  } catch (err) {
    return { installed: false, error: err.message };
  }
});

// Not: launchCmd/launchPath burada renderer'dan geliyor gibi görünse de,
// bu değerler aslında bir önceki app:checkInstalled çağrısında BU process
// tarafından üretilip renderer'a döndürülmüştü (bkz. checkLinux/checkWindows).
// Düzeltme (denetim raporu #7): renderer'dan gelen launchCmd/launchPath artık
// HİÇ okunmuyor — appId geçersizse ya da katalogda o method için değer yoksa
// eskiden renderer'ın gönderdiği ham değere sessizce düşülüyordu, bu da
// renderer'ın (XSS/tedarik zinciri uzlaşması durumunda) keyfi bir binary adı
// veya dosya yolu geçirebilmesine izin veriyordu. Artık installApp/uninstallApp
// ile birebir aynı model: main process appId'den TÜM değerleri kendisi
// yeniden türetir, renderer yalnızca appId + method gönderir.
ipcMain.handle('app:launchApp', async (_event, opts) => {
  const { appId, method } = opts || {};
  try {
    const app = APP_CATALOG[appId];
    if (!app) {
      return { ok: false, error: 'Bilinmeyen uygulama' };
    }
    const detect = app.detect || {};

    if (method === 'flatpak') {
      const flatpakId = detect.flatpakId;
      if (!flatpakId || !/^[a-zA-Z0-9_.-]+$/.test(flatpakId)) {
        return { ok: false, error: 'Gecersiz flatpak id' };
      }
      spawn('flatpak', ['run', flatpakId], {
        detached: true, stdio: 'ignore'
      }).unref();
      return { ok: true };
    } else if (method === 'system') {
      const targetCmd = process.platform === 'win32' ? detect.windows : detect.linux;
      if (!targetCmd || !/^[a-zA-Z0-9_.-]+$/.test(targetCmd)) {
        return { ok: false, error: 'Gecersiz komut adi' };
      }
      spawn(targetCmd, [], {
        detached: true, stdio: 'ignore',
        shell: false
      }).unref();
      return { ok: true };
    } else if (process.platform === 'win32') {
      // Windows'ta system/flatpak disinda: checkWindows ile ayni katalog
      // kaynakli aday yol listesinden yeniden turetilir (renderer'in
      // launchPath'i main process tarafindan asla dogrudan guvenilmez).
      const detection = checkWindows(detect.windows || null, detect.windowsPaths || []);
      if (detection.installed && detection.launchPath) {
        const err = await shell.openPath(detection.launchPath);
        return err ? { ok: false, error: err } : { ok: true };
      }
      return { ok: false, error: 'No launch method available' };
    }
    return { ok: false, error: 'No launch method available' };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

// ─── UYGULAMA KALDIRMA ──────────────────────────────────────────────────────
// GÜVENLİK (denetim raporu #3): renderer artık yalnızca {appId, method, platform}
// gönderir; pkgName/flatpakId APP_CATALOG'dan okunur.
// Düzeltme (denetim raporu #5): flatpak kaldırma artık `--user` kapsamında —
// kurulum da `--user` ile yapıldığı için (installViaFlatpak), pkexec ile
// root kapsamında kaldırmaya çalışmak paketi "bulunamadı" hatasıyla
// başarısız kılıyordu. Artık kurulum ve kaldırma simetrik, pkexec gerekmiyor.
ipcMain.handle('app:uninstallApp', async (_event, opts) => {
  const { appId, method, platform } = opts || {};

  if (process.platform !== 'linux') {
    return { ok: false, error: 'Kaldırma yalnızca Linux\'ta destekleniyor.' };
  }

  const app = APP_CATALOG[appId];
  if (!app) {
    return { ok: false, error: 'Bilinmeyen uygulama' };
  }

  const detect = app.detect || {};
  const pkgName = detect.linux || null;
  const flatpakId = detect.flatpakId || null;

  // Flatpak: --user kapsamında, sudo/pkexec gerekmez (kurulumla simetrik).
  if (method === 'flatpak' && flatpakId) {
    return new Promise((resolve) => {
      const proc = spawn('flatpak', ['uninstall', '--user', '-y', flatpakId], { stdio: ['ignore', 'pipe', 'pipe'] });
      let stderr = '';
      proc.stderr.on('data', (d) => { stderr += d.toString(); });
      proc.on('error', (err) => resolve({ ok: false, error: err.message }));
      proc.on('close', (code) => {
        resolve(code === 0
          ? { ok: true }
          : { ok: false, error: stderr.trim() || `Kaldırma başarısız (kod ${code})` });
      });
    });
  }

  if (!pkgName) {
    return { ok: false, error: 'Kaldırmak için paket adı bulunamadı.' };
  }

  let args;
  if (platform === 'fedora') {
    args = ['dnf', 'remove', '-y', pkgName];
  } else if (platform === 'pisi') {
    args = ['pisi', 'rm', '-y', pkgName];
  } else {
    args = ['apt-get', 'remove', '-y', pkgName];
  }

  return new Promise((resolve) => {
    const proc = spawn('pkexec', args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';
    proc.stderr.on('data', (d) => { stderr += d.toString(); });
    proc.on('error', (err) => {
      if (err.code === 'ENOENT') {
        resolve({ ok: false, error: 'pkexec bulunamadı.' });
      } else {
        resolve({ ok: false, error: err.message });
      }
    });
    proc.on('close', (code) => {
      if (code === 0) {
        resolve({ ok: true });
      } else if (code === 126 || code === 127) {
        resolve({ ok: false, error: 'Kaldırma yetkisi reddedildi veya iptal edildi.' });
      } else {
        resolve({ ok: false, error: stderr.trim() || ('Kaldırma başarısız (kod ' + code + ')') });
      }
    });
  });
});
