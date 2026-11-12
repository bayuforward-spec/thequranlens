'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const B = require('./bantu');

const HARI = 86400000;

test('webhook tanpa token / token salah ditolak 401, tidak menyimpan apa pun', async (t) => {
  const s = await B.siapkan(); t.after(s.tutup);
  const id = B.txId();
  s.transaksi[id] = B.trxMayar(id, B.PROD_BULAN);
  for (const tok of ['', 'salah', 'tok-webhook-uji ']) {
    const r = await s.webhook(B.evtLunas(id, B.PROD_BULAN), tok);
    assert.equal(r.status, 401, 'token: ' + JSON.stringify(tok));
  }
  assert.equal(s.panggilan.length, 0, 'API Mayar tidak dipanggil');
  assert.equal((await s.req('POST', '/api/verify', { body: { order: 'INV-' + id.slice(0, 6) } })).data.active, false);
});

test('webhook tidak dikonfigurasi → 503 (tidak ada bypass debug)', async (t) => {
  const s = await B.siapkan({ env: { MAYAR_WEBHOOK_TOKEN: '', MAYAR_WEBHOOK_DEBUG: '1' } }); t.after(s.tutup);
  const r = await s.webhook(B.evtLunas(B.txId(), B.PROD_BULAN), 'apa-saja');
  assert.equal(r.status, 503);
});

