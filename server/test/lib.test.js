'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const akses = require('../lib/akses');
const { buatToken, periksaToken } = require('../lib/token');
const { UpstashStore, buatStore } = require('../lib/storage');
const { migrasi } = require('../migrasi-subs');

test('tambahBulan menjepit akhir bulan & lintas tahun', () => {
  assert.equal(new Date(akses.tambahBulan(Date.parse('2026-01-31T00:00:00Z'), 1)).toISOString(), '2026-02-28T00:00:00.000Z');
  assert.equal(new Date(akses.tambahBulan(Date.parse('2026-11-30T10:00:00Z'), 3)).toISOString(), '2027-02-28T10:00:00.000Z');
  assert.equal(akses.hitungExpiry(Date.now(), null), null);
});

test('konfigurasi produk: durasi baku, bulan eksplisit, nominal, JSON rusak', () => {
  const k = akses.bacaKonfigProduk({ MAYAR_PRODUK: JSON.stringify({ A: { paket: 'Tahunan' }, b: { paket: 'Promo', bulan: 6 }, c: { nominal: [{ min: 10, paket: 'Bulanan' }] } }) });
  assert.deepEqual(k.a, { paket: 'Tahunan', bulan: 12 });
  assert.deepEqual(k.b, { paket: 'Promo', bulan: 6 });
  assert.equal(akses.tentukanPaket(k, 'tidak-ada', 1000), null);
  assert.throws(() => akses.bacaKonfigProduk({ MAYAR_PRODUK: '{' }));
  assert.throws(() => akses.bacaKonfigProduk({ MAYAR_PRODUK: JSON.stringify({ x: { paket: 'Aneh' } }) }));
});

test('token: kedaluwarsa hak vs token, grace', () => {
  const now = 1_000_000_000_000;
  const { token } = buatToken('s', { s: 'mayar', oh: 'h', paket: 'Bulanan', exp: now + 10 * 86400000 }, { now, ttlMs: 86400000 });
  assert.equal(periksaToken('s', token, { now }).ok, true);
  assert.equal(periksaToken('lain', token, { now }).alasan, 'tanda-tangan');
  assert.equal(periksaToken('s', token, { now: now + 2 * 86400000 }).alasan, 'token-kedaluwarsa');
  assert.equal(periksaToken('s', token, { now: now + 2 * 86400000, graceMs: 30 * 86400000 }).ok, true);
  assert.equal(periksaToken('s', token, { now: now + 11 * 86400000, graceMs: 30 * 86400000 }).alasan, 'hak-kedaluwarsa');
});

test('Upstash adapter memakai REST API (perintah JSON + Bearer) & SET NX', async () => {
  const kirim = [];
  const db = {};
  const f = async (url, o) => {
    kirim.push({ url, auth: o.headers.Authorization, body: JSON.parse(o.body) });
    const [cmd, k, v, nx] = JSON.parse(o.body);
    let result = null;
    if (cmd === 'GET') result = db[k] ?? null;
    if (cmd === 'SET') { if (nx && db[k] !== undefined) result = null; else { db[k] = v; result = 'OK'; } }
    if (cmd === 'DEL') { delete db[k]; result = 1; }
    return { ok: true, status: 200, json: async () => ({ result }) };
  };
  const s = buatStore({ STORAGE: 'upstash', UPSTASH_REDIS_REST_URL: 'https://contoh.upstash.io/', UPSTASH_REDIS_REST_TOKEN: 'tk' }, { fetch: f });
  assert.ok(s instanceof UpstashStore);
  assert.equal(await s.put('ent:1', { a: 1 }, { nx: true }), true);
  assert.equal(await s.put('ent:1', { a: 2 }, { nx: true }), false);
  assert.deepEqual(await s.get('ent:1'), { a: 1 });
  assert.equal(await s.get('ent:2'), null);
  assert.equal(kirim[0].url, 'https://contoh.upstash.io'); assert.equal(kirim[0].auth, 'Bearer tk');
  assert.deepEqual(kirim[0].body, ['SET', 'ql:ent:1', '{"a":1}', 'NX']);
  const galat = buatStore({ STORAGE: 'upstash', UPSTASH_REDIS_REST_URL: 'https://x', UPSTASH_REDIS_REST_TOKEN: 't' }, { fetch: async () => ({ ok: false, status: 401, json: async () => ({ error: 'WRONGPASS' }) }) });
  await assert.rejects(galat.get('a'), /WRONGPASS/);
});

test('migrasi subs.json: tanpa email, lewati PLAY & non-aktif, expiry dihitung', async () => {
  const tulis = {};
  const store = { put: async (k, v, o) => { if (o && o.nx && tulis[k]) return false; tulis[k] = v; return true; } };
  const lama = { orders: {
    'INV-1': { order: 'INV-1', paket: 'Tahunan', email: 'a@b.c', status: 'active', updatedAt: '2026-10-01T00:00:00.000Z' },
    'INV-2': { order: 'INV-2', paket: 'Bulanan', email: 'x@y.z', status: 'pending' },
    'PLAY:abc': { order: 'PLAY:abc', paket: 'Bulanan', status: 'active' },
  } };
  const kering = await migrasi(lama, store, 'p');
  assert.deepEqual(kering, { dibaca: 3, ditulis: 0, dilewati: 2 });
  assert.equal(Object.keys(tulis).length, 0);
  const h = await migrasi(lama, store, 'p', { tulis: true });
  assert.equal(h.ditulis, 1);
  const rec = Object.values(tulis)[0];
  assert.equal(rec.expiresAt, '2027-10-01T00:00:00.000Z');
  assert.ok(!JSON.stringify(tulis).includes('@'));
  assert.ok(!JSON.stringify(tulis).includes('INV-1'));
});
