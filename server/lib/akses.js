/*
 * akses.js — Model hak akses Premium.
 *
 * Catatan tersimpan (kunci "ent:<hashOrder>"):
 *   { v:1, oh, s:'mayar'|'play'|'migrasi', paket, bulan (angka positif;
 *     rekaman Play boleh null karena expiry diambil dari Google),
 *     productId, aktifSejak (ISO), expiresAt (ISO), via }
 * Alias kode invoice (kunci "alias:<hash>") → { oh }.
 * TIDAK menyimpan email, nama, atau nomor HP (UU PDP: minimisasi data).
 */
'use strict';
const crypto = require('crypto');

// Paket baku. Durasi selalu dalam BULAN (angka positif). "12 Bulan" = alias Tahunan.
// Paket seumur hidup sudah tidak dipakai.
const PAKET_BAKU = {
  'Bulanan': 1,
  '3 Bulan': 3,
  'Tahunan': 12,
  '12 Bulan': 12,
};

function normalOrder(order) {
  return String(order || '').trim().toUpperCase().slice(0, 200);
}

function hashOrder(pepper, order) {
  return crypto.createHmac('sha256', pepper).update('o:' + normalOrder(order)).digest('hex');
}

// Tambah n bulan kalender (UTC); tanggal dijepit ke akhir bulan (31 Jan + 1 → 28/29 Feb).
function tambahBulan(ms, n) {
  const d = new Date(ms);
  const hari = d.getUTCDate();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() + n);
  const akhir = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  d.setUTCDate(Math.min(hari, akhir));
  return d.getTime();
}

function hitungExpiry(mulaiMs, bulan) {
  const n = Number(bulan);
  if (!Number.isFinite(n) || n <= 0) {
    throw new Error('Durasi paket harus berupa angka bulan yang positif');
  }
  return new Date(tambahBulan(mulaiMs, n)).toISOString();
}

function masihAktif(rec, now = Date.now()) {
  if (!rec || rec.status === 'dicabut') return false;
  if (rec.expiresAt && Date.parse(rec.expiresAt) <= now) return false;
  return true;
}

/*
 * Konfigurasi produk Mayar (env MAYAR_PRODUK JSON, atau file MAYAR_PRODUK_FILE):
 * {
 *   "<productId>": { "paket": "3 Bulan" },
 *   "<productId>": { "paket": "Tahunan" },           // 12 bulan
 *   "<productId>": { "nominal": [ { "min": 399000, "paket": "Tahunan" },
 *                                 { "min": 135000, "paket": "3 Bulan" },
 *                                 { "min": 49000,  "paket": "Bulanan" } ] }
 * }
 * "nominal" = CADANGAN untuk satu produk yang menjual beberapa paket; selalu dicatat di log.
 * Produk yang tidak terdaftar DITOLAK (mis. e-book lain di akun Mayar yang sama).
 */
function bacaKonfigProduk(env = process.env, fs = require('fs')) {
  let raw = env.MAYAR_PRODUK || '';
  if (!raw && env.MAYAR_PRODUK_FILE) {
    try { raw = fs.readFileSync(env.MAYAR_PRODUK_FILE, 'utf8'); } catch (e) { raw = ''; }
  }
  if (!raw) return {};
  let obj;
  try { obj = JSON.parse(raw); } catch (e) { throw new Error('MAYAR_PRODUK bukan JSON valid'); }
  const hasil = {};
  for (const [id, v] of Object.entries(obj || {})) {
    if (!v || typeof v !== 'object') continue;
    const kunci = String(id).trim().toLowerCase();
    if (Array.isArray(v.nominal)) {
      hasil[kunci] = {
        nominal: v.nominal
          .map((n) => ({ min: Number(n.min) || 0, paket: String(n.paket), bulan: durasi(n) }))
          .sort((a, b) => b.min - a.min),
      };
    } else if (v.paket) {
      hasil[kunci] = { paket: String(v.paket), bulan: durasi(v) };
    }
  }
  return hasil;
}

function durasi(v) {
  if (Object.prototype.hasOwnProperty.call(v, 'bulan')) {
    const n = Number(v.bulan);
    if (v.bulan === null || v.bulan === undefined || !Number.isFinite(n) || n <= 0) {
      throw new Error(`Durasi paket "${v.paket}" harus berupa angka bulan yang positif`);
    }
    return n;
  }
  if (Object.prototype.hasOwnProperty.call(PAKET_BAKU, v.paket)) return PAKET_BAKU[v.paket];
  throw new Error(`Durasi paket "${v.paket}" tidak diketahui; isi "bulan"`);
}

// → { paket, bulan, via:'productId'|'nominal' } | null
function tentukanPaket(konfig, productId, amount, log = () => {}) {
  const p = konfig[String(productId || '').trim().toLowerCase()];
  if (!p) return null;
  if (p.paket) return { paket: p.paket, bulan: p.bulan, via: 'productId' };
  const n = Number(amount) || 0;
  const cocok = p.nominal.find((x) => n >= x.min);
  if (!cocok) return null;
  log(`[paket] CADANGAN nominal: produk ${productId} Rp${n} → ${cocok.paket}`);
  return { paket: cocok.paket, bulan: cocok.bulan, via: 'nominal' };
}

module.exports = { PAKET_BAKU, normalOrder, hashOrder, tambahBulan, hitungExpiry, masihAktif, bacaKonfigProduk, tentukanPaket };
