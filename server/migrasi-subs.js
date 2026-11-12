#!/usr/bin/env node
/*
 * migrasi-subs.js — Pindahkan data lama server/data/subs.json (format
 * { orders: { <order>: { order, paket, email, status, aktif, expiresAt } } })
 * ke penyimpanan baru TANPA email/nama/HP. Order ID di-hash (ORDER_PEPPER).
 *
 *   node server/migrasi-subs.js <path/subs.json>            # uji kering (tidak menulis)
 *   node server/migrasi-subs.js <path/subs.json> --tulis    # tulis ke STORAGE aktif
 *
 * Env yang dipakai sama dengan server (STORAGE, DATA_FILE / UPSTASH_*, ORDER_PEPPER).
 * Catatan: di Render free, subs.json lama kemungkinan sudah hilang (filesystem efemeral).
 */
'use strict';
const fs = require('fs');
const { buatStore } = require('./lib/storage');
const akses = require('./lib/akses');

async function migrasi(lama, store, pepper, { tulis = false, now = Date.now() } = {}) {
  const orders = (lama && lama.orders) || {};
  const hasil = { dibaca: 0, ditulis: 0, dilewati: 0 };
  for (const [kunci, o] of Object.entries(orders)) {
    hasil.dibaca += 1;
    const order = (o && o.order) || kunci;
    const aktif = o && (o.aktif === true || o.status === 'active');
    if (!aktif || String(order).startsWith('PLAY:')) { hasil.dilewati += 1; continue; }
    const oh = akses.hashOrder(pepper, order);
    const paket = String(o.paket || 'Bulanan');
    const bulan = Object.prototype.hasOwnProperty.call(akses.PAKET_BAKU, paket) ? akses.PAKET_BAKU[paket] : 1;
    const mulai = Date.parse(o.aktifSejak || o.updatedAt || '') || now;
    const rec = {
      v: 1, oh, s: 'migrasi', paket, bulan, productId: null,
      aktifSejak: new Date(mulai).toISOString(),
      // Tanpa expiresAt lama → hitung dari paket (bukan jadi seumur hidup).
      expiresAt: o.expiresAt || akses.hitungExpiry(mulai, bulan), via: 'migrasi',
    };
    if (tulis && await store.put('ent:' + oh, rec, { nx: true })) hasil.ditulis += 1;
  }
  return hasil;
}

if (require.main === module) {
  (async () => {
    const file = process.argv[2];
    const tulis = process.argv.includes('--tulis');
    if (!file) { console.error('Pakai: node server/migrasi-subs.js <subs.json> [--tulis]'); process.exit(2); }
    if (!process.env.ORDER_PEPPER) { console.error('ORDER_PEPPER wajib (harus sama dengan server).'); process.exit(2); }
    const lama = JSON.parse(fs.readFileSync(file, 'utf8'));
    const h = await migrasi(lama, buatStore(process.env), process.env.ORDER_PEPPER, { tulis });
    console.log(`${tulis ? 'Migrasi' : 'Uji kering'}: dibaca ${h.dibaca}, ditulis ${h.ditulis}, dilewati ${h.dilewati}. Email tidak dipindahkan.`);
  })().catch((e) => { console.error(e.message); process.exit(1); });
}

module.exports = { migrasi };
