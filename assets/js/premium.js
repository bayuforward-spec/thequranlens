/*
 * premium.js — Klien aktivasi & konten Premium (server-side gating).
 *
 * - Token sesi bertanda tangan diterbitkan server (/api/verify, /api/reviewer,
 *   /api/play/verify) dan disimpan di localStorage (Store.setPro).
 * - Lapisan Premium tiap episode diambil dari /api/premium/episode/:id dengan
 *   header Authorization: Bearer <token>; tidak ada di content.js publik.
 * - Token diperiksa ulang ke server tiap ±24 jam (/api/refresh) dan saat hampir
 *   kedaluwarsa; hak yang sudah lewat expiresAt dihapus dari perangkat.
 * - Server Render (paket gratis) bisa "tidur": request pertama dicoba ulang dengan
 *   jeda dan pesan ramah, total hingga ±75 detik.
 */
const Premium = {
  CEK_ULANG_MS: 24 * 3600 * 1000,
  _cache: {},
  _antre: {},

  apiBase() { return (window.Payment && Payment.CONFIG && Payment.CONFIG.apiBase) || ''; },
  aktif() { return !!this.apiBase(); },

  async api(path, { method = 'GET', body, token, onLambat } = {}) {
    const base = this.apiBase();
    if (!base) throw Object.assign(new Error('backend-nonaktif'), { kode: 0 });
    const jeda = [0, 4000, 10000, 20000];
    let terakhir;
    for (let i = 0; i < jeda.length; i++) {
      if (jeda[i]) {
        if (i === 1 && typeof onLambat === 'function') onLambat();
        await new Promise((r) => setTimeout(r, jeda[i]));
      }
      const ctl = typeof AbortController === 'function' ? new AbortController() : null;
      const t = ctl ? setTimeout(() => ctl.abort(), 25000) : null;
      try {
        const headers = {};
        if (body) headers['Content-Type'] = 'application/json';
        if (token) headers.Authorization = 'Bearer ' + token;
        const r = await fetch(base + path, { method, headers, body: body ? JSON.stringify(body) : undefined, signal: ctl ? ctl.signal : undefined });
        // 502/503/504 = server sedang bangun atau gangguan sementara → coba lagi
        if ([502, 503, 504].includes(r.status) && i < jeda.length - 1) { terakhir = new Error('http-' + r.status); continue; }
        const j = await r.json().catch(() => ({}));
        return { status: r.status, data: j };
      } catch (e) {
        terakhir = e;
      } finally {
        if (t) clearTimeout(t);
      }
    }
    throw Object.assign(terakhir || new Error('jaringan'), { kode: 'jaringan' });
  },

  simpan(hasil, order) {
    const d = hasil || {};
    return Store.setPro(d.paket, order || '-', { token: d.token, tokenExp: d.tokenExp, expiresAt: d.expiresAt || null });
  },

  // → { active, paket, expiresAt, alasan }
  async verifikasiOrder(order, onLambat) {
    try {
      const { data } = await this.api('/api/verify', { method: 'POST', body: { order }, onLambat });
      if (data && data.active && data.token) { this.simpan(data, order); return data; }
      return { active: false, alasan: (data && (data.alasan || data.error)) || 'tidak-ditemukan' };
    } catch (e) {
      return { active: false, alasan: e.kode === 0 ? 'backend-nonaktif' : 'jaringan' };
    }
  },

  async peninjau(kode, onLambat) {
    try {
      const { data } = await this.api('/api/reviewer', { method: 'POST', body: { kode }, onLambat });
      if (data && data.active && data.token) { this.simpan(data, 'PENINJAU'); return true; }
    } catch (e) {}
    return false;
  },

  // Periksa ulang hak ke server bila sudah ±24 jam atau token hampir habis.
  async periksaUlang(paksa) {
    const p = Store.proMentah();
    if (!p) return;
    const now = Date.now();
    // Data lama (sebelum token) dengan Order ID asli: coba migrasikan sekali.
    if (!p.token) {
      if (p.order && !/^(DEMO|TASHIH|PLAY|-)/i.test(p.order)) await this.verifikasiOrder(p.order);
      else Store.clearPro();
      return;
    }
    const perlu = paksa || !p.cek || now - p.cek > this.CEK_ULANG_MS || (p.tokenExp && p.tokenExp - now < 2 * 86400000);
    if (!perlu) return;
    try {
      const { status, data } = await this.api('/api/refresh', { method: 'POST', body: { token: p.token } });
      if (data && data.active && data.token) { this.simpan(data, p.order); return; }
      if (status === 401 || status === 403) {
        // Token tidak berlaku lagi: coba Order ID (mis. TOKEN_SECRET diganti), selain itu cabut.
        if (p.order && !/^(PENINJAU|PLAY|-)/i.test(p.order)) {
          const h = await this.verifikasiOrder(p.order);
          if (h.active) return;
        }
        Store.clearPro();
        this._cache = {};
      }
    } catch (e) { /* luring: tetap pakai token sampai tokenExp */ }
  },

  sudahDimuat(id) { return !!this._cache[id]; },

  // Ambil lapisan Premium satu episode lalu gabungkan ke objek AYAT.
  muat(id) {
    if (this._cache[id]) return Promise.resolve(true);
    if (this._antre[id]) return this._antre[id];
    const p = Store.isPro();
    if (!p || !p.token) return Promise.resolve(false);
    this._antre[id] = this.api('/api/premium/episode/' + encodeURIComponent(id), { token: p.token })
      .then(({ status, data }) => {
        if (status === 200 && data && data.data) {
          const a = (typeof cariAyat === 'function') ? cariAyat(id) : null;
          if (a) Object.assign(a, data.data);
          this._cache[id] = true;
          return true;
        }
        if (status === 401 || status === 403) return this.periksaUlang(true).then(() => false);
        return false;
      })
      .catch(() => false)
      .finally(() => { delete this._antre[id]; });
    return this._antre[id];
  },
};
window.Premium = Premium;
