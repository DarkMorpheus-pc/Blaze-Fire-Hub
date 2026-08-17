/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — Yorum (review) formu: yıldız seçici, gönder/güncelle/sil
// Deobfuscate edilmiş build'den (v1.7.10) geri kazanılmıştır.

import { t } from './i18n.js';
import { el, showToast } from './utils.js';
import { state } from './state.js';
import { addReview, deleteReview, getMyReview, timeAgo } from './firebase/reviews.js';

/** @type {{rating:number, text:string, createdAt:Date}|null} Düzenlenmekte olan mevcut yorum (varsa) */
let editingReview = null;

/** Yıldız seçiciyi verilen değere göre günceller (görsel + state.selectedRating). */
export function setFormStars(rating) {
  state.selectedRating = rating;
  const stars = document.querySelectorAll('.fh-rfst');
  stars.forEach((star, index) => {
    const filled = index < rating;
    star.style.color = filled ? '#FFB400' : '';
    star.classList.toggle('on', filled);
    star.classList.toggle('ti-star', !filled);
    star.classList.toggle('ti-star-filled', filled);
  });
}

/** Formu boş/varsayılan duruma sıfırlar (silme durumu dahil gizler). */
export function resetReviewForm() {
  editingReview = null;
  state.selectedRating = 0;
  el('rFT').value = '';
  setFormStars(0);

  const submitBtn = el('rFP');
  if (submitBtn) {
    submitBtn.innerHTML = `<i class="ti ti-send"></i><span data-i18n="review.submit">${t('review.submit')}</span>`;
  }

  const writeBtn = el('wrB');
  if (writeBtn) {
    const titleEl = writeBtn.querySelector('.fh-wrt');
    const subEl = writeBtn.querySelector('.fh-wrs');
    if (titleEl) titleEl.textContent = t('review.write');
    if (subEl) subEl.textContent = t(state.currentUser ? 'review.share' : 'review.signin');
  }
}

/** Oturum kapalıyken "Write a review" satırının alt metnini "sign in" olarak ayarlar. */
export function showReviewPromptForSignedOutUser() {
  const writeBtn = el('wrB');
  if (!writeBtn) return;
  const subEl = writeBtn.querySelector('.fh-wrs');
  if (subEl) subEl.textContent = t('review.signin');
}

/** Detay sayfası açılırken, kullanıcının bu uygulama için mevcut yorumu varsa "Write a review" satırını günceller (formu açmadan). */
export async function prefillMyReview(appId) {
  resetReviewForm();
  if (!state.currentUser) return;

  try {
    const existing = await getMyReview(appId);
    if (existing) {
      editingReview = existing;
      const writeBtn = el('wrB');
      if (writeBtn) {
        const titleEl = writeBtn.querySelector('.fh-wrt');
        const subEl = writeBtn.querySelector('.fh-wrs');
        if (titleEl) titleEl.textContent = 'Yorumunuzu düzenleyin';
        if (subEl) subEl.textContent = `${existing.rating} yıldız · ${timeAgo(existing.createdAt)}`;
      }
      const submitBtn = el('rFP');
      if (submitBtn) submitBtn.innerHTML = '<i class="ti ti-edit"></i><span>Güncelle</span>';
    }
  } catch (err) {
    console.warn('Mevcut yorum kontrol edilemedi:', err);
  }
}

/** "Write a review" satırına tıklanınca formu açar/kapatır; oturum kapalıysa giriş modalını açar. */
async function toggleReviewForm() {
  if (!state.currentUser) {
    el('logM').classList.add('act');
    return;
  }

  const form = el('rF');
  if (form.classList.contains('show')) {
    form.classList.remove('show');
    return;
  }

  try {
    const existing = await getMyReview(state.currentAppId);
    if (existing) {
      editingReview = existing;
      el('rFT').value = existing.text;
      setFormStars(existing.rating);
      const deleteBtn = el('rFD');
      if (deleteBtn) deleteBtn.style.display = '';
      const submitBtn = el('rFP');
      if (submitBtn) submitBtn.innerHTML = '<i class="ti ti-edit"></i><span>Guncelle</span>';
    } else {
      editingReview = null;
      state.selectedRating = 0;
      el('rFT').value = '';
      setFormStars(0);
      const submitBtn = el('rFP');
      if (submitBtn) submitBtn.innerHTML = `<i class="ti ti-send"></i><span>${t('review.submit')}</span>`;
    }
  } catch (err) {
    console.warn('Yorum yuklenemedi:', err);
  }

  form.classList.add('show');
  setTimeout(() => el('rFT')?.focus(), 100);
}