test('webhook sah → diverifikasi ulang ke API Mayar → aktif; email/nama/HP tidak disimpan', async (t) => {
  const s = await B.siapkan(); t.after(s.tutup);
  const id = B.txId();
  s.transaksi[id] = B.trxMayar(id, B.PROD_BULAN, { invoiceCode: 'INV-ABC123' });
  const r = await s.webhook(B.evtLunas(id, B.PROD_BULAN));
  assert.equal(r.status, 200); assert.equal(r.data.status, 'aktif');
  assert.equal(s.panggilan.length, 1);
  assert.equal(s.panggilan[0].auth, 'Bearer kunci-uji');
  assert.match(s.panggilan[0].url, /^https:\/\/mayar\.tiruan\/hl\/v2\/transactions\//);
  const isi = fs.readFileSync(path.join(s.dir, 'akses.json'), 'utf8');
  for (const pribadi of ['pembeli@contoh.id', 'Pembeli', '0812', id, id.toUpperCase(), 'INV-ABC123']) assert.ok(!isi.includes(pribadi), 'tersimpan: ' + pribadi);
  // verifikasi via ID transaksi & via kode invoice (alias)
  for (const order of [id, 'inv-abc123']) {
    const v = await s.req('POST', '/api/verify', { body: { order } });
    assert.equal(v.data.active, true, order); assert.equal(v.data.paket, 'Bulanan');
    assert.equal(v.data.expiresAt, '2026-12-12T02:59:00.000Z');
    assert.ok(v.data.token);
  }
  // GET lama tetap didukung
  assert.equal((await s.req('GET', '/api/verify?order=' + id)).data.active, true);
});

test('HMAC header tetap diterima bila MAYAR_WEBHOOK_SECRET di-set', async (t) => {
  const s = await B.siapkan({ env: { MAYAR_WEBHOOK_SECRET: 'hmac-uji' } }); t.after(s.tutup);
  const id = B.txId();
  s.transaksi[id] = B.trxMayar(id, B.PROD_12, { amount: 399000 });
  const raw = JSON.stringify(B.evtLunas(id, B.PROD_12, 399000));
  const sig = crypto.createHmac('sha256', 'hmac-uji').update(raw).digest('hex');
  const salah = await s.req('POST', '/api/mayar/webhook', { raw, headers: { 'x-mayar-signature': 'ab' + sig.slice(2) } });
  assert.equal(salah.status, 401);
  const r = await s.req('POST', '/api/mayar/webhook', { raw, headers: { 'x-mayar-signature': sig } });
  assert.equal(r.status, 200); assert.equal(r.data.status, 'aktif');
});

test('event duplikat → idempoten (sekali simpan, API Mayar sekali, expiry tidak bergeser)', async (t) => {
  const s = await B.siapkan(); t.after(s.tutup);
  const id = B.txId();
  s.transaksi[id] = B.trxMayar(id, B.PROD_3);
  const a = await s.webhook(B.evtLunas(id, B.PROD_3));
  s.majukan(5 * HARI);
  const b = await s.webhook(B.evtLunas(id, B.PROD_3));
  const c = await Promise.all([s.webhook(B.evtLunas(id, B.PROD_3)), s.webhook(B.evtLunas(id, B.PROD_3))]);
  assert.equal(a.data.status, 'aktif');
  assert.equal(b.data.status, 'sudah-aktif');
  c.forEach((x) => assert.equal(x.data.status, 'sudah-aktif'));
  assert.equal(s.panggilan.length, 1);
  const v = await s.req('POST', '/api/verify', { body: { order: id } });
  assert.equal(v.data.paket, '3 Bulan'); assert.equal(v.data.expiresAt, '2027-02-12T02:59:00.000Z');
});

test('transaksi belum lunas / produk lain / produk tidak cocok / id palsu → tidak aktif', async (t) => {
  const s = await B.siapkan(); t.after(s.tutup);
  const belum = B.txId(); s.transaksi[belum] = B.trxMayar(belum, B.PROD_BULAN, { status: 'unpaid' });
  const lain = B.txId(); s.transaksi[lain] = B.trxMayar(lain, B.PROD_LAIN);
  const beda = B.txId(); s.transaksi[beda] = B.trxMayar(beda, B.PROD_BULAN);
  const palsu = B.txId(); // tidak ada di Mayar
  assert.equal((await s.webhook(B.evtLunas(belum, B.PROD_BULAN))).data.alasan, 'belum-lunas');
  assert.equal((await s.webhook(B.evtLunas(lain, B.PROD_LAIN))).data.alasan, 'produk-tidak-dikenal');
  assert.equal((await s.webhook(B.evtLunas(beda, B.PROD_LIFE))).data.alasan, 'produk-tidak-cocok');
  assert.equal((await s.webhook(B.evtLunas(palsu, B.PROD_BULAN))).data.alasan, 'tidak-ditemukan');
  for (const id of [belum, lain, palsu]) {
    assert.equal((await s.req('POST', '/api/verify', { body: { order: id } })).data.active, false);
  }
  // Webhook dengan productId janggal ditolak, tetapi data API Mayar tetap sumber kebenaran:
  // transaksi itu memang lunas untuk produk Bulanan → verify memberi paket Bulanan, bukan Seumur Hidup.
  assert.equal((await s.req('POST', '/api/verify', { body: { order: beda } })).data.paket, 'Bulanan');
  // event selain payment.received diabaikan; 'testing' dibalas 200
  assert.equal((await s.webhook({ event: 'testing' })).status, 200);
  assert.equal((await s.webhook({ event: 'payment.reminder', data: { id: belum } })).data.note, 'event diabaikan');
});

test('verifikasi ulang bila webhook gagal: /api/verify mengaktifkan langsung dari API Mayar', async (t) => {
  const s = await B.siapkan(); t.after(s.tutup);
  const id = B.txId(); s.transaksi[id] = B.trxMayar(id, B.PROD_LIFE, { amount: 999000 });
  const v = await s.req('POST', '/api/verify', { body: { order: id } });
  assert.equal(v.data.active, true); assert.equal(v.data.paket, 'Seumur Hidup'); assert.equal(v.data.expiresAt, null);
  // Mayar tidak terjangkau → 503 coba lagi
  const id2 = B.txId(); s.transaksi[id2] = 'gagal-jaringan';
  assert.equal((await s.req('POST', '/api/verify', { body: { order: id2 } })).status, 503);
});

test('webhook: API Mayar gagal → 502 supaya Mayar mengulang; kemudian sukses', async (t) => {
  const s = await B.siapkan(); t.after(s.tutup);
  const id = B.txId(); s.transaksi[id] = 'gagal-jaringan';
  assert.equal((await s.webhook(B.evtLunas(id, B.PROD_BULAN))).status, 502);
  s.transaksi[id] = B.trxMayar(id, B.PROD_BULAN);
  assert.equal((await s.webhook(B.evtLunas(id, B.PROD_BULAN))).data.status, 'aktif');
});

test('cadangan nominal hanya untuk produk terdaftar & dicatat di log', async (t) => {
  const s = await B.siapkan(); t.after(s.tutup);
  const a = B.txId(); s.transaksi[a] = B.trxMayar(a, B.PROD_GABUNG, { amount: 399000 });
  const b = B.txId(); s.transaksi[b] = B.trxMayar(b, B.PROD_GABUNG, { amount: 49000 });
  const c = B.txId(); s.transaksi[c] = B.trxMayar(c, B.PROD_GABUNG, { amount: 10000 });
  await s.webhook(B.evtLunas(a, B.PROD_GABUNG)); await s.webhook(B.evtLunas(b, B.PROD_GABUNG));
  assert.equal((await s.webhook(B.evtLunas(c, B.PROD_GABUNG))).data.alasan, 'produk-tidak-dikenal');
  assert.equal((await s.req('POST', '/api/verify', { body: { order: a } })).data.paket, 'Tahunan');
  assert.equal((await s.req('POST', '/api/verify', { body: { order: b } })).data.paket, 'Bulanan');
  assert.ok(s.log.some((l) => l.includes('CADANGAN nominal')));
});

test('expiry: setelah masa aktif habis verify/refresh/konten ditolak', async (t) => {
  const s = await B.siapkan(); t.after(s.tutup);
  const id = B.txId(); s.transaksi[id] = B.trxMayar(id, B.PROD_BULAN);
  await s.webhook(B.evtLunas(id, B.PROD_BULAN));
  const { token } = (await s.req('POST', '/api/verify', { body: { order: id } })).data;
  const auth = { Authorization: 'Bearer ' + token };
  assert.equal((await s.req('GET', '/api/premium/episode/al-fatihah-2', { headers: auth })).status, 200);
  s.majukan(31 * HARI);
  const v = await s.req('POST', '/api/verify', { body: { order: id } });
  assert.equal(v.data.active, false); assert.equal(v.data.alasan, 'kedaluwarsa');
  assert.equal((await s.req('POST', '/api/refresh', { body: { token } })).status, 403);
  assert.equal((await s.req('GET', '/api/premium/episode/al-fatihah-2', { headers: auth })).status, 401);
});

test('token: palsu/diubah ditolak; refresh memperpanjang token; dicabut → 403', async (t) => {
  const s = await B.siapkan({ env: { TOKEN_TTL_HARI: '7' } }); t.after(s.tutup);
  const id = B.txId(); s.transaksi[id] = B.trxMayar(id, B.PROD_12);
  await s.webhook(B.evtLunas(id, B.PROD_12));
  const v = (await s.req('POST', '/api/verify', { body: { order: id } })).data;
  assert.equal(v.tokenExp, s.jam + 7 * HARI);
  const [body, sig] = v.token.split('.');
  const ubah = Buffer.from(JSON.stringify({ ...JSON.parse(Buffer.from(body, 'base64url')), exp: null })).toString('base64url');
  for (const tk of ['x', ubah + '.' + sig, body + '.' + sig.slice(0, -2) + 'AA']) {
    assert.equal((await s.req('GET', '/api/premium/episode/al-fatihah-2', { headers: { Authorization: 'Bearer ' + tk } })).status, 401);
  }
  s.majukan(8 * HARI); // token habis, hak masih ada
  assert.equal((await s.req('GET', '/api/premium/episode/al-fatihah-2', { headers: { Authorization: 'Bearer ' + v.token } })).status, 401);
  const r = await s.req('POST', '/api/refresh', { body: { token: v.token } });
  assert.equal(r.status, 200); assert.ok(r.data.token && r.data.token !== v.token);
  assert.equal((await s.req('GET', '/api/premium/episode/al-fatihah-2', { headers: { Authorization: 'Bearer ' + r.data.token } })).status, 200);
  // Cabut (mis. refund): status 'dicabut' di storage
  const oh = require('../lib/akses').hashOrder('merica-uji', id);
  const rec = await s.store.get('ent:' + oh); await s.store.put('ent:' + oh, { ...rec, status: 'dicabut' });
  assert.equal((await s.req('GET', '/api/premium/episode/al-fatihah-2', { headers: { Authorization: 'Bearer ' + r.data.token } })).status, 403);
});

test('endpoint premium tanpa token → 401; konten gratis tidak lewat endpoint ini', async (t) => {
  const s = await B.siapkan(); t.after(s.tutup);
  const r = await s.req('GET', '/api/premium/episode/al-fatihah-2');
  assert.equal(r.status, 401);
  assert.ok(!JSON.stringify(r.data).includes('RAHASIA'));
  assert.equal((await s.req('GET', '/api/premium/episode/al-fatihah-2', { headers: { Authorization: 'Basic abc' } })).status, 401);
});

test('peninjau: kode env → token; kode salah 401; kode dihapus dari env → dicabut', async (t) => {
  const s = await B.siapkan(); t.after(s.tutup);
  assert.equal((await s.req('POST', '/api/reviewer', { body: { kode: 'qlens-tashih-2026' } })).status, 401);
  const r = await s.req('POST', '/api/reviewer', { body: { kode: 'kode-ustadz-1' } });
  assert.equal(r.data.active, true); assert.equal(r.data.paket, 'Peninjau');
  const auth = { Authorization: 'Bearer ' + r.data.token };
  const isi = await s.req('GET', '/api/premium/episode/al-fatihah-2', { headers: auth });
  assert.equal(isi.status, 200); assert.equal(isi.data.data.tafsir, 'TAFSIR LENGKAP RAHASIA');
  s.cfg.reviewerHashes.clear(); // = REVIEWER_CODES dikosongkan lalu server restart
  assert.equal((await s.req('GET', '/api/premium/episode/al-fatihah-2', { headers: auth })).status, 403);
});

test('Play Billing: /api/play/verify menerbitkan token yang sama & membuka konten', async (t) => {
  const panggil = [];
  const s = await B.siapkan({ verifyPlay: async (tok, sku) => { panggil.push([tok, sku]); return tok === 'play-sah' ? { active: true, paket: 'Tahunan', expiresAt: '2027-11-12T00:00:00.000Z' } : { active: false, error: 'tidak-aktif' }; } });
  t.after(s.tutup);
  assert.equal((await s.req('POST', '/api/play/verify', { body: { token: 'x' } })).status, 400);
  assert.equal((await s.req('POST', '/api/play/verify', { body: { token: 'palsu', sku: 'quranlens_tahunan' } })).data.active, false);
  const r = await s.req('POST', '/api/play/verify', { body: { token: 'play-sah', sku: 'quranlens_tahunan' } });
  assert.equal(r.data.active, true); assert.equal(r.data.paket, 'Tahunan'); assert.ok(r.data.token);
  assert.equal((await s.req('GET', '/api/premium/episode/al-fatihah-2', { headers: { Authorization: 'Bearer ' + r.data.token } })).status, 200);
  assert.deepEqual(panggil[1], ['play-sah', 'quranlens_tahunan']);
});

test('rate limit /api/verify', async (t) => {
  const s = await B.siapkan(); t.after(s.tutup);
  let terakhir;
  for (let i = 0; i < 21; i++) terakhir = await s.req('POST', '/api/verify', { body: { order: 'TIDAK-ADA-' + i } });
  assert.equal(terakhir.status, 429);
});

test('health menampilkan jenis storage & status konten premium', async (t) => {
  const s = await B.siapkan(); t.after(s.tutup);
  const r = await s.req('GET', '/api/health');
  assert.equal(r.data.ok, true); assert.equal(r.data.storage, 'file'); assert.equal(r.data.premium, true);
});
