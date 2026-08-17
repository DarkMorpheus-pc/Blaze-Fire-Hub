/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — Ana sayfa gezinme (arama, sekmeler, sıralama, kurulu uygulamalar, kart render)

import { APP_CATALOG } from './data/catalog.js';
import { t, getCurrentLang } from './i18n.js';
import { el, escapeHtml, normalizeSearchText, showToast } from './utils.js';
import { state } from './state.js';
import { refreshAppBadges } from './detail.js';
import { openAppDetail, closeAppDetail } from './app-detail-controller.js';

const TAB_ORDER = ['all', 'top', 'games', 'productivity', 'design', 'developer', 'installed'];
const CATEGORY_ORDER = ['games', 'code', 'music', 'chat', 'design', 'health', 'photo', 'education'];

const TAB_LABEL_KEYS = {
  all: 'tab.foryou',
  top: 'tab.top',
  games: 'tab.games',
  productivity: 'tab.productivity',
  design: 'tab.design',
  developer: 'tab.developer',
  installed: 'tab.installed',
};

const CATEGORY_LABEL_KEYS = {
  games: 'cat.games',
  code: 'cat.code',
  music: 'cat.music',
  chat: 'cat.chat',
  design: 'cat.design',
  health: 'cat.health',
  photo: 'cat.photo',
  education: 'cat.education',
};

const POPULAR_APP_IDS = ['firefox', 'brave', 'signal', 'bitwarden', 'vscode', 'blender', 'keepassxc', 'joplin'];
const TRENDING_APP_IDS = ['telegram', 'discord', 'obs', 'libreoffice', 'thunderbird', 'gimp', 'inkscape', 'handbrake'];

let sortCriterion = 'popular';
let cachedInstalledIds = new Set();
let isCheckingInstalled = false;

function appEntries() {
  return Object.entries(APP_CATALOG);
}

/** Indirme sayısını sayısal değere dönüştürür (örn: "18.5M" -> 18500000) */
function parseDownloadCount(dnStr) {
  if (!dnStr) return 0;
  let s = dnStr.toUpperCase();
  if (s.endsWith('M')) return parseFloat(s) * 1000000;
  if (s.endsWith('K')) return parseFloat(s) * 1000;
  return parseFloat(s) || 0;
}

/** Sıralama ölçütüne göre dizi sıralar */
function applySorting(entries) {
  const list = [...entries];
  switch (sortCriterion) {
    case 'rating':
      return list.sort((a, b) => {
        const statA = state.globalStats[a[0]]?.avg || 0;
        const statB = state.globalStats[b[0]]?.avg || 0;
        return statB - statA;
      });
    case 'name':
      return list.sort((a, b) => a[1].name.localeCompare(b[1].name));
    case 'size':
      return list.sort((a, b) => (b[1].sz || 0) - (a[1].sz || 0));
    case 'popular':
    default:
      return list.sort((a, b) => parseDownloadCount(b[1].dn) - parseDownloadCount(a[1].dn));
  }
}

/** Sistemde kurulu uygulamaları IPC üzerinden asenkron sorgular */
export async function updateInstalledCache() {
  if (isCheckingInstalled) return;
  isCheckingInstalled = true;
  const installed = new Set();
  const entries = appEntries();
  const api = window.firehub || window.electronAPI;
  
  if (api && typeof api.checkInstalled === 'function') {
    await Promise.all(
      entries.map(async ([id]) => {
        try {
          const res = await api.checkInstalled({ appId: id });
          if (res && res.installed) {
            installed.add(id);
          }
        } catch {
          // Ignored
        }
      })
    );
  }
  cachedInstalledIds = installed;
  isCheckingInstalled = false;
}

/** Sekmeye göre uygulama listesini filtreler */
function filterByTab(tab) {
  const all = appEntries();
  switch (tab) {
    case 'all':
      return applySorting(all);
    case 'top':
      return [...all].sort((a, b) => {
        const statA = state.globalStats[a[0]]?.avg || 0;
        const statB = state.globalStats[b[0]]?.avg || 0;
        return statB - statA;
      });
    case 'games':
      return applySorting(all.filter(([, app]) => app.tab === 'games' || (app.tags && app.tags.includes('gaming'))));
    case 'productivity':
      return applySorting(all.filter(([, app]) => app.tab === 'productivity' || app.scatKey === 'cat.productivity'));
    case 'design':
      return applySorting(all.filter(([, app]) => app.tab === 'design' || app.scatKey === 'cat.design'));
    case 'developer':
      return applySorting(all.filter(([, app]) => app.tab === 'developer' || app.scatKey === 'cat.code'));
    case 'installed':
      return applySorting(all.filter(([id]) => cachedInstalledIds.has(id)));
    default:
      return [];
  }
}

