/*
 * play-verify.js — Verifikasi langganan Google Play ke Google Play Developer API.
 *
 * Tanpa dependensi (hanya modul bawaan Node): JWT RS256 → tukar access token →
 * cek status langganan → (bila perlu) acknowledge agar tak auto-refund.
 *
 * Env yang dibutuhkan (di server Render):
 *   GOOGLE_SA_EMAIL     Email service account (Google Cloud, akses Play Developer API)
 *   GOOGLE_SA_KEY       Private key PEM service account (baris baru sebagai \n)
 *   PLAY_PACKAGE_NAME   Package name aplikasi (mis. id.thequranlens.app)
 */
'use strict';
const https = require('https');
const crypto = require('crypto');

const CFG = {
  saEmail: process.env.GOOGLE_SA_EMAIL || '',
  saKey: (process.env.GOOGLE_SA_KEY || '').replace(/\\n/g, '\n'),
  packageName: process.env.PLAY_PACKAGE_NAME || '',
};

// Product ID langganan (Play Console) -> nama paket aplikasi
const SKU = { 'quranlens_bulanan': 'Bulanan', 'quranlens_tahunan': 'Tahunan' };

function httpsJSON(host, path, method, body, headers) {
  return new Promise((resolve, reject) => {
    const h = { ...(headers || {}) };
    if (body) h['Content-Length'] = Buffer.byteLength(body);
    const req = https.request({ host, path, method, headers: h }, (r) => {
      let d = '';
      r.on('data', (c) => (d += c));
      r.on('end', () => { try { resolve(d ? JSON.parse(d) : {}); } catch (e) { reject(new Error('respon bukan JSON')); } });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function getAccessToken() {
  if (!CFG.saEmail || !CFG.saKey) throw new Error('GOOGLE_SA_EMAIL/KEY belum di-set');
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const claim = Buffer.from(JSON.stringify({
    iss: CFG.saEmail,
    scope: 'https://www.googleapis.com/auth/androidpublisher',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now, exp: now + 3600,
  })).toString('base64url');
  const sig = crypto.sign('RSA-SHA256', Buffer.from(header + '.' + claim), CFG.saKey).toString('base64url');
  const jwt = `${header}.${claim}.${sig}`;
  const body = 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=' + encodeURIComponent(jwt);
  const res = await httpsJSON('oauth2.googleapis.com', '/token', 'POST', body, { 'Content-Type': 'application/x-www-form-urlencoded' });
  if (!res.access_token) throw new Error('gagal ambil access token');
  return res.access_token;
}

// Verifikasi 1 langganan. Return {active, paket, expiresAt} | {active:false, error}
async function verifyPlaySubscription(token, sku) {
  const paket = SKU[sku];
  if (!paket) return { active: false, error: 'sku tak dikenal' };
  if (!CFG.packageName) return { active: false, error: 'PLAY_PACKAGE_NAME belum di-set' };

  const at = await getAccessToken();
  const base = `/androidpublisher/v3/applications/${CFG.packageName}/purchases/subscriptions/${sku}/tokens/${encodeURIComponent(token)}`;
  const res = await httpsJSON('androidpublisher.googleapis.com', base, 'GET', null, { Authorization: 'Bearer ' + at });
  if (res.error) return { active: false, error: (res.error && res.error.message) || 'error Play API' };

  const exp = parseInt(res.expiryTimeMillis || '0', 10);
  const paid = [1, 2].includes(res.paymentState); // 1 = diterima, 2 = free trial
  const active = exp > Date.now() && paid;

  // Acknowledge bila belum (Google auto-refund bila tak di-acknowledge < 3 hari)
  if (active && res.acknowledgementState === 0) {
    try {
      await httpsJSON('androidpublisher.googleapis.com', base + ':acknowledge', 'POST', '{}',
        { Authorization: 'Bearer ' + at, 'Content-Type': 'application/json' });
    } catch (e) { /* non-fatal */ }
  }
  return active ? { active: true, paket, expiresAt: new Date(exp).toISOString() } : { active: false };
}

module.exports = { verifyPlaySubscription, SKU };
