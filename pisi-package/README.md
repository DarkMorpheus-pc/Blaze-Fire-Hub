# FireHub — Pisi Linux paketleme (pisi-package/)

> FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.  
> blazeos.com.tr - https://github.com/DarkMorpheus-pc  
> (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.


Bu klasördeki `pspec.xml` + `actions.py` + `files/`, FireHub'ı bir `.pisi`
paketi olarak build alıyor. **`pisilinux/chroot` Docker/Podman imajı içinde
gerçekten build alınıp doğrulandı** (2026-08-15) — `pisi info` ile metadata,
`unzip`/`python zipfile` ile içerik (metadata.xml, files.xml, install.tar.xz)
kontrol edildi, `pisi it` ile kurulum simüle edildi. Üretilen gerçek dosya
`release/firehub-1.8.0-1-p2-x86_64.pisi`.

## Nasıl çalışıyor

Pisi kaynak-tabanlı bir paketleme sistemi (Gentoo/Arch'a benzer) — normalde
`actions.py` kaynak koddan derleme yapar. FireHub'ı burada **derlemiyoruz**;
electron-builder zaten önceden derleyip hazırlıyor, `actions.py` sadece
hazır dosyaları doğru yerlere kopyalıyor (`/opt/FireHub`, `/usr/bin/firehub`
sembolik linki, `.desktop` girişi, ikon).

Build sırasında `install()` çalışırken çalışma dizini (CWD) zaten çıkarılmış
kaynak arşivinin İÇİNDE olur (`get.srcDIR()` bir yol değil, sadece bir isim
etiketi döndürür) — bu yüzden `actions.py` doğrudan CWD'ye göreli yollar
kullanıyor. `.desktop`/ikon dosyaları `pspec.xml`'deki `<AdditionalFiles>`
etiketiyle build sırasında otomatik olarak aynı CWD'ye kopyalanıyor.

## Adım adım build

1. **Kaynak arşivini üret** (repo kök dizininde):
   ```bash
   npm run build
   npx electron-builder --linux tar.gz --publish never
   ```
   Bu, `release/firehub-<versiyon>.tar.gz` dosyasını üretir — `pspec.xml`
   içindeki `<Archive>` etiketinin işaret ettiği dosyanın ta kendisi.

2. **`pspec.xml`'i güncelle** (yeni sürümde):
   - Dosyayı bir GitHub Release'e yükleyip `<Archive>` URL'sini ona göre
     güncelleyin (`electron-builder.yml`'deki `publish:` bloğu zaten
     `DarkMorpheus-pc/Blaze-Fire-Hub` reposuna işaret ediyor), YA DA yerel
     testte `file:///tam/yol/firehub-<versiyon>.tar.gz` kullanın.
   - `sha1sum release/firehub-<versiyon>.tar.gz` çıktısını `sha1sum="..."`
     alanına yazın.
   - `<Version>`/`<Date>`'i `<History>` bloğuna güncelleyin.

3. **Build et** (gerçek Pisi Linux sisteminde):
   ```bash
   sudo pisi build pspec.xml
   ```
   `pisi build` bağımlılık kontrolü için etkileşimli bir onay sorabilir
   (`system.devel` bileşeninin tamamını ister) — genelde gerekmez, gerekirse
   `--ignore-safety -y` ekleyin:
   ```bash
   sudo pisi build --ignore-safety -y pspec.xml
   ```

4. **Kur ve gerçek makinede dene**:
   ```bash
   sudo pisi it firehub-1.8.0-1-p2-x86_64.pisi
   ```
   Uygulama menüden "FireHub" olarak açılmalı, `chrome-sandbox` sorunu
   olmadan başlamalı (bu doğrudan bu oturumda düzelttiğimiz Electron sandbox
   güvenlik açığıyla ilgili — `actions.py` içinde `chmod 4755` ile aynı
   korumayı burada da sağlıyoruz — build çıktısında "chrome-sandbox has suid
   bit set" uyarısı görürseniz bu normal/beklenen, hata değil).

## Debian'dan da test edebilirsiniz — Podman ile (gerçekten denendi)

Gerçek bir Pisi Linux sisteminiz yoksa, `.rpm` için kullandığımız aynı
Podman yaklaşımı burada da işe yarıyor — resmi `pisilinux/chroot` imajı var:

```bash
podman run --rm \
  -v "$(pwd)/pisi-package":/workspace \
  -v "$(pwd)/release/firehub-1.8.0.tar.gz":/workspace-src/firehub-1.8.0.tar.gz:ro \
  -w /workspace \
  docker.io/pisilinux/chroot:latest \
  bash -c "pisi build --ignore-safety -y pspec.xml -O /workspace"
```

`<Archive>` URL'si `file:///workspace-src/firehub-1.8.0.tar.gz` gibi bir
yerel yola işaret ediyorsa yukarıdaki mount'a uygun düzenleyin (biz test
ederken `pspec.xml`'i geçici olarak `file:///workspace/firehub-1.8.0.tar.gz`
yapıp tar.gz'i doğrudan `pisi-package/` içine kopyalamıştık).

## Bilinen sınırlamalar / henüz yapılmayanlar

- `--ignore-safety` kullanıyoruz çünkü test container'ında `system.devel`
  bileşeninin (çok büyük bir geliştirme paketi listesi) tam kurulu değildi —
  gerçek bir masaüstü Pisi Linux kurulumunda muhtemelen gerekmeyecek, ama
  build başarısız olursa önce bunu deneyin.
- `chrome-sandbox` izni build sırasında sabit `4755` (setuid) olarak
  ayarlanıyor — electron-builder'ın `.deb` paketindeki gibi çekirdeğin
  unprivileged user namespace desteğine göre koşullu davranmıyor (bunun için
  bir `comar` postInstall betiği gerekir, şu an eklenmedi). Sabit `4755`
  her iki durumda da güvenli ve çalışır, sadece daha az yaygın olan sandbox
  yolunu kullanır.
