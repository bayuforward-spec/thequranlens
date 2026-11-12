/*
 * premium.js — Konten Premium (lapisan kajian 48 episode berbayar) disimpan di
 * LUAR repo publik dan dibaca server dari PREMIUM_CONTENT_FILE.
 * Produksi (Render): unggah sebagai Secret File "premium-content.json"
 * → tersedia di /etc/secrets/premium-content.json (batas gabungan secret file 1 MB).
 * Format: { versi, dibuat, episode: { "<id>": { tafsir, asbabunNuzul, ... } } }
 * Dibuat oleh tools/pisah-konten-premium.js.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const KANDIDAT = ['/etc/secrets/premium-content.json', path.join(__dirname, '..', 'data', 'premium-content.json')];

function muatPremium(file) {
  const daftar = file ? [file] : KANDIDAT;
  for (const f of daftar) {
    try {
      const j = JSON.parse(fs.readFileSync(f, 'utf8'));
      if (j && j.episode && typeof j.episode === 'object') {
        return { file: f, versi: j.versi || null, episode: j.episode, jumlah: Object.keys(j.episode).length };
      }
    } catch (e) { /* coba kandidat berikutnya */ }
  }
  return { file: null, versi: null, episode: {}, jumlah: 0 };
}

module.exports = { muatPremium };
