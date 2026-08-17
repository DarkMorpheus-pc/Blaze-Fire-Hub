/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — Firebase App / Auth / Firestore başlatma
// Offline persistence açık.

import { initializeApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
} from 'firebase/firestore';
import { firebaseConfig } from './config.js';

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.warn('Auth persistence ayarlanamadı:', err);
});

// Tek sekme yöneticisi: FireHub tek pencereli bir Electron uygulaması, aynı
// origin'i açan birden fazla sekme/pencere senaryosu yok — çoklu-sekme
// koordinasyon kilitlerinin (persistentMultipleTabManager) getirdiği ekstra
// IndexedDB/iletişim yükü eski/düşük donanımlı sistemlerde gereksiz.
export const db = initializeFirestore(firebaseApp, {
  localCache: persistentLocalCache({
    tabManager: persistentSingleTabManager(),
  }),
});
