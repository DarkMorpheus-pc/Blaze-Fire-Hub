/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — Firebase App / Auth / Firestore başlatma
// Offline persistence açık.
//
// Not: .env dosyası olmadan (bkz. .env.example) VITE_FIREBASE_* değerleri
// undefined gelir. Bu durumda Firebase SDK'sı initializeApp/getAuth/
// initializeFirestore çağrılarında senkron hata fırlatır — bu dosya
// modül yüklenirken (import zamanında) çalıştığı için, eskiden bu hata
// tüm uygulamanın (menüler dahil) hiç açılmamasına yol açıyordu. Şimdi
// hata yakalanıp firebaseReady=false ile devam ediliyor: tarama/kurulum
// normal çalışır, sadece oturum açma/yorum/istatistik özellikleri kendi
// noktalarında sessizce devre dışı kalır.

import { initializeApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
} from 'firebase/firestore';
import { firebaseConfig } from './config.js';

const REQUIRED_FIELDS = ['apiKey', 'authDomain', 'projectId', 'appId'];
const hasCompleteConfig = REQUIRED_FIELDS.every((key) => !!firebaseConfig[key]);

export let firebaseApp = null;
export let auth = null;
export let db = null;
export let firebaseReady = false;

if (hasCompleteConfig) {
  try {
    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
    db = initializeFirestore(firebaseApp, {
      localCache: persistentLocalCache({
        tabManager: persistentSingleTabManager(),
      }),
    });
    firebaseReady = true;

    setPersistence(auth, browserLocalPersistence).catch((err) => {
      console.warn('Auth persistence ayarlanamadı:', err);
    });
  } catch (err) {
    console.error(
      '[FireHub] Firebase başlatılamadı, oturum/yorum/istatistik özellikleri devre dışı:',
      err,
    );
  }
} else {
  console.warn(
    '[FireHub] Firebase yapılandırması eksik (.env dosyası yok/boş — bkz. .env.example). ' +
      'Tarama ve kurulum normal çalışır; oturum açma, yorum ve istatistik özellikleri devre dışı.',
  );
}
