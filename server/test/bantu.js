'use strict';
// Alat bantu uji: server lokal di port acak + Mayar API tiruan (tanpa jaringan).
const http = require('http');
const os = require('os');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { buatAplikasi, bacaKonfig } = require('../server');
const { FileStore } = require('../lib/storage');

const PROD_BULAN = 'aaaaaaaa-1111-4111-8111-000000000001';
const PROD_3 = 'aaaaaaaa-1111-4111-8111-000000000003';
const PROD_12 = 'aaaaaaaa-1111-4111-8111-000000000012';
const PROD_LIFE = 'aaaaaaaa-1111-4111-8111-0000000000ff';
const PROD_GABUNG = 'aaaaaaaa-1111-4111-8111-0000000000aa';
const PROD_LAIN = 'bbbbbbbb-2222-4222-8222-000000000000'; // e-book lain, tidak terdaftar

function txId() { return crypto.randomUUID(); }

// Mayar tiruan: GET {base}/transactions/{id} → { statusCode, data } (bentuk dok. Mayar)
function mayarTiruan(transaksi, panggilan) {
  return async (url, opts) => {
    panggilan.push({ url, auth: opts && opts.headers && opts.headers.Authorization });
    const id = decodeURIComponent(String(url).split('/transactions/')[1] || '');
    const t = transaksi[id];
    if (t === 'gagal-jaringan') throw new Error('ECONNRESET');
    if (!t) return { status: 404, ok: false, json: async () => ({ statusCode: 404, messages: 'not found' }) };
    return { status: 200, ok: true, json: async () => ({ statusCode: 200, messages: 'success', data: t }) };
  };
}

async function siapkan(opsi = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ql-uji-'));
  const env = {
    TOKEN_SECRET: 'rahasia-uji', ORDER_PEPPER: 'merica-uji',
    MAYAR_WEBHOOK_TOKEN: 'tok-webhook-uji', MAYAR_API_KEY: 'kunci-uji', MAYAR_API_BASE: 'https://mayar.tiruan/hl/v2',
    MAYAR_PRODUK: JSON.stringify({
      [PROD_BULAN]: { paket: 'Bulanan' },
      [PROD_3]: { paket: '3 Bulan' },
      [PROD_12]: { paket: 'Tahunan' },
      [PROD_LIFE]: { paket: 'Seumur Hidup', bulan: null },
      [PROD_GABUNG]: { nominal: [{ min: 399000, paket: 'Tahunan' }, { min: 49000, paket: 'Bulanan' }] },
    }),
    REVIEWER_CODES: 'kode-ustadz-1',
    ...(opsi.env || {}),
  };
  const cfg = bacaKonfig(env);
  const store = opsi.store || new FileStore(path.join(dir, 'akses.json'));
  const transaksi = {};
  const panggilan = [];
  const log = [];
  let jam = opsi.now || Date.parse('2026-11-12T03:00:00Z');
  const premium = { jumlah: 1, versi: 'uji', episode: { 'al-fatihah-2': { tafsir: 'TAFSIR LENGKAP RAHASIA' } } };
  const app = buatAplikasi({
    cfg, store, premium, fetch: mayarTiruan(transaksi, panggilan), now: () => jam,
    log: (...a) => log.push(a.join(' ')),
    verifyPlay: opsi.verifyPlay || (async () => ({ active: false })),
    tanya: { aktif: () => false, MAX_BODY: 1000, handle: () => {} },
  });
  const srv = http.createServer(app);
  await new Promise((r) => srv.listen(0, '127.0.0.1', r));
  const port = srv.address().port;

  function req(method, p, { body, headers = {}, raw } = {}) {
    return new Promise((resolve, reject) => {
      const data = raw !== undefined ? raw : (body !== undefined ? JSON.stringify(body) : '');
      const r = http.request({ host: '127.0.0.1', port, method, path: p, headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data), ...headers } }, (res) => {
        let s = ''; res.on('data', (c) => { s += c; });
        res.on('end', () => { let j = null; try { j = JSON.parse(s); } catch (e) {} resolve({ status: res.statusCode, data: j }); });
      });
      r.on('error', reject); r.end(data);
    });
  }
  return {
    req, store, transaksi, panggilan, log, cfg, dir,
    majukan(ms) { jam += ms; }, get jam() { return jam; },
    tutup: () => new Promise((r) => srv.close(r)),
    webhook(evt, token = env.MAYAR_WEBHOOK_TOKEN, headers) {
      return req('POST', '/api/mayar/webhook' + (token ? '?token=' + encodeURIComponent(token) : ''), { body: evt, headers });
    },
  };
}

// Payload webhook mengikuti contoh dok. Mayar (payment.received)
function evtLunas(id, productId, amount = 49000) {
  return { event: 'payment.received', data: { id, transactionId: id, status: 'SUCCESS', productId, amount, customerEmail: 'pembeli@contoh.id', customerName: 'Pembeli', customerMobile: '0812' } };
}
function trxMayar(id, productId, { status = 'paid', amount = 49000, updatedAt, invoiceCode } = {}) {
  return { id, status, amount, invoiceCode: invoiceCode || 'INV-' + id.slice(0, 6), updatedAt: updatedAt || Date.parse('2026-11-12T02:59:00Z'), paymentLink: { id: productId }, customer: { email: 'pembeli@contoh.id' } };
}

module.exports = { siapkan, evtLunas, trxMayar, txId, PROD_BULAN, PROD_3, PROD_12, PROD_LIFE, PROD_GABUNG, PROD_LAIN };
