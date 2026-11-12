/*
 * server.js — Backend The Quran Lens: aktivasi Premium (Mayar + Google Play),
 * konten Premium bertoken, dan "Tanya ustadz AI".
 *
 * Alur Mayar (lihat RENCANA-TRANSAKSI-UJI.md):
 *   1. Pembeli bayar di Mayar → Mayar POST /api/mayar/webhook?token=<MAYAR_WEBHOOK_TOKEN>
 *   2. Server cek token (constant-time; HMAC header juga diterima bila ada),
 *      lalu VERIFIKASI ULANG ke API Mayar (GET /hl/v2/transactions/{id}) — status
 *      harus "paid" dan productId harus terdaftar di MAYAR_PRODUK.
 *   3. Hak akses disimpan (hash order, paket, productId, expiresAt, waktu aktivasi).
 *   4. Pembeli kembali ke app (?aktivasi=1&order=...) atau mengetik Order ID →
 *      POST /api/verify → token sesi bertanda tangan.
 *   5. Konten Premium hanya dari GET /api/premium/episode/:id dengan token itu.
 *
 * ── Endpoint ────────────────────────────────────────────────────────────────
 *   GET  /api/health
 *   POST /api/mayar/webhook            (alias lama: /api/webhook)
 *   POST /api/verify   {order}         (GET ?order= tetap diterima)
 *   POST /api/refresh  {token}
 *   POST /api/reviewer {kode}          akses peninjau (REVIEWER_CODES, bisa dicabut)
 *   GET  /api/premium/episode/:id      Authorization: Bearer <token>
 *   POST /api/play/verify {token, sku} Google Play Billing
 *   POST /api/nahwu/tanya              Tanya ustadz AI (SSE)
 *
 * ── Environment ─────────────────────────────────────────────────────────────
 *   TOKEN_SECRET          WAJIB. Rahasia penanda tangan token sesi.
 *   ORDER_PEPPER          WAJIB. Rahasia hash Order ID (jangan diganti setelah ada data).
 *   MAYAR_WEBHOOK_TOKEN   Token rahasia di URL webhook (?token=...).
 *   MAYAR_WEBHOOK_SECRET  (opsional) HMAC-SHA256 bila kelak Mayar mengirim header tanda tangan.
 *   MAYAR_API_KEY         API key Mayar (akses baca transaksi).
 *   MAYAR_API_BASE        Default https://api.mayar.id/hl/v2 (sandbox: https://api.mayar.io/hl/v2).
 *   MAYAR_PRODUK          JSON peta productId → paket/durasi (lihat lib/akses.js).
 *   MAYAR_PRODUK_FILE     Alternatif: path file JSON yang sama.
 *   MAYAR_STATUS_LUNAS    Default "paid" (dipisah koma).
 *   STORAGE               file (default/dev) | upstash
 *   DATA_FILE             Path file untuk STORAGE=file (default ./data/akses.json)
 *   UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN   untuk STORAGE=upstash
 *   PREMIUM_CONTENT_FILE  Default /etc/secrets/premium-content.json lalu ./data/premium-content.json
 *   REVIEWER_CODES        Kode peninjau dipisah koma (hapus untuk mencabut).
 *   REVIEWER_HARI         Masa berlaku token peninjau (default 30)
 *   TOKEN_TTL_HARI        Umur token sesi (default 7)
 *   ALLOW_ORIGIN          CORS (disarankan https://thequranlensindonesia.com)
 *   STATIC_DIR, PORT, ANTHROPIC_API_KEY, TANYA_PER_JAM, GOOGLE_SA_EMAIL, GOOGLE_SA_KEY, PLAY_PACKAGE_NAME
 */
'use strict';
const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const { buatStore } = require('./lib/storage');
const { buatToken, periksaToken } = require('./lib/token');
const akses = require('./lib/akses');
const mayar = require('./lib/mayar');
const { muatPremium } = require('./lib/premium');

const HARI = 86400000;

