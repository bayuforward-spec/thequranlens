/*
 * server.js — Backend verifikasi langganan The Quran Lens (Mayar).
 *
 * Tujuan: menutup celah bypass pada gating sisi-klien. Status Premium pembeli
 * hanya valid bila TERCATAT di server melalui webhook Mayar yang terverifikasi
 * tanda tangannya. Order ID palsu tidak akan ditemukan -> akses ditolak.
 *
 * Tanpa dependensi (hanya modul bawaan Node >= 18). Penyimpanan: file JSON
 * sederhana (cukup untuk awal; ganti ke database bila skala bertambah).
 *
 * ── Endpoint ────────────────────────────────────────────────────────────────
 *   POST /api/mayar/webhook    Terima event Mayar (signature diverifikasi)
 *   GET  /api/verify?order=ID   Cek status langganan sebuah Order ID
 *   GET  /api/health            Health check
 *   (opsional) static files     Melayani aplikasi bila STATIC_DIR di-set
 *
 * ── Konfigurasi (environment variables) ─────────────────────────────────────
 *   PORT                     Default 8787
 *   MAYAR_WEBHOOK_SECRET     Secret untuk verifikasi tanda tangan webhook Mayar
 *   MAYAR_SIGNATURE_HEADER   Kandidat nama header tanda tangan (dipisah koma)
 *   MAYAR_WEBHOOK_DEBUG      'true' = log header+body & lewati verifikasi (1x tes saja)
 *   TOKEN_SECRET             Secret untuk menandatangani token verifikasi ke klien
 *   DATA_FILE                Lokasi file penyimpanan (default ./data/subs.json)
 *   STATIC_DIR               Folder aplikasi statis untuk dilayani (opsional)
 *   ALLOW_ORIGIN             Nilai CORS Access-Control-Allow-Origin (default '*')
 *
 * CATATAN: Nama field/header pasti Mayar dikonfirmasi dari 1 transaksi tes
 * (set MAYAR_WEBHOOK_DEBUG=true, lihat log, lalu matikan). normalizeEvent() &
 * verifyMayar() dibuat toleran terhadap beberapa kemungkinan nama.
 */
'use strict';
const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const CFG = {
  port: parseInt(process.env.PORT || '8787', 10),
  // Mayar (https://mayar.id) — secret webhook & kandidat header tanda tangan.
  mayarSecret: process.env.MAYAR_WEBHOOK_SECRET || '',
  mayarSigHeaders: (process.env.MAYAR_SIGNATURE_HEADER || 'x-callback-token,x-mayar-signature,x-signature,signature')
    .toLowerCase().split(',').map((s) => s.trim()).filter(Boolean),
  // Mode debug: log header+body webhook & lewati verifikasi — HANYA untuk 1x transaksi tes.
  webhookDebug: process.env.MAYAR_WEBHOOK_DEBUG === 'true',
  tokenSecret: process.env.TOKEN_SECRET || 'ganti-rahasia-token-ini',
  dataFile: process.env.DATA_FILE || path.join(__dirname, 'data', 'subs.json'),
  staticDir: process.env.STATIC_DIR || '',
  allowOrigin: process.env.ALLOW_ORIGIN || '*',
};

/* ─────────────────────────── Penyimpanan (JSON) ─────────────────────────── */
const Store = {
  load() {
    try { return JSON.parse(fs.readFileSync(CFG.dataFile, 'utf8')); }
    catch { return { orders: {} }; }
  },
  save(db) {
    fs.mkdirSync(path.dirname(CFG.dataFile), { recursive: true });
    fs.writeFileSync(CFG.dataFile, JSON.stringify(db, null, 2));
  },
  upsert(record) {
    const db = this.load();
    db.orders[record.order] = { ...db.orders[record.order], ...record, updatedAt: new Date().toISOString() };
    this.save(db);
    return db.orders[record.order];
  },
  get(order) { return this.load().orders[order] || null; },
};

