/*
 * analytics.js — Analitik kunjungan (GA4) + atribusi UTM.
 *
 * Tanpa Measurement ID yang valid, modul ini tidak memuat gtag dan tidak
 * menghubungi Google. ID dibaca dari window.QL_GA_MEASUREMENT_ID (ga-config.js),
 * bukan diketik di sini.
 *
 * First-touch dan last-touch (utm_*, perujuk, halaman masuk) disimpan di
 * perangkat selama 90 hari, lalu dilampirkan ke peristiwa konversi.
 * Tidak ada iklan, remarketing, Google Signals, atau personalisasi iklan.
 *
 * Debug (tidak mengirim apa pun ekstra ke server kami): buka URL dengan
 * ?analytics_debug=1 — peristiwa tercatat di konsol sebagai [analytics]
 * dan di window.__analyticsLog.
 */
const Analytics = {
  KEY: 'quranlens_attr',
  DEBUG_KEY: 'quranlens_analytics_debug',
  TTL_MS: 90 * 24 * 60 * 60 * 1000,
  ID_RE: /^G-[A-Z0-9]{4,}$/,
  UTM: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'],

  /* ---------- Init ---------- */
  init() {
    if (this._inited) return;
    this._inited = true;
    this._seen = {};
    try { this.readDebugFlag(); } catch (e) { this.debug = false; }
    try { this.capture(); } catch (e) {}
    try { this.mountGtag(); } catch (e) {}
    try { this.bindOutbound(); } catch (e) {}
    if (this.debug) {
      const s = this.read();
      this.trace('atribusi', {
        ft_source: (s && s.first && s.first.utm_source) || '',
        lt_source: (s && s.last && s.last.utm_source) || '',
      });
    }
  },

  readDebugFlag() {
    const q = new URLSearchParams(location.search).get('analytics_debug');
    try {
      if (q === '1') sessionStorage.setItem(this.DEBUG_KEY, '1');
      if (q === '0') sessionStorage.removeItem(this.DEBUG_KEY);
      this.debug = sessionStorage.getItem(this.DEBUG_KEY) === '1';
    } catch (e) {
      this.debug = q === '1';
    }
  },

  measurementId() {
    const id = String((window && window.QL_GA_MEASUREMENT_ID) || '').trim();
    return this.ID_RE.test(id) ? id : '';
  },

  /* ---------- GA4 (hanya bila ID valid) ---------- */
  mountGtag() {
    const id = this.measurementId();
    if (!id) {
      this.trace('ga_status', { active: '0', page_view: 'nonaktif' });
      return;
    }
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== 'function') {
      window.gtag = function () { window.dataLayer.push(arguments); };
    }
    const page = this.pageLocation();
    window.gtag('js', new Date());
    // Matikan fitur iklan sebelum config diproses. Analitik saja.
    window.gtag('set', 'allow_google_signals', false);
    window.gtag('set', 'allow_ad_personalization_signals', false);
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'granted',
    });
    const cfg = {
      send_page_view: true,
      page_location: page,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      anonymize_ip: true,
      cookie_expires: 90 * 24 * 60 * 60,
      cookie_flags: location.protocol === 'https:' ? 'SameSite=Lax;Secure' : 'SameSite=Lax',
    };
    if (document.referrer) cfg.page_referrer = document.referrer;
    if (this.debug) cfg.debug_mode = true;
    window.gtag('config', id, cfg);
    this.trace('ga_status', { active: '1', page_view: 'otomatis' });

    if (document.getElementById && document.getElementById('ql-gtag')) return;
    const s = document.createElement('script');
    s.async = true;
    s.id = 'ql-gtag';
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    const parent = document.head || document.documentElement;
    if (parent) parent.appendChild(s);
  },

  pageLocation() {
    try {
      const u = new URL(location.href);
      u.searchParams.delete('analytics_debug');
      return u.toString();
    } catch (e) {
      return location.href;
    }
  },

  /* ---------- Atribusi 90 hari ---------- */
  clean(value, max) {
    return String(value || '')
      .replace(/[\u0000-\u001F\u007F<>]/g, '')
      .trim()
      .slice(0, max);
  },

  externalReferrer() {
    const raw = document.referrer || '';
    if (!raw) return '';
    try {
      const u = new URL(raw);
      if (u.hostname === location.hostname) return '';
      return this.clean(u.origin + u.pathname, 300);
    } catch (e) {
      return '';
    }
  },

  landingPage() {
    try {
      const q = new URLSearchParams(location.search);
      q.delete('analytics_debug');
      const s = q.toString();
      const path = location.pathname || '/';
      return this.clean(path + (s ? '?' + s : ''), 300);
    } catch (e) {
      return this.clean(location.pathname || '/', 300);
    }
  },

  touchFromLocation() {
    const q = new URLSearchParams(location.search);
    const touch = { referrer: this.externalReferrer(), landing_page: this.landingPage(), ts: Date.now() };
    let any = false;
    this.UTM.forEach((k) => {
      const v = this.clean(q.get(k) || '', 120);
      touch[k] = v;
      if (v) any = true;
    });
    touch._any = any;
    return touch;
  },

  capture() {
    const now = this.touchFromLocation();
    const any = now._any;
    delete now._any;
    let store = this.read();
    if (!store) {
      const ts = now.ts;
      store = { v: 1, exp: ts + this.TTL_MS, first: now, last: now };
      this.write(store);
      return store;
    }
    if (any) {
      store.last = now;
      this.write(store);
    }
    return store;
  },

  read() {
    const raw = this.storageGet();
    if (!raw) return null;
    try {
      const data = JSON.parse(raw);
      if (!data || !data.first || !data.last || !data.exp) return null;
      if (Date.now() > data.exp) return null;
      return data;
    } catch (e) {
      return null;
    }
  },

  write(data) {
    try { this.storageSet(JSON.stringify(data)); } catch (e) {}
  },

  storageGet() {
    try {
      if (typeof localStorage !== 'undefined') {
        const v = localStorage.getItem(this.KEY);
        if (v) return v;
      }
    } catch (e) { /* mode pribadi: lanjut ke cookie */ }
    return this.cookieGet(this.KEY);
  },

  storageSet(val) {
    try {
      localStorage.setItem(this.KEY, val);
      return;
    } catch (e) {}
    this.cookieSet(this.KEY, val);
  },

  cookieGet(name) {
    const all = String((document && document.cookie) || '');
    const prefix = name + '=';
    const parts = all.split(';');
    for (let i = 0; i < parts.length; i++) {
      const s = parts[i].trim();
      if (s.indexOf(prefix) === 0) {
        try { return decodeURIComponent(s.slice(prefix.length)); } catch (e) { return ''; }
      }
    }
    return '';
  },

  cookieSet(name, val) {
    const maxAge = Math.floor(this.TTL_MS / 1000);
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = name + '=' + encodeURIComponent(val) + '; Path=/; Max-Age=' + maxAge + '; SameSite=Lax' + secure;
  },

  attributionParams() {
    const store = this.read();
    const out = {};
    if (!store) return out;
    this.flatten('ft_', store.first, out);
    this.flatten('lt_', store.last, out);
    return out;
  },

  flatten(prefix, touch, out) {
    if (!touch) return;
    const map = {
      utm_source: 'source',
      utm_medium: 'medium',
      utm_campaign: 'campaign',
      utm_content: 'content',
      utm_term: 'term',
      referrer: 'referrer',
      landing_page: 'landing',
    };
    Object.keys(map).forEach((k) => {
      if (!touch[k]) return;
      out[prefix + map[k]] = String(touch[k]).slice(0, 100);
    });
  },

  pack(extra) {
    const out = {};
    const src = extra || {};
    Object.keys(src).forEach((k) => {
      const v = src[k];
      if (v === undefined || v === null || v === '') return;
      out[k] = String(v).slice(0, 100);
    });
    return out;
  },

  /* ---------- Peristiwa ---------- */
  trace(name, params) {
    if (!this.debug) return;
    try {
      window.__analyticsLog = window.__analyticsLog || [];
      window.__analyticsLog.push({ name: name, params: params || {} });
      if (window.__analyticsLog.length > 80) window.__analyticsLog.shift();
    } catch (e) {}
    try { console.info('[analytics]', name, params || ''); } catch (e) {}
  },

  event(name, extra) {
    try {
      const params = Object.assign(this.attributionParams(), this.pack(extra));
      this.trace(name, params);
      if (this.measurementId() && typeof window.gtag === 'function') window.gtag('event', name, params);
    } catch (e) {}
  },

  eventOnce(key, name, extra) {
    this._seen = this._seen || {};
    if (this._seen[key]) return;
    this._seen[key] = true;
    this.event(name, extra);
  },

  episodeFields(ayat) {
    if (!ayat) return {};
    const latins = Array.isArray(ayat.kajianKata)
      ? ayat.kajianKata.map((k) => (k && k.latin) || '').filter(Boolean)
      : [];
    const fields = {
      episode_id: this.clean(ayat.id, 100),
      surah: this.clean(ayat.surah, 80),
      ayat: this.clean(ayat.ayatNo, 40),
      gratis: ayat.gratis ? '1' : '0',
    };
    if (latins.length) fields.kata = latins.join(', ').slice(0, 100);
    return fields;
  },

  episodeRead(ayat) {
    this.event('episode_read', this.episodeFields(ayat));
  },

  planFor(paket) {
    return /tahun/i.test(String(paket || '')) ? 'yearly' : 'monthly';
  },

  /* Salin UTM last-touch ke URL checkout Mayar. Mayar menyimpan param yang
   * didaftarkan di produk → Track → URL Param (utm_* dan plan). */
  decorateMayar(url, paket) {
    let u;
    try { u = new URL(url); } catch (e) { return url; }
    const store = this.read();
    const touch = (store && store.last) || {};
    this.UTM.forEach((k) => { if (touch[k]) u.searchParams.set(k, touch[k]); });
    u.searchParams.set('plan', this.planFor(paket));
    return u.toString();
  },

  watchPremium(el, surface) {
    if (!el || typeof IntersectionObserver !== 'function') return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        this.eventOnce('premium:' + surface, 'premium_view', { surface: surface });
        io.disconnect();
      }
    }, { threshold: 0 });
    io.observe(el);
  },

  /* ---------- Klik keluar ke kanal ---------- */
  platformOf(hostname) {
    const h = String(hostname || '').toLowerCase().replace(/^www\./, '');
    if (h === 'youtu.be' || h === 'youtube.com' || h.endsWith('.youtube.com')) return 'youtube';
    if (h === 'instagram.com' || h.endsWith('.instagram.com')) return 'instagram';
    if (h === 'tiktok.com' || h.endsWith('.tiktok.com')) return 'tiktok';
    return '';
  },

  bindOutbound() {
    if (this._outbound) return;
    this._outbound = true;
    document.addEventListener('click', (e) => this.onOutboundClick(e), true);
  },

  onOutboundClick(e) {
    const t = e.target;
    if (!t || !t.closest) return;
    const a = t.closest('a[href]');
    if (!a) return;
    let url;
    try { url = new URL(a.href, location.href); } catch (err) { return; }
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
    const platform = this.platformOf(url.hostname);
    if (!platform) return;
    this.event('outbound_' + platform, {
      link_url: (url.origin + url.pathname + url.search).slice(0, 100),
    });
  },
};

window.Analytics = Analytics;