function bacaKonfig(env = process.env) {
  const daftar = (s) => String(s || '').split(',').map((x) => x.trim()).filter(Boolean);
  const pepper = env.ORDER_PEPPER || '';
  const cfg = {
    port: parseInt(env.PORT || '8787', 10),
    tokenSecret: env.TOKEN_SECRET || '',
    orderPepper: pepper,
    webhookToken: env.MAYAR_WEBHOOK_TOKEN || '',
    webhookSecret: env.MAYAR_WEBHOOK_SECRET || '',
    apiKey: env.MAYAR_API_KEY || '',
    apiBase: env.MAYAR_API_BASE || 'https://api.mayar.id/hl/v2',
    statusLunas: daftar(env.MAYAR_STATUS_LUNAS || 'paid').map((s) => s.toLowerCase()),
    produk: akses.bacaKonfigProduk(env),
    reviewerHashes: new Set(daftar(env.REVIEWER_CODES).map((k) => akses.hashOrder(pepper || 'dev', 'rev:' + k))),
    reviewerHari: Number(env.REVIEWER_HARI || 30),
    tokenTtlMs: Number(env.TOKEN_TTL_HARI || 7) * HARI,
    premiumFile: env.PREMIUM_CONTENT_FILE || '',
    staticDir: env.STATIC_DIR || '',
    allowOrigin: env.ALLOW_ORIGIN || '*',
  };
  return cfg;
}

/* ─────────────────────────── HTTP helpers ─────────────────────────── */
function kirimJSON(res, status, obj, cfg) {
  const body = status === 204 ? '' : JSON.stringify(obj);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': (cfg && cfg.allowOrigin) || '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Cache-Control': 'no-store',
    'Vary': 'Origin',
  });
  res.end(body);
}