/* ─────────────────────────── Util keamanan ─────────────────────────── */
// Bandingkan tanda tangan secara timing-safe
function signaturesMatch(a, b) {
  const ba = Buffer.from(a || '', 'utf8');
  const bb = Buffer.from(b || '', 'utf8');
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

/*
 * Verifikasi webhook Mayar. Karena dokumentasi header bisa berbeda, kita toleran:
 * cocokkan nilai header kandidat terhadap (a) HMAC-SHA256 hex dari raw body, atau
 * (b) token apa adanya (sebagian penyedia mengirim secret langsung sebagai token).
 * Header pasti akan dikonfirmasi dari log transaksi tes (MAYAR_WEBHOOK_DEBUG=true).
 */
function verifyMayar(rawBody, headers) {
  if (!CFG.mayarSecret) return { ok: false, reason: 'MAYAR_WEBHOOK_SECRET belum di-set' };
  const expectedHmac = crypto.createHmac('sha256', CFG.mayarSecret).update(rawBody).digest('hex');
  for (const h of CFG.mayarSigHeaders) {
    const val = headers[h];
    if (!val) continue;
    const provided = String(val).replace(/^sha256=/i, '').trim();
    if (signaturesMatch(provided, expectedHmac)) return { ok: true, via: `hmac:${h}` };
    if (signaturesMatch(provided, CFG.mayarSecret)) return { ok: true, via: `token:${h}` };
  }
  return { ok: false, reason: 'Tidak ada header tanda tangan yang cocok' };
}

// Token verifikasi yang dikirim ke klien (boleh disimpan klien sebagai bukti)
function buatToken(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', CFG.tokenSecret).update(body).digest('base64url');
  return `${body}.${sig}`;
}

/* ─────────────────────────── Normalisasi event Scalev ─────────────────────────── */
// Map slug paket -> nama paket aplikasi
const PLAN_SLUG = { bulanan: 'Bulanan', tahunan: 'Tahunan', 'seumur-hidup': 'Seumur Hidup' };
// Berapa lama satu paket aktif (hari). null = selamanya.
const PLAN_DURASI = { 'Bulanan': 31, 'Tahunan': 366, 'Seumur Hidup': null };

// Ambil nilai pertama yang ada dari beberapa kemungkinan nama field
function pick(obj, keys) {
  for (const k of keys) {
    if (obj && obj[k] !== undefined && obj[k] !== null && obj[k] !== '') return obj[k];
  }
  return undefined;
}

/*
 * Ubah payload mentah Scalev menjadi catatan langganan baku.
 * TODO(Scalev): sesuaikan nama field di bawah dengan payload resmi Scalev Anda.
 */
function normalizeEvent(evt) {
  const data = evt.data || evt.order || evt || {};
  const order = pick(data, ['order_id', 'orderId', 'id', 'transactionId', 'transaction_id', 'merchantInvoiceId', 'order_number', 'invoice_id']);
  if (!order) return null;

  const statusRaw = String(pick(data, ['status', 'payment_status', 'state']) || '').toLowerCase();
  const aktif = ['paid', 'settled', 'success', 'completed', 'active', 'lunas', 'berhasil'].includes(statusRaw);

  // Tentukan paket dari slug/sku/nama produk
  let paket = PLAN_SLUG[String(pick(data, ['plan', 'paket', 'slug']) || '').toLowerCase()];
  if (!paket) {
    const nama = String(pick(data, ['product_name', 'product', 'item_name', 'sku', 'name', 'productName']) || '').toLowerCase();
    if (nama.includes('seumur') || nama.includes('lifetime')) paket = 'Seumur Hidup';
    else if (nama.includes('tahun') || nama.includes('annual') || nama.includes('year')) paket = 'Tahunan';
    else if (nama.includes('bulan') || nama.includes('month')) paket = 'Bulanan';
  }
  // Mayar: satu produk untuk kedua paket → bedakan dari NOMINAL pembayaran.
  if (!paket) {
    const amount = Number(pick(data, ['amount', 'total', 'grossAmount', 'totalAmount', 'price'])) || 0;
    if (amount >= 300000) paket = 'Tahunan';
    else if (amount >= 30000) paket = 'Bulanan';
  }
  paket = paket || 'Bulanan';

  const email = pick(data, ['email', 'customer_email', 'buyer_email', 'customerEmail', 'memberEmail']) || '';

  // Masa berlaku: utamakan dari Scalev; jika tidak ada, hitung dari durasi paket.
  let expiresAt = pick(data, ['period_end', 'expires_at', 'expiry', 'valid_until']) || null;
  if (!expiresAt) {
    const durasi = PLAN_DURASI[paket];
    expiresAt = durasi == null ? null : new Date(Date.now() + durasi * 86400000).toISOString();
  }

  return {
    order: String(order),
    paket,
    email,
    status: aktif ? 'active' : statusRaw || 'unknown',
    aktif,
    expiresAt,
    rawStatus: statusRaw,
  };
}

// Apakah catatan masih aktif (status aktif & belum kedaluwarsa)?
function masihAktif(rec) {
  if (!rec || !rec.aktif) return false;
  if (rec.expiresAt && Date.parse(rec.expiresAt) < Date.now()) return false;
  return true;
}

/* ─────────────────────────── HTTP helpers ─────────────────────────── */
function kirimJSON(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': CFG.allowOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

function bacaRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;
    req.on('data', (c) => {
      total += c.length;
      if (total > 1_000_000) { reject(new Error('Body terlalu besar')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

/* ─────────────────────────── Static (opsional) ─────────────────────────── */
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.ico': 'image/x-icon' };

function layaniStatic(req, res, pathname) {
  if (!CFG.staticDir) return false;
  let rel = decodeURIComponent(pathname);
  if (rel === '/' || rel === '') rel = '/index.html';
  const full = path.join(CFG.staticDir, rel);
  // Cegah path traversal
  if (!full.startsWith(path.resolve(CFG.staticDir))) { kirimJSON(res, 403, { error: 'Terlarang' }); return true; }
  fs.readFile(full, (err, data) => {
    if (err) { kirimJSON(res, 404, { error: 'Tidak ditemukan' }); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(full)] || 'application/octet-stream' });
    res.end(data);
  });
  return true;
}

/* ─────────────────────────── Router ─────────────────────────── */
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const { pathname } = url;

  if (req.method === 'OPTIONS') return kirimJSON(res, 204, {});

  // Health
  if (req.method === 'GET' && pathname === '/api/health') {
    return kirimJSON(res, 200, { ok: true, service: 'quran-lens', time: new Date().toISOString() });
  }

  // Webhook Mayar
  if (req.method === 'POST' && (pathname === '/api/mayar/webhook' || pathname === '/api/webhook')) {
    let raw;
    try { raw = await bacaRawBody(req); }
    catch (e) { return kirimJSON(res, 413, { error: e.message }); }

    // Mode debug: cetak header & body agar nama field/header bisa dipastikan dari transaksi tes.
    if (CFG.webhookDebug) {
      console.log('[webhook][DEBUG] headers:', JSON.stringify(req.headers));
      console.log('[webhook][DEBUG] body:', raw);
    }

    const cek = verifyMayar(raw, req.headers);
    if (!cek.ok && !CFG.webhookDebug) {
      console.warn('[webhook] ditolak:', cek.reason);
      return kirimJSON(res, 401, { error: 'Tanda tangan tidak valid', detail: cek.reason });
    }
    if (cek.ok) console.log('[webhook] tanda tangan valid via', cek.via);

    let evt;
    try { evt = JSON.parse(raw); }
    catch { return kirimJSON(res, 400, { error: 'Body bukan JSON valid' }); }

    // Event tes dari Mayar (tanpa order) cukup dibalas 200 agar setup tervalidasi.
    const rec = normalizeEvent(evt);
    if (!rec) return kirimJSON(res, 200, { ok: true, note: 'Tidak ada order pada payload (mungkin event tes).' });

    Store.upsert(rec);
    console.log(`[webhook] order ${rec.order} -> ${rec.status} (${rec.paket})`);
    return kirimJSON(res, 200, { ok: true, order: rec.order, status: rec.status });
  }

  // Verifikasi status langganan (dipanggil aplikasi)
  if (req.method === 'GET' && pathname === '/api/verify') {
    const order = (url.searchParams.get('order') || '').trim();
    if (!order) return kirimJSON(res, 400, { active: false, error: 'Parameter order wajib' });

    const rec = Store.get(order);
    if (!masihAktif(rec)) {
      return kirimJSON(res, 200, { active: false });
    }
    const payload = { order: rec.order, paket: rec.paket, expiresAt: rec.expiresAt };
    return kirimJSON(res, 200, { active: true, ...payload, token: buatToken(payload) });
  }

  // Static fallback (bila diaktifkan)
  if (req.method === 'GET' && layaniStatic(req, res, pathname)) return;

  return kirimJSON(res, 404, { error: 'Rute tidak ditemukan' });
});

server.listen(CFG.port, () => {
  console.log(`The Quran Lens server berjalan di http://localhost:${CFG.port}`);
  if (!CFG.mayarSecret) console.warn('⚠️  MAYAR_WEBHOOK_SECRET belum di-set — webhook akan menolak semua request.');
  if (CFG.tokenSecret === 'ganti-rahasia-token-ini') console.warn('⚠️  TOKEN_SECRET masih default — ganti untuk produksi.');
  if (CFG.webhookDebug) console.warn('⚠️  MAYAR_WEBHOOK_DEBUG aktif — verifikasi tanda tangan DILEWATI. Matikan setelah transaksi tes!');
});

module.exports = { server, normalizeEvent, verifyMayar, masihAktif, Store };
