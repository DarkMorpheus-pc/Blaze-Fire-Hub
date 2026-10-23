/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz.
 */

// ============================================================================
// BLAZE SHIELD: KRIPTOGRAFIK ANAHTAR KASASI (BLAZE VAULT)
// ============================================================================
//
// Bu modul, Firebase API anahtarlarinin ve hassas yapilandirma verilerinin
// paketlenmis ikili dosyalarda (.asar, .js) ASLA duz metin veya tekil string
// olarak bulunmamasini garanti eder.
//
// Guvenlik Mimarisi:
// 1. 3 Parcali Shamir/XOR Bayt Sarding:
//    Her anahtar 3 bagimsiz sayisal bayt dizisine (Share A, Share B, Share C)
//    bolunur. Hicbir dize ("AIzaSy...") kodda yer almaz.
// 2. Cift Yonlu Bitwise Rotasyon ve Nonce Karisimi:
//    s[i] = ShareC[i] ^ (((ShareA[i] <<< 3) ^ (ShareB[i] + 0x5a)) & 0xff)
// 3. Gecici Bellek Imhasi (Transient Zeroization):
//    Anahtar cozumu yalnizca RAM uzerinde anlik gerceklesir ve ilklendirme biter
//    bitmez orijinal tamponlar (Uint8Array) sifirlarla (0x00) ezilir.
// ============================================================================

/**
 * 3 Parcali bayt dizisinden gizli dizeyi yeniden olusturur ve hemen ardindan
 * tamponlari guvenli sekilde sifirlar (zeroize).
 *
 * @param {number[]} shareA - Birincil entropi baytlari
 * @param {number[]} shareB - Ikincil permütasyon baytlari
 * @param {number[]} shareC - Sifrelenmis yuk baytlari
 * @returns {string|undefined}
 */
export function reconstructSecret(shareA, shareB, shareC) {
  if (!shareA || !shareB || !shareC) return undefined;
  if (!shareA.length || shareA.length !== shareB.length || shareA.length !== shareC.length) {
    return undefined;
  }

  const len = shareA.length;
  const a = new Uint8Array(shareA);
  const b = new Uint8Array(shareB);
  const c = new Uint8Array(shareC);
  const out = new Uint8Array(len);

  try {
    for (let i = 0; i < len; i++) {
      // 8-bit rotasyon: (a <<< 3) | (a >>> 5)
      const rotA = ((a[i] << 3) | (a[i] >> 5)) & 0xff;
      const mixB = (b[i] + 0x5a) & 0xff;
      const mask = (rotA ^ mixB) & 0xff;
      out[i] = (c[i] ^ mask) & 0xff;
    }

    const decoded = new TextDecoder('utf-8').decode(out);
    return decoded;
  } catch (err) {
    console.error('[Blaze Vault] Deobfuskasyon hatasi:', err);
    return undefined;
  } finally {
    // Guvenlik: Bellek temizligi (Zeroization)
    a.fill(0);
    b.fill(0);
    c.fill(0);
    out.fill(0);
  }
}

// ----------------------------------------------------------------------------
// VAULT VERI HAVUZU (Sayisal Bayt Sarding Katmani)
// DİKKAT: Açık kaynak depoda hassas anahtarlar yer almaz; derleme betiği
// (scripts/secure_vault_generator.js) yerel ortamdan bayt dizilerini uretir.
// ----------------------------------------------------------------------------
export const VAULT_PAYLOAD = {
  apiKey: null,
  authDomain: null,
  databaseURL: null,
  projectId: null,
  storageBucket: null,
  messagingSenderId: null,
  appId: null,
  measurementId: null,
};

/**
 * Guvenli yapilandirma nesnesini olusturur ve Object.freeze ile kilitler.
 */
export function assembleVaultConfig() {
  const config = {};
  const keys = [
    'apiKey',
    'authDomain',
    'databaseURL',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId',
    'measurementId',
  ];

  for (const k of keys) {
    const entry = VAULT_PAYLOAD[k];
    if (entry && Array.isArray(entry.a) && Array.isArray(entry.b) && Array.isArray(entry.c)) {
      config[k] = reconstructSecret(entry.a, entry.b, entry.c);
    } else {
      // Fallback: Ortam degiskenleri
      const envKey = `VITE_FIREBASE_${k.replace(/[A-Z]/g, (m) => '_' + m).toUpperCase()}`;
      config[k] = import.meta.env[envKey] || undefined;
    }
  }

  return Object.freeze(config);
}
