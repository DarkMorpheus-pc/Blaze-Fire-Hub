/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — Giriş/Kayıt modalı
// Deobfuscate edilmiş build'den (v1.7.10) geri kazanılmıştır.

import { t } from './i18n.js';
import { el, showToast } from './utils.js';
import {
  registerWithEmail,
  signInWithEmail,
  signInWithGoogle,
  resendVerificationEmail,
  sendPasswordReset,
  getAuthErrorMessage,
} from './firebase/auth.js';

let authMode = 'signin'; // 'signin' | 'signup'

/** Sekme (giriş/kayıt) durumuna göre modal metinlerini ve alan görünürlüğünü günceller. */
function renderAuthModalState() {
  const isSignup = authMode === 'signup';
  el('tabSignin').classList.toggle('act', !isSignup);
  el('tabSignup').classList.toggle('act', isSignup);
  el('lTitle').textContent = isSignup ? "FireHub'a Katil" : t('login.title');
  el('lSubtitle').textContent = isSignup ? 'Ucretsiz hesap olustur.' : t('login.subtitle');
  el('lDN').style.display = isSignup ? '' : 'none';
  el('lP2').style.display = isSignup ? '' : 'none';
  el('lOkIcon').className = isSignup ? 'ti ti-user-plus' : 'ti ti-login-2';
  el('lOkText').textContent = isSignup ? 'Hesap olustur' : t('login.submit');
  el('lP').setAttribute('autocomplete', isSignup ? 'new-password' : 'current-password');
}

/** Giriş/kayıt modalını verilen sekmeyle (varsayılan: signin) açar ve formu temizler. */
export function openAuthModal(mode = 'signin') {
  authMode = mode;
  renderAuthModalState();

  ['lE', 'lP', 'lP2', 'lDN'].forEach((id) => {
    const field = el(id);
    if (field) field.value = '';
  });

  el('lVerify').style.display = 'none';
  el('lActions').style.display = '';
  el('lGoogle').style.display = '';
  ['lDN', 'lP', 'lP2'].forEach((id) => {
    const field = el(id);
    if (field) field.style.display = '';
  });

  el('logM').classList.add('act');
}

/** E-posta yerel kısmından "ad soyad" tarzı bir görünen ad türetir (kayıt formunda ad boşsa). */
function deriveDisplayNameFromEmail(email) {
  return email.split('@')[0]
    .replace(/[._-]/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** Giriş/kayıt modalındaki tüm olay dinleyicilerini bağlar (tek seferlik init). */
export function initAuthModal() {
  el('tabSignin').addEventListener('click', () => { authMode = 'signin'; renderAuthModalState(); });
  el('tabSignup').addEventListener('click', () => { authMode = 'signup'; renderAuthModalState(); });

  el('loginB').addEventListener('click', () => openAuthModal('signin'));
  el('lC').addEventListener('click', () => el('logM').classList.remove('act'));

  el('lOk').addEventListener('click', async () => {
    const email = el('lE').value.trim();
    const password = el('lP').value;
    const passwordConfirm = el('lP2').value;
    const displayName = (el('lDN').value || '').trim();

    if (!email || !password) {
      showToast('Eksik bilgi', 'E-posta ve sifre alanlarini doldurun', {}, true);
      return;
    }
    if (authMode === 'signup') {
      if (password.length < 6) {
        showToast('Zayif sifre', 'Sifre en az 6 karakter olmali', {}, true);
        return;
      }
      if (password !== passwordConfirm) {
        showToast('Sifreler uyusmuyor', 'Iki sifre ayni olmali', {}, true);
        return;
      }
    }

    const submitBtn = el('lOk');
    submitBtn.disabled = true;
    const originalHtml = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="fh-sp" style="border-color:rgba(255,255,255,0.3);border-top-color:#fff;margin-right:6px;"></div>'
      + (authMode === 'signup' ? 'Hesap olusturuluyor...' : 'Giris yapiliyor...');

    try {
      if (authMode === 'signup') {
        const finalName = displayName || deriveDisplayNameFromEmail(email);
        await registerWithEmail(email, password, finalName);

        ['lDN', 'lP', 'lP2'].forEach((id) => {
          const field = el(id);
          if (field) field.style.display = 'none';
        });
        el('lActions').style.display = 'none';
        el('lGoogle').style.display = 'none';
        el('lVerify').style.display = '';
        el('lVerifyMsg').textContent = `${email} adresine dogrulama baglantisi gonderildi.`;
      } else {
        await signInWithEmail(email, password);
        el('logM').classList.remove('act');
      }
    } catch (err) {
      showToast('Hata', getAuthErrorMessage(err), {}, true);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHtml;
    }
  });

  el('lResend').addEventListener('click', async () => {
    try {
      await resendVerificationEmail();
      showToast('Email gonderildi', 'Gelen kutunu kontrol et');
      el('lResend').disabled = true;
      setTimeout(() => { el('lResend').disabled = false; }, 30000);
    } catch (err) {
      showToast('Gonderilemedi', err.message || '', {}, true);
    }
  });

  el('lForgot').addEventListener('click', async (event) => {
    event.preventDefault();
    const email = el('lE').value.trim();
    if (!email) {
      el('lE').focus();
      showToast('Email gerekli', 'Once e-posta adresinizi yazin', {}, true);
      return;
    }

    const link = el('lForgot');
    const originalText = link.textContent;
    link.textContent = 'Gonderiliyor...';
    link.style.pointerEvents = 'none';

    try {
      await sendPasswordReset(email);
      showToast('Sifre sifirlama gonderildi', `${email} adresine kontrol et`);
      link.textContent = 'Tekrar gonder';
      setTimeout(() => {
        link.style.pointerEvents = '';
        link.textContent = originalText;
      }, 30000);
    } catch (err) {
      link.textContent = originalText;
      link.style.pointerEvents = '';
      showToast('Hata', getAuthErrorMessage(err), {}, true);
    }
  });

  el('lGoogle').addEventListener('click', async () => {
    try {
      await signInWithGoogle();
      el('logM').classList.remove('act');
    } catch (err) {
      showToast('Google girisi basarisiz', getAuthErrorMessage(err), {}, true);
    }
  });

  el('uc').addEventListener('click', () => el('setM').classList.add('act'));
}
