# FireHub — BlazeOS Uygulama Mağazası (v1.8.0 — "Pisi Update")

> FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.  
> blazeos.com.tr - https://github.com/DarkMorpheus-pc  
> (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
>
> "FireHub" ve "BlazeOS" adları/logoları ayrı bir marka politikasına tabidir — bkz. [`TRADEMARK.md`](./TRADEMARK.md).


Bu repository, **BlazeOS** işletim sistemi için geliştirilen FireHub uygulama mağazasının modernizasyon edilmiş, Material 3 tasarım diline sahip, güvenlik açıkları kapatılmış ve 40+ uygulama kataloğu entegre edilmiş kaynak kodudur.

**1.8.0'da yeni**: Pisi Linux (`.pisi`) platform desteği, sıkılaştırılmış Firestore güvenlik kuralları, Electron sandbox ve indirme bütünlüğü doğrulaması güçlendirmeleri.

---

## 🛠️ Sistem Gereksinimleri ve Gerekli Bileşenlerin Kurulumu

FireHub'ı derlemek ve `.deb` / `.rpm` / `.pisi` paketleri oluşturmak için sisteminizde **Node.js (v18, v20 veya v22 LTS)** ve hedef paket formatına uygun paketleme araçlarının kurulu olması gerekmektedir.

> **Önemli — `.rpm` build ve RPM sürümü**: `.deb` ve `.pisi` (kaynak arşivi) herhangi bir Linux sisteminden (Debian dahil) sorunsuz cross-build alınabiliyor. `.rpm` içinse mesele dağıtım değil, **`rpm` aracının sürümü**: electron-builder'ın kullandığı `fpm` paketleyicisi eski (2019 civarı) ve **RPM 4.20 ile RPM 6.x**'te BUILDROOT'u doğru dolduramayıp "File not found" hatasıyla başarısız oluyor — bunu hem Debian 13 (RPM 4.20) hem taze bir Fedora container'ında (RPM 6.0.1) canlı test ederek doğruladık. **RPM 4.19.x** (ör. Fedora 40) ile ise sorunsuz çalışıyor — bunu da gerçekten build alıp doğruladık. Sisteminizde `rpm --version` ile kontrol edin; 4.19.x değilse aşağıdaki Podman yöntemini kullanın.

### 🐧 Debian 13 (Trixie) ve Debian/Ubuntu Tabanlı Sistemler — `.deb` build için

1. **Sistem Paketleri ve Paketleme Araçlarının Kurulumu**:
   ```bash
   sudo apt update
   sudo apt install -y curl build-essential git python3 dpkg-dev fakeroot xz-utils \
     libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxcomposite1 libxdamage1 \
     libxfixes3 libxrandr2 libgbm1 libasound2t64 libpangocairo-1.0-0 libgtk-3-0 pkexec
   ```

2. **Node.js ve NPM Kurulumu** (Eğer sisteminizde Node.js yoksa):
   - **Yöntem A (NodeSource - Önerilen LTS v20)**:
     ```bash
     curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
     sudo apt install -y nodejs
     ```
   - **Yöntem B (NVM - Node Version Manager)**:
     ```bash
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
     source ~/.bashrc
     nvm install 20
     nvm use 20
     ```

---

### 🎩 Fedora / RHEL Tabanlı Sistemler — `.rpm` build için

> RPM sürümünüz 4.19.x değilse (`rpm --version`), build muhtemelen başarısız
> olur — bkz. yukarıdaki uyarı ve aşağıdaki Podman yöntemi.

1. **Sistem Bağımlılıklarının Kurulumu**:
   ```bash
   sudo dnf groupinstall -y "Development Tools"
   sudo dnf install -y nodejs npm python3 rpm-build libX11-devel libXScrnSaver nss libxcrypt-compat
   ```

---

### 🐳 Herhangi Bir Sistemden `.rpm`: Podman/Docker ile (Debian dahil — test edildi)

RPM sürümü uyumsuzluğunu aşmak için Fedora 40 (RPM 4.19.x) container'ı içinde
build almak en güvenilir yol — bunu Debian 13 üzerinden bizzat deneyip
çalışan bir `.rpm` ürettik. Docker daemon gerektirmeyen **Podman**'ı öneririz:

```bash
sudo apt install -y podman   # Debian/Ubuntu (Fedora'da: sudo dnf install -y podman)
```

Sonra proje kök dizininde tek komutla build:

```bash
podman run --rm \
  -v "$(pwd)":/workspace \
  -v firehub-rpm-node-modules:/workspace/node_modules \
  -w /workspace \
  docker.io/library/fedora:40 \
  bash -c '
    dnf install -y nodejs npm python3 rpm-build gcc gcc-c++ make git \
      libX11-devel libXScrnSaver nss libxcrypt-compat &&
    npm install &&
    npm run build &&
    npx electron-builder --linux rpm --publish never
  '
```

- `node_modules` ayrı bir Podman volume'üne (`firehub-rpm-node-modules`) yazılır,
  host'taki `node_modules`'ı ASLA değiştirmez (Fedora'da derlenen native
  paketlerin Debian'daki dev ortamınızı bozmaması için kasıtlı).
- Çıktı doğrudan host'taki `release/firehub-1.8.0.x86_64.rpm`'e yazılır
  (proje dizini bind-mount edildiği için).
- İlk çalıştırma `dnf install` + Electron indirmesi nedeniyle birkaç dakika
  sürer; container `--rm` ile silindiği için her yeni build'de sıfırdan
  başlar (kalıcı bir image isterseniz `podman commit` ile bir ara image
  oluşturup onu tekrar kullanabilirsiniz).

---

### 🐾 Pisi Linux Tabanlı Sistemler — `.pisi` build için

> Pisi paket deposunda `nodejs` bulunup bulunmadığı ve tam paket adları sistem
> sürümüne göre değişebilir — aşağıdaki `pisi it` komutu çalışmazsa, Node.js
> için NVM yöntemine (Debian bölümündeki Yöntem B, dağıtımdan bağımsız
> çalışır) geçin.

1. **Sistem Bağımlılıklarının Kurulumu (deneyin, çalışmazsa NVM'e geçin)**:
   ```bash
   sudo pisi it -y nodejs npm python3 gcc make git polkit
   ```

2. **Node.js için NVM (Pisi deposunda nodejs yoksa)**:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   source ~/.bashrc
   nvm install 20
   nvm use 20
   ```

3. **`.pisi` paketi build alma**: bu adım `npm`/`electron-builder` değil, Pisi'nin
   kendi kaynak-tabanlı build aracını (`pisi build`) kullanır. **Gerçekten
   build alınıp doğrulandı** (`pisilinux/chroot` container'ı üzerinden —
   `0 error(s)`, geçerli bir `.pisi` üretildi, `pisi info` ile içeriği
   doğrulandı) — ayrıntılı talimatlar için
   [`pisi-package/README.md`](pisi-package/README.md) dosyasına bakın. Özet akış:
   ```bash
   # 1) Önce normal şekilde tar.gz kaynak arşivini üretin (aşağıdaki "Derleme" bölümüne bakın)
   npm run build
   npx electron-builder --linux tar.gz --publish never

   # 2) pisi-package/pspec.xml içindeki sha1sum + Archive URL'sini güncelleyin
   sha1sum release/firehub-1.8.0.tar.gz

   # 3) Pisi'nin kendi build aracıyla .pisi paketini üretin
   cd pisi-package
   sudo pisi build --ignore-safety -y pspec.xml
   ```

---

## 📦 Proje Kurulumu ve Geliştirme

1. **Bağımlılıkları Yükleme**:
   ```bash
   npm install
   ```

2. **Geliştirme Modu (Canlı Yeniden Yükleme - Hot Reload)**:
   Geliştirme yaparken iki ayrı terminal kullanın:

   ```bash
   # Terminal 1: Vite Frontend sunucusu (http://localhost:5173)
   npm run dev

   # Terminal 2: Electron ana süreç (dev modunda Vite sunucusunu açar)
   npm run electron:dev
   ```

---

## 🚀 Derleme ve Paketleme (Production Build)

1. **Sadece Frontend Derlemesi** (`dist/` klasörüne HTML/CSS/JS çıktı üretir — her paketleme adımından önce gerekli):
   ```bash
   npm run build
   ```

2. **Tek bir hedef için paket üretme** (`npm run build`'dan sonra):
   ```bash
   # .deb (Debian/Ubuntu/BlazeOS)
   npx electron-builder --linux deb --publish never

   # .rpm (RPM 4.19.x gerekli — bkz. yukarıdaki uyarı ve Podman yöntemi)
   npx electron-builder --linux rpm --publish never

   # .pisi'nin kaynak arşivi (tar.gz) — .pisi paketinin kendisi için bkz. pisi-package/README.md
   npx electron-builder --linux tar.gz --publish never

   # Windows .exe (şu an ikinci öncelik)
   npx electron-builder --win nsis --publish never
   ```

3. **Tüm Uygulama Paketlerini Tek Seferde Oluşturma** (`.deb`, `.rpm`, `.exe`, `.tar.gz`):
   ```bash
   npm run dist
   ```

Üretilen paketler `release/` klasörüne yazılır, örnek dosya adları:
- `release/firehub_1.8.0_amd64.deb` (Debian/Ubuntu/BlazeOS için — test edildi, çalışıyor)
- `release/firehub-1.8.0.x86_64.rpm` (Fedora/RHEL için — RPM 4.19.x'te veya Podman/Fedora 40 yöntemiyle test edildi, çalışıyor)
- `release/firehub-1.8.0.tar.gz` (Pisi Linux paketinin kaynak arşivi — test edildi, çalışıyor)
- `release/firehub-1.8.0-1-p2-x86_64.pisi` (Pisi Linux için — gerçekten build alındı, doğrulandı; bkz. `pisi-package/README.md`)
- `release/FireHub Setup 1.8.0.exe` (Windows kurulum paketi)

> **İpucu (Sıkıştırma Hızı)**: `.deb` derleme süresi çok uzun sürüyorsa `electron-builder.yml` dosyasındaki `deb.compression` alanını `gz` (hızlı) veya `xz` (küçük dosya boyutu) olarak ayarlayabilirsiniz.

---

## 📂 Proje Yapısı

```
src/
  data/catalog.js       — 40+ uygulamanın UI meta verileri, ikonlar ve ekran görüntüleri
  data/i18n-data.js     — 5 dilde çeviri sözlüğü (TR, EN, RU, JA, ZH)
  firebase/              — Auth, Firestore yorumları ve canlı dinleyiciler
  main.js                — Renderer uygulama başlangıç noktası
  browse.js               — Arama, sıralama (Sort), sekmeler ve filtreleme mantığı
  detail.js, app-detail-controller.js — Detay sayfası ve Lightbox ekran görüntüsü galerisi
  install.js              — Kurulum akışı ve ilerleme çubuğu (Progress)
  auth-modal.js            — Giriş/Kayıt dialogu
  review-form.js           — Yorum ve puanlama formu
  settings.js              — Ayarlar, M3 renk temaları ve profil yönetimi
  stats.js                 — Global puan istatistikleri (tek seferlik, gruplu okuma)
  state.js, utils.js, i18n.js — Paylaşılan state ve güvenli utility katmanı

electron/
  main.js       — Electron main process (Güvenliği sertleştirilmiş IPC işleyicileri, indirme host allowlist + SHA-256 doğrulama)
  preload.js    — ContextBridge whitelist API
  catalog.js    — Main process'teki doğrulama kataloğu (Komut enjeksiyonu korumalı)

public/
  icons/pisi-linux.png — Pisi Linux platform ikonu

pisi-package/
  pspec.xml, actions.py, files/ — FireHub'ı .pisi paketi olarak build alır (gerçekten test edildi, bkz. README.md)

firestore.rules, firebase.json, database.rules.json — Firebase güvenlik kuralları ve proje yapılandırması
```

---

## 🛡️ Güvenlik ve Mimari Değişiklikler

1. **Electron Sandbox**: Production build'de `webPreferences.sandbox: true` (kernel/AppArmor uyumluluk sorunları nedeniyle yalnızca dev modda kapalı); global `--no-sandbox` komut satırı anahtarı kaldırıldı.
2. **IPC Komut Enjeksiyonu Koruması**: Renderer sürecinden gelen `launchApp`, `installApp` ve `uninstallApp` istekleri doğrudan `electron/catalog.js` üzerinde doğrulanır; `launchApp` artık renderer'dan gelen hiçbir komut/yol değerine güvenmez, her şeyi appId'den kendisi türetir.
3. **İndirme Bütünlüğü**: `ALLOWED_DOWNLOAD_HOSTS` allowlist'i + dosya türü (magic bytes) doğrulaması; CDN bir SHA-256 sağladığında (VS Code) indirilen dosya bu hash ile de doğrulanır.
4. **`openExternal` Host Allowlist**: Sistem tarayıcısında yalnızca kataloğun kendi resmi domain'leri açılabilir.
5. **XSS Koruması**: `escapeHtml` yardımcı fonksiyonu tüm kullanıcı/katalog verisi render edilirken tutarlı şekilde kullanılır; CSP'de `script-src` artık `unsafe-inline`/`unsafe-eval` içermiyor.
6. **Firestore Kuralları**: Kullanıcılar yalnızca kendi profillerini ve yorumlarını değiştirebilir; alan bazlı doğrulama (`hasOnly`, tip/uzunluk kontrolleri) ile sahte/kayıt-dışı alan yazımı engellenir.
