/*
 * token.js — Token sesi bertanda tangan (HMAC-SHA256), format "<payload>.<sig>"
 * (base64url). Payload: { v, s (sumber), oh (hash order), paket, exp (akhir hak
 * akses, ms; null = belum ditentukan, misalnya dari Play), iat, te (token kedaluwarsa, ms) }.
 * Token sengaja berumur pendek (TOKEN_TTL_HARI, default 7) agar pencabutan
 * berlaku; klien memperbaruinya lewat /api/refresh.
 */
'use strict';
const crypto = require('crypto');

function b64(buf) { return Buffer.from(buf).toString('base64url'); }

function tanda(secret, body) {
  return crypto.createHmac('sha256', secret).update(body).digest('base64url');
}

function sama(a, b) {
  const ba = Buffer.from(String(a || ''));
  const bb = Buffer.from(String(b || ''));
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

function buatToken(secret, data, { now = Date.now(), ttlMs = 7 * 86400000 } = {}) {
  const exp = data.exp == null ? null : Number(data.exp);
  const te = exp == null ? now + ttlMs : Math.min(exp, now + ttlMs);
  const payload = { v: 1, s: data.s, oh: data.oh, paket: data.paket, exp, iat: now, te };
  const body = b64(JSON.stringify(payload));
  return { token: `${body}.${tanda(secret, body)}`, payload };
}

/* Kembalikan payload bila tanda tangan sah dan belum kedaluwarsa.
 * graceMs > 0 mengizinkan token yang `te`-nya lewat (dipakai /api/refresh). */
function periksaToken(secret, token, { now = Date.now(), graceMs = 0 } = {}) {
  if (typeof token !== 'string' || token.length > 2000) return { ok: false, alasan: 'format' };
  const parts = token.split('.');
  if (parts.length !== 2) return { ok: false, alasan: 'format' };
  const [body, sig] = parts;
  if (!sama(sig, tanda(secret, body))) return { ok: false, alasan: 'tanda-tangan' };
  let p;
  try { p = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')); } catch (e) { return { ok: false, alasan: 'format' }; }
  if (!p || p.v !== 1 || !p.oh) return { ok: false, alasan: 'format' };
  if (p.exp != null && p.exp <= now) return { ok: false, alasan: 'hak-kedaluwarsa', payload: p };
  if (!(p.te + graceMs > now)) return { ok: false, alasan: 'token-kedaluwarsa', payload: p };
  return { ok: true, payload: p };
}

module.exports = { buatToken, periksaToken, sama };