/** Kategoriye göre uygulama listesini filtreler. */
function filterByCategory(category) {
  const all = appEntries();
  let filtered = [];
  switch (category) {
    case 'games':
      filtered = all.filter(([, app]) => app.scatKey === 'cat.games' || (app.tags && app.tags.includes('gaming')));
      break;
    case 'code':
      filtered = all.filter(([, app]) => app.scatKey === 'cat.code');
      break;
    case 'music':
      filtered = all.filter(([, app]) => app.scatKey === 'cat.media' || (app.tags && app.tags.includes('music')));
      break;
    case 'chat':
      filtered = all.filter(([, app]) => app.scatKey === 'cat.chat');
      break;
    case 'design':
      filtered = all.filter(([, app]) => app.scatKey === 'cat.design');
      break;
    case 'photo':
      filtered = all.filter(([, app]) => app.scatKey === 'cat.design' || (app.tags && app.tags.includes('photo')));
      break;
    default:
      filtered = all;
      break;
  }
  return applySorting(filtered);
}

/** Serbest metin aramasını (Türkçe karakter duyarsız) uygular. */
function searchApps(query) {
  const normalized = normalizeSearchText(query);
  if (!normalized) return null;
  const filtered = appEntries().filter(([, app]) =>
    normalizeSearchText(`${app.name} ${app.dev} ${app.cat} ${app.ds || ''} ${(app.tags || []).join(' ')}`).includes(normalized),
  );
  return applySorting(filtered);
}

/** Ana sayfadaki popüler uygulama şeridini render eder. */
export function renderPopularStrip() {
  el('popularStrip').innerHTML = POPULAR_APP_IDS.map((appId) => {
    const app = APP_CATALOG[appId];
    if (!app) return '';
    const isInst = cachedInstalledIds.has(appId);
    return `
      <button class="fh-ac" data-app="${appId}">
        <div class="fh-ai ${app.co}">${app.ic}</div>
        <div class="fh-an">${escapeHtml(app.name)}</div>
        <div class="fh-acat">${escapeHtml(app.cat)}</div>
        ${isInst ? `<div class="fh-badge-inst" style="margin-top:2px;"><i class="ti ti-check"></i> ${t('installed.badge')}</div>` : ''}
        <div class="fh-ar"></div>
      </button>`;
  }).join('');
  POPULAR_APP_IDS.forEach(refreshAppBadges);
}

/** Ana sayfadaki trend olanlar listesini render eder. */
export function renderTrendingList() {
  el('trendingList').innerHTML = TRENDING_APP_IDS.map((appId, index) => {
    const app = APP_CATALOG[appId];
    if (!app) return '';
    const isInst = cachedInstalledIds.has(appId);
    return `
      <button class="fh-li" data-app="${appId}">
        <span class="fh-ln">${index + 1}</span>
        <div class="fh-lic ${app.co}">${app.ic}</div>
        <div class="fh-lf">
          <div class="fh-lnm">${escapeHtml(app.name)}</div>
          <div class="fh-lm">${escapeHtml(app.cat)} ${isInst ? `<span class="fh-badge-inst"><i class="ti ti-check"></i> ${t('installed.badge')}</span>` : ''}</div>
        </div>
        <span class="fh-lb">${escapeHtml(isInst ? t('open') : t('install'))}</span>
      </button>`;
  }).join('');
  TRENDING_APP_IDS.forEach(refreshAppBadges);
}

/** Varsayılan (filtrelenmemiş) ana sayfa görünümüne döner. */
export function showDefaultView() {
  el('defaultView').style.display = '';
  el('filteredView').style.display = 'none';
  const scroll = document.querySelector('#home .fh-sc');
  if (scroll) scroll.scrollTop = 0;
}

