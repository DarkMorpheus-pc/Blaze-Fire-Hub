/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — Review (yorum/puan) sistemi
// Önceki obfuscate edilmiş build'den (v1.7.10) deobfuscate + yeniden isimlendirme
// yoluyla geri kazanılmıştır.

import {
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  setDoc,
  collection,
  query,
  limit,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from './init.js';

/**
 * Bir uygulama için yorum ekler/günceller (bir kullanıcının uygulama başına
 * tek yorumu olur — doc id = uid). E-posta doğrulaması şart.
 */
export async function addReview(appId, rating, text) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Yorum yapmak icin oturum acmalisin.');
  }
  if (!user.emailVerified) {
    throw new Error('EMAIL_NOT_VERIFIED');
  }

  const ratingNum = Math.round(Number(rating));
  if (!Number.isFinite(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    throw new Error('Puan 1 ile 5 arasinda olmali.');
  }

  const trimmedText = String(text || '').trim();
  if (trimmedText.length < 10) {
    throw new Error('Yorum en az 10 karakter olmali.');
  }
  if (trimmedText.length > 1000) {
    throw new Error('Yorum en fazla 1000 karakter olabilir.');
  }

  const reviewRef = doc(db, 'reviews', appId, 'items', user.uid);
  const existing = await getDoc(reviewRef);

  const payload = {
    uid: user.uid,
    displayName: user.displayName || user.email?.split('@')[0] || 'Anonim',
    rating: ratingNum,
    text: trimmedText,
  };

  if (existing.exists()) {
    payload.createdAt = existing.data().createdAt; // güncellemede createdAt korunur
  } else {
    payload.createdAt = serverTimestamp();
  }

  await setDoc(reviewRef, payload);
  return user.uid;
}

/** Aktif kullanıcının belirli bir uygulama için yorumunu getirir (yoksa null). */
export async function getMyReview(appId) {
  const user = auth.currentUser;
  if (!user) return null;

  const snap = await getDoc(doc(db, 'reviews', appId, 'items', user.uid));
  if (!snap.exists()) return null;

  const data = snap.data();
  return {
    ...data,
    id: snap.id,
    createdAt: data.createdAt?.toDate?.() ?? null,
  };
}

function mapAndSortReviews(docs) {
  const reviews = docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      uid: data.uid,
      displayName: data.displayName,
      rating: data.rating,
      text: data.text,
      createdAt: data.createdAt?.toDate?.() ?? null,
    };
  });
  reviews.sort((a, b) => {
    if (!a.createdAt && !b.createdAt) return 0;
    if (a.createdAt) return b.createdAt ? b.createdAt.getTime() - a.createdAt.getTime() : 1;
    return -1;
  });
  return reviews;
}

/**
 * Bir uygulamanın yorumlarını gerçek zamanlı dinler (en yeni önce sıralı).
 * Yalnızca o an açık olan uygulama detay sayfası için kullanılır — genel
 * kart/rozet listeleri için tek seferlik fetchReviewsOnce() tercih edilir,
 * aksi halde katalogdaki her uygulama için kalıcı bir dinleyici açık kalır.
 * @param {string} appId
 * @param {(reviews: Array) => void} callback
 * @param {number} [maxResults=50]
 * @returns {() => void} unsubscribe fonksiyonu
 */
export function listenReviews(appId, callback, maxResults = 50) {
  const q = query(collection(db, 'reviews', appId, 'items'), limit(maxResults));
  return onSnapshot(
    q,
    (snapshot) => callback(mapAndSortReviews(snapshot.docs)),
    (err) => {
      console.error('Yorumlar yüklenemedi:', err.code, err.message);
      callback([]);
    },
  );
}

/**
 * Bir uygulamanın yorumlarını TEK SEFERLİK okur (canlı dinleyici açmaz).
 * Ana sayfa/arama/popüler şerit gibi genel rozet görünümleri için kullanılır;
 * bu görünümlerde saniyelik gerçek-zamanlılık gerekmediğinden, katalogdaki
 * her uygulama için kalıcı bir onSnapshot bağlantısı açmak yerine tek seferlik
 * bir okuma yeterlidir — bu da eski/düşük donanımlı sistemlerde sürekli arka
 * plan CPU/bellek/IndexedDB yükünü büyük ölçüde azaltır.
 * @param {string} appId
 * @param {number} [maxResults=50]
 * @returns {Promise<Array>}
 */
export async function fetchReviewsOnce(appId, maxResults = 50) {
  try {
    const q = query(collection(db, 'reviews', appId, 'items'), limit(maxResults));
    const snapshot = await getDocs(q);
    return mapAndSortReviews(snapshot.docs);
  } catch (err) {
    console.error('Yorumlar yüklenemedi:', err.code, err.message);
    return [];
  }
}

/** Aktif kullanıcının bir uygulama için yorumunu siler. */
export async function deleteReview(appId) {
  const user = auth.currentUser;
  if (!user) throw new Error('Oturum acik degil');

  await deleteDoc(doc(db, 'reviews', appId, 'items', user.uid));
  return true;
}

/**
 * Bir yorum listesinden ortalama puan, oy sayısı ve 5→1 yıldız yüzde dağılımı hesaplar.
 * @param {Array<{rating:number}>} reviews
 * @returns {{avg:number, count:number, distPct:number[]} | null}
 */
export function computeRatingStats(reviews) {
  if (!reviews || reviews.length === 0) return null;

  const buckets = [0, 0, 0, 0, 0]; // index 0 = 1 yıldız, ... index 4 = 5 yıldız
  let sum = 0;
  let count = 0;

  reviews.forEach((r) => {
    const rating = parseInt(r.rating);
    if (rating >= 1 && rating <= 5) {
      sum += rating;
      buckets[rating - 1]++;
      count++;
    }
  });

  if (count === 0) return null;

  return {
    avg: sum / count,
    count,
    distPct: [4, 3, 2, 1, 0].map((i) => Math.round((buckets[i] / count) * 100)),
  };
}

/** "3 gun once" gibi göreli zaman metni üretir. */
export function timeAgo(date) {
  if (!date) return 'Simdi';
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'Az once';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + ' dakika once';

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + ' saat once';

  const days = Math.floor(hours / 24);
  if (days < 7) return days + ' gun once';

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return weeks + ' hafta once';

  const months = Math.floor(days / 30);
  if (months < 12) return months + ' ay once';

  return Math.floor(days / 365) + ' yil once';
}
