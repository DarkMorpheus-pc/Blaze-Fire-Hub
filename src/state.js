/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — Paylaşılan uygulama durumu (state)
// Modüller arası basit mutable state — orijinal SPA da modülsüz global
// değişkenlerle çalışıyordu, burada aynı basitlik korunuyor.

export const state = {
  /** @type {string|null} Şu an açık olan detay sayfasının app id'si */
  currentAppId: null,
  /** @type {string} Aktif üst sekme: all | top | games | productivity | design | developer */
  activeTab: 'all',
  /** @type {string|null} Aktif kategori filtresi (kategori kartına tıklanınca) */
  activeCategory: null,
  /** @type {string} Arama kutusu içeriği */
  searchQuery: '',
  /** @type {string|null} Kurulum platformu seçim modalında seçilen platform */
  selectedPlatform: null,
  /** @type {string|null} Aktif indirme/kurulum işleminin id'si (iptal için) */
  activeInstallId: null,

  /**
   * appId -> devam eden kurulumun anlık durumu. Kullanıcı kurulum sırasında
   * başka bir sayfaya/uygulamaya geçip geri dönse bile (arka planda kurulum
   * gerçekten devam ettiği için) ilerlemeyi kaybetmemek amacıyla burada
   * tutuluyor — detay sayfası tekrar açıldığında buradan "resume" edilir.
   * @type {Record<string, {installId:string, appName:string, type:string, ext:string, platform:string, stage:string, statusText:string, percent:number, received:number, total:number}>}
   */
  activeInstalls: {},

  /** @type {Record<string, {avg:number,count:number,distPct:number[]}|null>} appId -> puan istatistiği */
  globalStats: {},
  /** @type {Record<string, Array>} appId -> yorum listesi (son snapshot) */
  reviewsCache: {},

  /** @type {import('firebase/auth').User|null} */
  currentUser: null,

  /** @type {number} Yorum formunda seçili yıldız sayısı (0-5) */
  selectedRating: 0,
};