/** Filtrelenmiş sonuç listesini (arama/sekme/kategori) render eder. */
function renderFilteredList(entries, title, searchQuery) {
  el('defaultView').style.display = 'none';
  const filteredView = el('filteredView');
  filteredView.style.display = '';

  if (!entries || entries.length === 0) {
    const isInstTab = state.activeTab === 'installed';
    filteredView.innerHTML = `
      <div class="fh-sec"><div class="fh-sech"><h2>${escapeHtml(title)}</h2></div></div>
      <div class="fh-empty-view">
        <i class="ti ti-${isInstTab ? 'box-off' : 'mood-empty'}"></i>
        <h3>${escapeHtml(isInstTab ? t('installed.none') : t('empty.title'))}</h3>
        <p>${escapeHtml(searchQuery ? t('empty.search', { q: searchQuery }) : t('empty.category'))}</p>
      </div>`;
  } else {
    filteredView.innerHTML = `
      <div class="fh-sec">
        <div class="fh-sech">
          <h2>${escapeHtml(title)}</h2>
          <span style="font-size:12px;color:var(--on-v);font-weight:500;">${escapeHtml(t('count.apps', { n: entries.length }))}</span>
        </div>
      </div>
      <div class="fh-al">
        ${entries.map(([appId, app]) => {
          const isInst = cachedInstalledIds.has(appId);
          return `
          <button class="fh-li" data-app="${appId}">
            <div class="fh-lic ${app.co}">${app.ic}</div>
            <div class="fh-lf">
              <div class="fh-lnm">${escapeHtml(app.name)}</div>
              <div class="fh-lm">
                ${escapeHtml(app.cat)} <span class="d"></span> ${app.sz} MB
                ${isInst ? `<span class="fh-badge-inst"><i class="ti ti-check"></i> ${t('installed.badge')}</span>` : ''}
              </div>
            </div>
            <span class="fh-lb ${isInst ? 'fh-ib2-launch' : ''}">${escapeHtml(isInst ? t('open') : t('install'))}</span>
          </button>`;
        }).join('')}
      </div>`;
    entries.forEach(([appId]) => refreshAppBadges(appId));
  }

  const scroll = document.querySelector('#home .fh-sc');
  if (scroll) scroll.scrollTop = 0;
}

/** Aktif arama/sekme/kategori durumuna göre görünümü yeniden çizer. */
export function refreshBrowseView() {
  const query = state.searchQuery.trim();
  const countLabel = el('appCountLabel');
  const totalAppsCount = Object.keys(APP_CATALOG).length;

  if (query) {
    const res = searchApps(query);
    if (countLabel) countLabel.textContent = `${res.length} / ${totalAppsCount} ${t('count.apps', { n: '' }).trim()}`;
    renderFilteredList(res, `"${query}" - ${t('section.all')}`, query);
  } else if (state.activeCategory) {
    const res = filterByCategory(state.activeCategory);
    if (countLabel) countLabel.textContent = `${res.length} ${t('count.apps', { n: '' }).trim()}`;
    renderFilteredList(res, t(CATEGORY_LABEL_KEYS[state.activeCategory]));
  } else if (state.activeTab === 'all') {
    if (countLabel) countLabel.textContent = `${totalAppsCount} ${t('count.apps', { n: '' }).trim()}`;
    showDefaultView();
  } else {
    const res = filterByTab(state.activeTab);
    if (countLabel) countLabel.textContent = `${res.length} ${t('count.apps', { n: '' }).trim()}`;
    renderFilteredList(res, t(TAB_LABEL_KEYS[state.activeTab]));
  }
}

