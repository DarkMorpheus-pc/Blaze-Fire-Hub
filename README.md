# 🔥 FireHub

**BlazeOS için geliştirilmiş, Material 3 Expressive tasarım diline sahip masaüstü uygulama mağazası.**

FireHub, Linux masaüstünde uygulama keşfetmeyi, kurmayı ve yönetmeyi tek bir yerden, modern ve akıcı bir arayüzle yapmanı sağlayan bir Electron uygulamasıdır. BlazeOS için optimize edilmiştir, ancak `.deb`, `.rpm` ve `.pisi` paketleri sayesinde Debian/Ubuntu, Fedora/RHEL ve Pisi Linux tabanlı dağıtımlarda da çalışır.

> Sürüm 1.8.0 — "Pisi Update"

---

## ✨ Özellikler

### 📦 83 uygulamalık küratörlü katalog
Web tarayıcılarından oyun platformlarına, kod editörlerinden şifre kasalarına kadar 30'dan fazla kategoride, elle seçilmiş uygulamalar:

`Web Tarayıcı` · `Geliştirici Araçları` · `Kod Editörü` · `Tasarım & 3D` · `Tasarım & Vektör` · `Video Düzenleme` · `Ses Düzenleyici` · `Oyun` · `Oyun Platformu` · `Şifre Yöneticisi` · `VPN & Gizlilik` · `Anlık Mesajlaşma` · `Üretkenlik & Ofis` · `Sistem Araçları` ve daha fazlası.

Her uygulama kartında ekran görüntüleri, sürüm bilgisi, geliştirici, paket boyutu ve indirme sayısı yer alır.

### 🎨 Material 3 Expressive tasarım
6 farklı tema rengi (Coral, Purple, Forest, Ocean, Sunset, Mint) + karanlık mod, dinamik "island" bildirimleri, akıcı geçiş animasyonları ve duyarlı (responsive) bir arayüz.

### ⭐ Gerçek zamanlı değerlendirmeler
Firebase Authentication (e-posta/şifre + Google girişi) ile hesap oluşturup uygulamalara puan verebilir, yorum yazabilirsin. Yorumlar Firestore üzerinden gerçek zamanlı senkronize edilir; alan bazlı doğrulama ve ban sistemiyle kötüye kullanım engellenir.

### 🌍 5 dil desteği
Türkçe, İngilizce, Rusça, Japonca ve Çince — arayüz dili anında (sayfa yenilenmeden) değiştirilebilir.

### 📥 Çoklu platform kurulumu
Tek bir "Kur" düğmesiyle işletim sistemine uygun paket otomatik seçilir:

| Platform | Format | Yöntem |
|---|---|---|
| Debian / Ubuntu / BlazeOS | `.deb` | `apt install` |
| Fedora / RHEL | `.rpm` | `dnf install` |
| Pisi Linux | `.pisi` | `pisi it` |
| Windows | `.exe` | NSIS kurulum sihirbazı |

### 🛡️ Güvenlik odaklı mimari
- Electron sandbox (production build'de aktif)
- IPC komutları renderer'dan gelen değerlere güvenmez — her şey `appId`'den doğrulanarak türetilir
- İndirmeler yalnızca izinli host allowlist'inden + SHA-256/magic-bytes doğrulamasından geçer
- Sistem tarayıcısında yalnızca resmî domainler açılabilir (`openExternal` allowlist)
- Tutarlı `escapeHtml` kullanımı ve sıkı CSP ile XSS koruması
- Kullanıcılar yalnızca kendi profil/yorumlarını değiştirebilir (Firestore güvenlik kuralları)

---

## 🧰 Teknoloji

- **Electron 41** — masaüstü uygulama çatısı
- **Vite** — geliştirme ve build aracı
- **Firebase** (Authentication + Firestore) — kimlik doğrulama ve gerçek zamanlı yorumlar
- **Material 3 Expressive** — Google'ın modern tasarım dili
- **Vanilla JS (ES Modules)** — framework'süz, hafif renderer katmanı

---

## 🔥 Neden FireHub?

Çoğu Linux uygulama mağazası ya dağıtıma özel (yalnızca tek bir paket formatı) ya da eski/karmaşık bir arayüze sahip. FireHub, tek bir katalogdan birden fazla paket formatını destekleyerek ve modern bir tasarım diliyle bu deneyimi sadeleştirmeyi hedefler — özellikle BlazeOS kullanıcıları için optimize edilmiş olsa da, altyapısı dağıtımdan bağımsız çalışacak şekilde kurulmuştur.

---

<sub>FireHub — BlazeOS için DarkMorpheus (Bulut Ars. E.) tarafından geliştirilmiştir.</sub>