/** Yorum formundaki tüm olay dinleyicilerini bağlar (tek seferlik init). */
export function initReviewForm() {
  el('wrB').addEventListener('click', toggleReviewForm);

  document.querySelectorAll('.fh-rfst').forEach((star) => {
    star.addEventListener('click', () => setFormStars(parseInt(star.getAttribute('data-s'))));
  });

  el('rFC').addEventListener('click', () => {
    el('rF').classList.remove('show');
    state.selectedRating = 0;
    el('rFT').value = '';
    setFormStars(0);
    if (editingReview) {
      setTimeout(() => prefillMyReview(state.currentAppId), 100);
    }
  });

  el('rFD')?.addEventListener('click', async () => {
    if (!editingReview || !state.currentUser || !state.currentAppId) return;
    if (!window.confirm('Yorumunuzu silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) return;

    const deleteBtn = el('rFD');
    deleteBtn.disabled = true;
    const originalHtml = deleteBtn.innerHTML;
    deleteBtn.innerHTML = '<div class="fh-sp" style="width:14px;height:14px;border-color:rgba(207,102,121,0.3);border-top-color:#CF6679;"></div>';

    try {
      await deleteReview(state.currentAppId);
      editingReview = null;
      el('rF').classList.remove('show');
      el('rFT').value = '';
      setFormStars(0);
      await prefillMyReview(state.currentAppId);
      showToast('Yorum silindi', 'Yeni yorum yazabilirsiniz');
    } catch (err) {
      showToast('Silinemedi', err.message || 'Bilinmeyen hata', {}, true);
    } finally {
      deleteBtn.disabled = false;
      deleteBtn.innerHTML = originalHtml;
    }
  });

  el('rFP').addEventListener('click', async () => {
    const text = el('rFT').value.trim();

    if (!state.currentUser) {
      showToast('isl.signin.first', 'isl.signin.first.sub', {}, true);
      return;
    }
    if (state.selectedRating === 0) {
      showToast('isl.norating', 'isl.norating.sub', {}, true);
      return;
    }
    if (text.length < 10) {
      showToast('Yorum cok kisa', 'En az 10 karakter yaz', {}, true);
      return;
    }

    const submitBtn = el('rFP');
    submitBtn.disabled = true;
    const originalHtml = submitBtn.innerHTML;
    const wasEditing = !!editingReview;
    submitBtn.innerHTML = '<div class="fh-sp" style="border-color:rgba(255,255,255,0.3);border-top-color:#fff;"></div>';

    try {
      const rating = state.selectedRating;
      await addReview(state.currentAppId, rating, text);

      el('rF').classList.remove('show');
      el('rFT').value = '';
      state.selectedRating = 0;
      setFormStars(0);

      if (wasEditing) {
        showToast('Yorumunuz guncellendi', `${rating} yildiz`);
      } else {
        showToast(t('isl.published'), t('isl.published.sub', { rating, name: state.currentUser.displayName || '' }));
      }

      editingReview = { rating, text, createdAt: new Date() };
      await prefillMyReview(state.currentAppId);
    } catch (err) {
      const message = err.message || '';
      if (message === 'EMAIL_NOT_VERIFIED') {
        showToast('Email dogrulanmamis', 'Gelen kutundaki baglantiya tikla', {}, true);
      } else if (message.includes('permissions') || message.includes('Missing')) {
        showToast('Zaten yorum yaptiniz', 'Mevcut yorumunuzu duzenleyebilirsiniz', {}, false);
        await prefillMyReview(state.currentAppId);
      } else {
        showToast('Yorum gonderilemedi', message || 'Bilinmeyen hata', {}, true);
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHtml;
    }
  });
}