/** Ana sayfayı ilk kez kurar: DOM olay dinleyicileri, sekme/kategori/arama bağlama. */
export function initBrowse() {
  const scrollContainer = document.querySelector('#home .fh-sc');
  if (scrollContainer) {
    const defaultView = document.createElement('div');
    defaultView.id = 'defaultView';
    while (scrollContainer.firstChild) {
      defaultView.appendChild(scrollContainer.firstChild);
    }
    scrollContainer.appendChild(defaultView);

    const filteredView = document.createElement('div');
    filteredView.id = 'filteredView';
    filteredView.style.display = 'none';
    scrollContainer.appendChild(filteredView);
  }

  // Ilk açılışta kurulu uygulama tespitini yap
  updateInstalledCache().then(() => {
    renderPopularStrip();
    renderTrendingList();
    refreshBrowseView();
  });

  // Sıralama değişimi dinleyicisi
  const sortSelect = el('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      sortCriterion = sortSelect.value;
      refreshBrowseView();
    });
  }

  document.querySelector('#home').addEventListener('click', (event) => {
    const allLink = event.target.closest('.fh-secl');
    if (!allLink) return;
    event.preventDefault();
    const section = allLink.closest('.fh-sec');
    if (!section) return;
    const sectionKey = section.querySelector('h2')?.getAttribute('data-i18n') || '';
    if (sectionKey === 'section.editors') {
      renderFilteredList(applySorting(appEntries()), t('section.editors'));
    } else if (sectionKey === 'section.popular') {
      renderFilteredList(applySorting(appEntries()), t('section.popular'));
    } else if (sectionKey === 'section.trending') {
      renderFilteredList(applySorting(appEntries()), t('section.trending'));
    }
  });

  const searchInput = el('searchInput') || document.querySelector('.fh-sr input');
  const searchClear = el('searchClear');

  document.querySelectorAll('.fh-tab').forEach((tabEl) => {
    const tabId = tabEl.dataset.tab;
    tabEl.addEventListener('click', async () => {
      document.querySelectorAll('.fh-tab').forEach((t2) => t2.classList.remove('act'));
      tabEl.classList.add('act');
      state.activeTab = tabId;
      state.activeCategory = null;
      state.searchQuery = '';
      if (searchInput) searchInput.value = '';
      if (searchClear) searchClear.style.display = 'none';

      if (tabId === 'installed') {
        await updateInstalledCache();
      }
      refreshBrowseView();
    });
  });

  document.querySelectorAll('.fh-ct').forEach((catEl, index) => {
    catEl.dataset.cat = CATEGORY_ORDER[index];
  });

  document.querySelector('#home .fh-sc').addEventListener('click', (event) => {
    const appCard = event.target.closest('[data-app]');
    if (appCard) {
      event.preventDefault();
      openAppDetail(appCard.dataset.app);
      return;
    }
    const catCard = event.target.closest('.fh-ct');
    if (catCard && catCard.dataset.cat) {
      state.activeCategory = catCard.dataset.cat;
      state.activeTab = 'all';
      state.searchQuery = '';
      if (searchInput) searchInput.value = '';
      if (searchClear) searchClear.style.display = 'none';
      document.querySelectorAll('.fh-tab').forEach((t2, i) => t2.classList.toggle('act', i === 0));
      refreshBrowseView();
    }
  });

  if (searchInput) {
    let searchDebounce = null;
    searchInput.addEventListener('input', () => {
      if (searchClear) {
        searchClear.style.display = searchInput.value ? 'inline-block' : 'none';
      }
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        state.searchQuery = searchInput.value;
        if (state.searchQuery.trim()) state.activeCategory = null;
        refreshBrowseView();
      }, 150);
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      state.searchQuery = '';
      searchClear.style.display = 'none';
      refreshBrowseView();
    });
  }

  const micButton = el('micBtn') || document.querySelector('.fh-sr .ti-microphone');
  if (micButton) {
    micButton.addEventListener('click', () => {
      const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognitionCtor) {
        showToast('isl.voice.unavailable', 'isl.voice.unavailable.sub', undefined, true);
        return;
      }
      const recognizer = new SpeechRecognitionCtor();
      recognizer.lang = { tr: 'tr-TR', ru: 'ru-RU', ja: 'ja-JP', zh: 'zh-CN' }[getCurrentLang()] || 'en-US';
      recognizer.continuous = false;
      recognizer.interimResults = false;
      recognizer.maxAlternatives = 1;
      micButton.style.color = 'var(--p)';
      showToast('isl.listening', 'isl.listening.sub');

      recognizer.onresult = (event) => {
        const transcript = (event.results[0][0].transcript || '').trim();
        if (transcript) {
          if (searchInput) searchInput.value = transcript;
          if (searchClear) searchClear.style.display = 'inline-block';
          state.searchQuery = transcript;
          state.activeCategory = null;
          refreshBrowseView();
          showToast(t('isl.search', { q: transcript.substring(0, 30) + (transcript.length > 30 ? '…' : '') }), '');
        }
      };
      recognizer.onerror = (event) => {
        micButton.style.color = '';
        showToast('isl.voice.error', event.error || 'Unknown', undefined, true);
      };
      recognizer.onend = () => { micButton.style.color = ''; };

      try {
        recognizer.start();
      } catch (err) {
        micButton.style.color = '';
        showToast('isl.voice.error', err.message || 'Unknown', undefined, true);
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    const openModal = document.querySelector('.fh-mo.act');
    if (openModal) {
      openModal.classList.remove('act');
      return;
    }
    if (el('rF')?.classList.contains('show')) {
      el('rF').classList.remove('show');
      return;
    }
    if (el('detail').classList.contains('act')) {
      closeAppDetail();
      return;
    }
    if (state.searchQuery || state.activeCategory || state.activeTab !== 'all') {
      if (searchInput) searchInput.value = '';
      if (searchClear) searchClear.style.display = 'none';
      state.searchQuery = '';
      state.activeCategory = null;
      state.activeTab = 'all';
      document.querySelectorAll('.fh-tab').forEach((t2, i) => t2.classList.toggle('act', i === 0));
      refreshBrowseView();
      if (searchInput) searchInput.blur();
    }
  });

  el('backB').addEventListener('click', closeAppDetail);

  // Uygulama açılışında arka planda kurulu uygulamaları tara ve görünümü güncelle
  updateInstalledCache().then(() => {
    refreshBrowseView();
  });
}
