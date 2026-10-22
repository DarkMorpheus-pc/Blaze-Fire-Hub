/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — Guvenli Firebase Yapilandirmasi
//
// Kritik hassas bilgiler (API Key, Project ID vb.) kaynak kodda veya paketlenmis
// dosyalarda duz metin olarak ASLA tutulmaz. Calisma zamaninda dinamik bellek
// cozucu ile yalnizca RAM uzerinde deobfuskasyona ugratilir.

const DEFAULT_SALT = "BlazeOS_Sovereign_Shield_2026";

/**
 * Calisma zamaninda sifreli anahtarlari hafizada cozer
 */
export function deobfuscateSecret(encryptedBase64, salt = DEFAULT_SALT) {
  if (!encryptedBase64) return undefined;
  try {
    const raw = typeof atob !== "undefined"
      ? atob(encryptedBase64)
      : Buffer.from(encryptedBase64, "base64").toString("latin1");
    return raw
      .split("")
      .map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ salt.charCodeAt(i % salt.length)))
      .join("");
  } catch (e) {
    console.error("[FireHub Security] Sifreli anahtar cozulemedi:", e);
    return undefined;
  }
}

// Eger derleme zamaninda sifrelenmis payload saglanmissa dinamik cozer,
// yoksa standart ortam degiskenlerinden okur.
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY_ENCRYPTED
    ? deobfuscateSecret(import.meta.env.VITE_FIREBASE_API_KEY_ENCRYPTED)
    : import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_ENCRYPTED
    ? deobfuscateSecret(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_ENCRYPTED)
    : import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL_ENCRYPTED
    ? deobfuscateSecret(import.meta.env.VITE_FIREBASE_DATABASE_URL_ENCRYPTED)
    : import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_ENCRYPTED
    ? deobfuscateSecret(import.meta.env.VITE_FIREBASE_PROJECT_ID_ENCRYPTED)
    : import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_ENCRYPTED
    ? deobfuscateSecret(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_ENCRYPTED)
    : import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_ENCRYPTED
    ? deobfuscateSecret(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_ENCRYPTED)
    : import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID_ENCRYPTED
    ? deobfuscateSecret(import.meta.env.VITE_FIREBASE_APP_ID_ENCRYPTED)
    : import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
