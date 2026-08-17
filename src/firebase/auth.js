/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — Kimlik doğrulama mantığı
// Önceki obfuscate edilmiş build'den (v1.7.10) deobfuscate + yeniden isimlendirme
// yoluyla geri kazanılmıştır. Fonksiyon davranışları orijinaliyle birebir.

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from './init.js';

/**
 * Kullanıcının banlanıp banlanmadığını kontrol eder.
 * Banlıysa oturumu kapatır ve "BAN:<sebep>" formatında hata fırlatır.
 */
async function checkBanned(uid) {
  try {
    const banSnap = await getDoc(doc(db, 'banned', uid));
    if (banSnap.exists()) {
      await firebaseSignOut(auth);
      const data = banSnap.data();
      throw new Error('BAN:' + (data.reason || 'Hesabiniz askiya alindi.'));
    }
  } catch (err) {
    if (err.message?.startsWith('BAN:')) throw err;
    // Firestore erişim hatası vs. — ban kontrolü başarısız oldu, sessizce geç
  }
}

/** E-posta + şifre ile kayıt olur. Firestore'da kullanıcı profili oluşturur. */
export async function registerWithEmail(email, password, displayName) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(user, { displayName });
  }
  await sendEmailVerification(user);
  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    displayName: displayName || email.split('@')[0],
    email: user.email,
    createdAt: serverTimestamp(),
    reviewCount: 0,
    flagCount: 0,
    provider: 'email',
  });
  return user;
}

/** E-posta + şifre ile giriş yapar. */
export async function signInWithEmail(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  await checkBanned(cred.user.uid);
  return cred.user;
}

/** Google popup ile giriş yapar; ilk girişse Firestore profili oluşturur. */
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const { user } = await signInWithPopup(auth, provider);
  await checkBanned(user.uid);

  const userDoc = await getDoc(doc(db, 'users', user.uid));
  if (!userDoc.exists()) {
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      displayName: user.displayName || user.email?.split('@')[0] || 'User',
      email: user.email,
      createdAt: serverTimestamp(),
      reviewCount: 0,
      flagCount: 0,
      provider: 'google',
    });
  }
  return user;
}

/** Oturumu kapatır. */
export function signOut() {
  return firebaseSignOut(auth);
}

/** Auth durum değişikliklerini dinler. Unsubscribe fonksiyonu döner. */
export function onAuthChange(callback) {
  return firebaseOnAuthStateChanged(auth, callback);
}

/** Mevcut kullanıcıya e-posta doğrulama linki tekrar gönderir. */
export async function resendVerificationEmail() {
  if (auth.currentUser && !auth.currentUser.emailVerified) {
    await sendEmailVerification(auth.currentUser);
    return true;
  }
  return false;
}

/** Şifre sıfırlama e-postası gönderir. */
export async function sendPasswordReset(email) {
  if (!email || !email.includes('@')) {
    throw new Error('Gecerli bir e-posta adresi girin');
  }
  await sendPasswordResetEmail(auth, email);
  return true;
}

/**
 * Hesabı kalıcı olarak siler (KVKK/GDPR uyumlu):
 * gerekirse şifreyle yeniden kimlik doğrular, Firestore profilini siler,
 * ardından Firebase Auth kullanıcısını siler.
 */
export async function deleteAccount(password) {
  const user = auth.currentUser;
  if (!user) throw new Error('Oturum acik degil');

  if (password && user.email) {
    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
    } catch (err) {
      throw new Error('Sifreyi yeniden girmeniz gerekiyor: ' + (err.message || ''));
    }
  }

  const uid = user.uid;
  try {
    await deleteDoc(doc(db, 'users', uid));
  } catch (err) {
    console.warn('Profil silinemedi:', err);
  }
  await deleteUser(user);
  return true;
}

/** Firebase auth hata kodunu kullanıcı dostu Türkçe mesaja çevirir. */
export function getAuthErrorMessage(err) {
  const code = err?.code || '';
  const message = err?.message || '';
  if (message.startsWith('BAN:')) {
    return message.slice(4);
  }
  const messages = {
    'auth/email-already-in-use': 'Bu e-posta zaten kullanımda.',
    'auth/invalid-email': 'Geçerli bir e-posta girin.',
    'auth/weak-password': 'Şifre en az 6 karakter olmalı.',
    'auth/user-not-found': 'Bu e-postayla kayıtlı kullanıcı yok.',
    'auth/wrong-password': 'Şifre hatali.',
    'auth/invalid-credential': 'E-posta veya şifre hatali.',
    'auth/too-many-requests': 'Çok fazla deneme. Lütfen bekle.',
    'auth/network-request-failed': 'Internet baglantisi yok.',
    'auth/popup-closed-by-user': 'Giris penceresi kapatildi.',
    'auth/cancelled-popup-request': 'Giris iptal edildi.',
    'auth/popup-blocked': 'Tarayici popup engelledi.',
  };
  return messages[code] || message || 'Bilinmeyen bir hata olustu.';
}
