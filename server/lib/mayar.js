/*
 * mayar.js — Autentikasi webhook & verifikasi ulang transaksi ke API Mayar.
 *
 * Sumber (diperiksa 12 Nov 2026):
 *  - Webhook: https://docs.mayar.id/integration/webhook
 *      POST JSON, event "payment.received" saat pembayaran selesai. Dokumen
 *      TIDAK menyebut tanda tangan/HMAC → autentikasi utama memakai token
 *      rahasia di URL webhook (?token=...), dibandingkan constant-time.
 *  - Contoh payload: https://docs.mayar.id/api-reference-v2/webhook/history
 *      data.transactionId (= data.id), data.status "SUCCESS", data.productId, data.amount.
 *  - Detail transaksi: https://docs.mayar.id/api-reference-v2/transaction/detail
 *      GET https://api.mayar.id/hl/v2/transactions/{id}, header Authorization: Bearer <API key>.
 *      data.status: "paid" | "unpaid" | "created" | "expired"; data.paymentLink.id; data.amount;
 *      data.invoiceCode; data.updatedAt (epoch ms).
 *
 * ASUMSI (belum diuji dengan transaksi nyata, lihat RENCANA-TRANSAKSI-UJI.md):
 *  - data.paymentLink.id pada detail transaksi = data.productId pada webhook (contoh
 *    di halaman webhook history menunjukkan paymentLinkId = productId).
 *  - Status lunas final = "paid" (dapat diubah lewat MAYAR_STATUS_LUNAS).
 */
'use strict';
const crypto = require('crypto');
const { sama } = require('./token');

const HEADER_HMAC = ['x-mayar-signature', 'x-signature', 'x-hub-signature-256', 'signature'];

function hashTeks(s) { return crypto.createHash('sha256').update(String(s)).digest('hex'); }

/* Lolos bila (a) ?token= cocok dengan MAYAR_WEBHOOK_TOKEN, atau (b) ada header
 * HMAC-SHA256(raw body, MAYAR_WEBHOOK_SECRET) yang cocok. Tidak ada jalur debug/bypass. */
function autentikasiWebhook({ tokenUrl, headers, raw }, cfg) {
  if (!cfg.webhookToken && !cfg.webhookSecret) return { ok: false, kode: 503, alasan: 'webhook belum dikonfigurasi' };
  if (cfg.webhookToken && tokenUrl && sama(hashTeks(tokenUrl), hashTeks(cfg.webhookToken))) {
    return { ok: true, via: 'token-url' };
  }
  if (cfg.webhookSecret) {
    const harap = crypto.createHmac('sha256', cfg.webhookSecret).update(raw).digest('hex');
    for (const h of HEADER_HMAC) {
      const v = headers[h];
      if (!v) continue;
      if (sama(String(v).replace(/^sha256=/i, '').trim().toLowerCase(), harap)) return { ok: true, via: 'hmac:' + h };
    }
  }
  return { ok: false, kode: 401, alasan: 'token/tanda tangan tidak cocok' };
}

function idTransaksiDariWebhook(evt) {
  const d = (evt && evt.data) || {};
  const id = d.transactionId || d.id || '';
  return String(id).trim();
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function ambilTransaksi(id, cfg, fetchImpl) {
  if (!cfg.apiKey) { const e = new Error('MAYAR_API_KEY belum di-set'); e.kode = 503; throw e; }
  if (!UUID_RE.test(id)) return { ditemukan: false, alasan: 'bukan-id-transaksi' };
  const url = `${cfg.apiBase.replace(/\/+$/, '')}/transactions/${encodeURIComponent(id)}`;
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), cfg.timeoutMs || 15000);
  let r;
  try {
    r = await fetchImpl(url, { headers: { Authorization: `Bearer ${cfg.apiKey}` }, signal: ctl.signal });
  } catch (e) {
    const err = new Error('API Mayar tidak terjangkau: ' + e.message); err.kode = 502; throw err;
  } finally {
    clearTimeout(t);
  }
  if (r.status === 404) return { ditemukan: false, alasan: 'tidak-ditemukan' };
  const j = await r.json().catch(() => null);
  if (!r.ok || !j || !j.data) {
    const err = new Error(`API Mayar membalas HTTP ${r.status}`); err.kode = 502; throw err;
  }
  return { ditemukan: true, data: j.data };
}

module.exports = { autentikasiWebhook, idTransaksiDariWebhook, ambilTransaksi, UUID_RE, HEADER_HMAC };