function bacaRawBody(req, maxBytes = 1_000_000) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;
    req.on('data', (c) => {
      total += c.length;
      if (total > maxBytes) { reject(new Error('Body terlalu besar')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function ipDari(req) {
  const xf = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return xf || (req.socket && req.socket.remoteAddress) || '-';
}

// Pembatas laju sederhana di memori (cukup untuk satu instance).
function buatPembatas() {
  const peta = new Map();
  return function izinkan(kunci, batas, jendelaMs, now) {
    const e = peta.get(kunci);
    if (!e || now - e.mulai > jendelaMs) { peta.set(kunci, { mulai: now, n: 1 }); return true; }
    e.n += 1;
    if (peta.size > 5000) peta.clear();
    return e.n <= batas;
  };
}

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.ico': 'image/x-icon' };

function layaniStatic(cfg, req, res, pathname) {
  if (!cfg.staticDir) return false;
  let rel = decodeURIComponent(pathname);
  if (rel === '/' || rel === '') rel = '/index.html';
  const full = path.join(cfg.staticDir, rel);
  if (!full.startsWith(path.resolve(cfg.staticDir))) { kirimJSON(res, 403, { error: 'Terlarang' }, cfg); return true; }
  fs.readFile(full, (err, data) => {
    if (err) { kirimJSON(res, 404, { error: 'Tidak ditemukan' }, cfg); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(full)] || 'application/octet-stream' });
    res.end(data);
  });
  return true;
}

/* ─────────────────────────── Aplikasi ─────────────────────────── */
function buatAplikasi(opsi) {
  const cfg = opsi.cfg;
  const store = opsi.store;
  const fetchImpl = opsi.fetch || globalThis.fetch;
  const now = opsi.now || (() => Date.now());
  const log = opsi.log || ((...a) => console.log(...a));
  const verifyPlay = opsi.verifyPlay || ((t, s) => require('./play-verify').verifyPlaySubscription(t, s));
  const premium = opsi.premium || muatPremium(cfg.premiumFile);
  const tanya = opsi.tanya || require('./nahwu-tanya');
  const izinkan = buatPembatas();
  const pepper = cfg.orderPepper || 'dev';
  const kirim = (res, s, o) => kirimJSON(res, s, o, cfg);
  const pendek = (oh) => String(oh).slice(0, 10);

  function terbitkan(res, rec) {
    const exp = rec.expiresAt ? Date.parse(rec.expiresAt) : null;
    const { token, payload } = buatToken(cfg.tokenSecret, { s: rec.s, oh: rec.oh, paket: rec.paket, exp }, { now: now(), ttlMs: cfg.tokenTtlMs });
    return kirim(res, 200, { active: true, paket: rec.paket, expiresAt: rec.expiresAt || null, token, tokenExp: payload.te });
  }

  async function cariRekaman(order) {
    const oh = akses.hashOrder(pepper, order);
    let rec = await store.get('ent:' + oh);
    if (!rec) {
      const al = await store.get('alias:' + oh);
      if (al && al.oh) rec = await store.get('ent:' + al.oh);
    }
    return rec;
  }

  // Aktivasi dari transaksi Mayar; selalu diverifikasi ulang ke API Mayar.
  async function aktivasiMayar(txId, petunjuk = {}) {
    const oh = akses.hashOrder(pepper, txId);
    const ada = await store.get('ent:' + oh);
    if (ada) return { rec: ada, duplikat: true };
    const t = await mayar.ambilTransaksi(txId, cfg, fetchImpl);
    if (!t.ditemukan) return { gagal: t.alasan };
    const d = t.data;
    if (akses.normalOrder(d.id) !== akses.normalOrder(txId)) return { gagal: 'id-tidak-cocok' };
    const status = String(d.status || '').toLowerCase();
    if (!cfg.statusLunas.includes(status)) return { gagal: 'belum-lunas', status };
    const productId = (d.paymentLink && d.paymentLink.id) || petunjuk.productId || null;
    if (petunjuk.productId && d.paymentLink && d.paymentLink.id &&
        String(petunjuk.productId).toLowerCase() !== String(d.paymentLink.id).toLowerCase()) {
      return { gagal: 'produk-tidak-cocok' };
    }
    const plan = akses.tentukanPaket(cfg.produk, productId, d.amount, log);
    if (!plan) { log(`[aktivasi] ditolak: produk ${productId} tidak terdaftar di MAYAR_PRODUK`); return { gagal: 'produk-tidak-dikenal' }; }
    const n = now();
    let mulai = Number(d.updatedAt) || n;
    if (mulai > n || mulai < n - 400 * HARI) mulai = n;
    const rec = {
      v: 1, oh, s: 'mayar', paket: plan.paket, bulan: plan.bulan, productId,
      aktifSejak: new Date(mulai).toISOString(), expiresAt: akses.hitungExpiry(mulai, plan.bulan), via: plan.via,
    };
    const tersimpan = await store.put('ent:' + oh, rec, { nx: true });
    if (!tersimpan) return { rec: await store.get('ent:' + oh), duplikat: true };
    if (d.invoiceCode) await store.put('alias:' + akses.hashOrder(pepper, d.invoiceCode), { oh }, { nx: true });
    log(`[aktivasi] ${pendek(oh)} → ${rec.paket} (via ${plan.via}, s/d ${rec.expiresAt || 'seumur hidup'})`);
    return { rec, baru: true };
  }

  // Masih berhak? (dipakai refresh & konten)
  async function masihBerhak(p) {
    if (p.s === 'reviewer') return cfg.reviewerHashes.has(p.oh);
    const rec = await store.get('ent:' + p.oh);
    return akses.masihAktif(rec, now());
  }

  function tokenDari(req) {
    const h = String(req.headers.authorization || '');
    return h.toLowerCase().startsWith('bearer ') ? h.slice(7).trim() : '';
  }

  async function bacaJSON(req, max) {
    const raw = await bacaRawBody(req, max);
    try { return JSON.parse(raw || '{}'); } catch (e) { return null; }
  }

  return async function handler(req, res) {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const { pathname } = url;
    const ip = ipDari(req);
    try {
      if (req.method === 'OPTIONS') return kirim(res, 204, {});

      if (req.method === 'GET' && pathname === '/api/health') {
        return kirim(res, 200, {
          ok: true, service: 'quran-lens', tanya: tanya.aktif(), storage: store.jenis,
          premium: premium.jumlah > 0, time: new Date(now()).toISOString(),
        });
      }

      if (req.method === 'POST' && (pathname === '/api/mayar/webhook' || pathname === '/api/webhook')) {
        if (!izinkan('wh:' + ip, 120, 60000, now())) return kirim(res, 429, { error: 'terlalu banyak' });
        let raw;
        try { raw = await bacaRawBody(req); } catch (e) { return kirim(res, 413, { error: e.message }); }
        const cek = mayar.autentikasiWebhook({ tokenUrl: url.searchParams.get('token'), headers: req.headers, raw }, cfg);
        if (!cek.ok) { log('[webhook] ditolak:', cek.alasan); return kirim(res, cek.kode, { error: 'Tidak diizinkan' }); }
        let evt;
        try { evt = JSON.parse(raw); } catch (e) { return kirim(res, 400, { error: 'Body bukan JSON valid' }); }
        if (evt && evt.event === 'testing') return kirim(res, 200, { ok: true, note: 'testing' });
        if (!evt || evt.event !== 'payment.received') return kirim(res, 200, { ok: true, note: 'event diabaikan' });
        const txId = mayar.idTransaksiDariWebhook(evt);
        if (!txId) return kirim(res, 200, { ok: true, note: 'tanpa id transaksi' });
        try {
          const h = await aktivasiMayar(txId, { productId: evt.data && evt.data.productId });
          if (h.gagal) { log('[webhook] tidak diaktifkan:', h.gagal); return kirim(res, 200, { ok: true, status: 'tidak-diaktifkan', alasan: h.gagal }); }
          return kirim(res, 200, { ok: true, status: h.duplikat ? 'sudah-aktif' : 'aktif' });
        } catch (e) {
          log('[webhook] gagal sementara:', e.message);
          return kirim(res, e.kode === 503 ? 503 : 502, { error: 'Gagal sementara, coba lagi' });
        }
      }

      if ((req.method === 'POST' || req.method === 'GET') && pathname === '/api/verify') {
        if (!izinkan('vf:' + ip, 20, 10 * 60000, now())) return kirim(res, 429, { active: false, error: 'terlalu-banyak-percobaan' });
        let order = url.searchParams.get('order') || '';
        if (req.method === 'POST') { const b = await bacaJSON(req, 10000); order = (b && b.order) || order; }
        order = String(order || '').trim();
        if (order.length < 4 || order.length > 200) return kirim(res, 400, { active: false, error: 'order-tidak-valid' });
        let rec = await cariRekaman(order);
        if (!rec && mayar.UUID_RE.test(order)) {
          try {
            const h = await aktivasiMayar(order);
            if (h.gagal) return kirim(res, 200, { active: false, alasan: h.gagal });
            rec = h.rec;
          } catch (e) {
            log('[verify] Mayar tidak terjangkau:', e.message);
            return kirim(res, 503, { active: false, error: 'coba-lagi' });
          }
        }
        if (!rec) return kirim(res, 200, { active: false, alasan: 'tidak-ditemukan' });
        if (!akses.masihAktif(rec, now())) return kirim(res, 200, { active: false, alasan: 'kedaluwarsa', expiresAt: rec.expiresAt || null });
        return terbitkan(res, rec);
      }

      if (req.method === 'POST' && pathname === '/api/refresh') {
        if (!izinkan('rf:' + ip, 60, 10 * 60000, now())) return kirim(res, 429, { active: false, error: 'terlalu-banyak' });
        const b = await bacaJSON(req, 5000);
        const cek = periksaToken(cfg.tokenSecret, b && b.token, { now: now(), graceMs: 30 * HARI });
        if (!cek.ok) return kirim(res, cek.alasan === 'hak-kedaluwarsa' ? 403 : 401, { active: false, alasan: cek.alasan });
        const p = cek.payload;
        if (!(await masihBerhak(p))) return kirim(res, 403, { active: false, alasan: 'dicabut-atau-kedaluwarsa' });
        if (p.s === 'reviewer') return terbitkan(res, { s: 'reviewer', oh: p.oh, paket: p.paket, expiresAt: p.exp ? new Date(p.exp).toISOString() : null });
        return terbitkan(res, await store.get('ent:' + p.oh));
      }

      if (req.method === 'POST' && pathname === '/api/reviewer') {
        if (!izinkan('rv:' + ip, 10, 10 * 60000, now())) return kirim(res, 429, { active: false, error: 'terlalu-banyak' });
        const b = await bacaJSON(req, 2000);
        const kode = String((b && b.kode) || '').trim();
        const oh = akses.hashOrder(pepper, 'rev:' + kode);
        if (!kode || !cfg.reviewerHashes.has(oh)) return kirim(res, 401, { active: false });
        const exp = new Date(now() + cfg.reviewerHari * HARI).toISOString();
        return terbitkan(res, { s: 'reviewer', oh, paket: 'Peninjau', expiresAt: exp });
      }

      const m = pathname.match(/^\/api\/premium\/episode\/([a-z0-9-]{1,80})$/);
      if (req.method === 'GET' && m) {
        const cek = periksaToken(cfg.tokenSecret, tokenDari(req), { now: now() });
        if (!cek.ok) return kirim(res, 401, { error: 'token-tidak-valid', alasan: cek.alasan });
        let berhak;
        try { berhak = await masihBerhak(cek.payload); } catch (e) {
          log('[premium] storage error, pakai token bertanda tangan:', e.message);
          berhak = true; // token berumur pendek & bertanda tangan
        }
        if (!berhak) return kirim(res, 403, { error: 'akses-dicabut-atau-kedaluwarsa' });
        const isi = premium.episode[m[1]];
        if (!isi) return kirim(res, 404, { error: 'episode-tidak-ditemukan' });
        return kirim(res, 200, { id: m[1], versi: premium.versi, data: isi });
      }

      if (req.method === 'POST' && pathname === '/api/play/verify') {
        if (!izinkan('pl:' + ip, 30, 10 * 60000, now())) return kirim(res, 429, { active: false, error: 'terlalu-banyak' });
        const b = await bacaJSON(req, 10000);
        if (!b || !b.token || !b.sku) return kirim(res, 400, { active: false, error: 'token & sku wajib' });
        let r;
        try { r = await verifyPlay(String(b.token), String(b.sku)); } catch (e) {
          log('[play] verifikasi gagal:', e.message);
          return kirim(res, 502, { active: false, error: 'coba-lagi' });
        }
        if (!r || !r.active) return kirim(res, 200, { active: false, error: r && r.error });
        const oh = akses.hashOrder(pepper, 'PLAY:' + b.token);
        const lama = await store.get('ent:' + oh);
        const rec = {
          v: 1, oh, s: 'play', paket: r.paket, bulan: null, productId: String(b.sku),
          aktifSejak: (lama && lama.aktifSejak) || new Date(now()).toISOString(), expiresAt: r.expiresAt || null, via: 'play',
        };
        await store.put('ent:' + oh, rec);
        return terbitkan(res, rec);
      }

      if (req.method === 'POST' && pathname === '/api/nahwu/tanya') {
        let raw;
        try { raw = await bacaRawBody(req, tanya.MAX_BODY); } catch (e) { return kirim(res, 413, { code: 'too_large' }); }
        return tanya.handle(req, res, raw, { allowOrigin: cfg.allowOrigin, kirimJSON: (r, s, o) => kirimJSON(r, s, o, cfg) });
      }

      if (req.method === 'GET' && layaniStatic(cfg, req, res, pathname)) return;
      return kirim(res, 404, { error: 'Rute tidak ditemukan' });
    } catch (e) {
      log('[server] galat:', e.message);
      if (!res.headersSent) return kirim(res, 500, { error: 'galat-server' });
    }
  };
}

function mulai() {
  const cfg = bacaKonfig();
  const produksi = process.env.NODE_ENV === 'production' || !!process.env.RENDER;
  const kurang = [];
  if (!cfg.tokenSecret) kurang.push('TOKEN_SECRET');
  if (!cfg.orderPepper) kurang.push('ORDER_PEPPER');
  if (kurang.length && produksi) {
    console.error('❌ Env wajib belum di-set: ' + kurang.join(', ') + '. Server tidak dijalankan.');
    process.exit(1);
  }
  if (!cfg.tokenSecret) cfg.tokenSecret = crypto.randomBytes(32).toString('hex');
  const store = buatStore(process.env);
  const premium = muatPremium(cfg.premiumFile);
  const app = buatAplikasi({ cfg, store, premium });
  http.createServer(app).listen(cfg.port, () => {
    console.log(`The Quran Lens server di http://localhost:${cfg.port} (storage: ${store.jenis}, konten premium: ${premium.jumlah} episode)`);
    if (produksi && store.jenis === 'file' && !process.env.DATA_FILE) console.warn('⚠️  STORAGE=file tanpa disk persisten: hak akses HILANG saat restart. Pakai STORAGE=upstash.');
    if (!cfg.webhookToken && !cfg.webhookSecret) console.warn('⚠️  MAYAR_WEBHOOK_TOKEN belum di-set — webhook menolak semua request.');
    if (!cfg.apiKey) console.warn('⚠️  MAYAR_API_KEY belum di-set — aktivasi Mayar tidak bisa diverifikasi.');
    if (!Object.keys(cfg.produk).length) console.warn('⚠️  MAYAR_PRODUK kosong — semua transaksi Mayar akan ditolak.');
    if (!premium.jumlah) console.warn('⚠️  Konten premium tidak ditemukan (PREMIUM_CONTENT_FILE).');
  });
}

if (require.main === module) mulai();

module.exports = { buatAplikasi, bacaKonfig };
