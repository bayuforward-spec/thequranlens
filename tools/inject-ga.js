#!/usr/bin/env node
/*
 * inject-ga.js — Ganti token di assets/js/ga-config.js dengan Measurement ID.
 *
 * Dipakai workflow GitHub Actions saat sumber Pages = GitHub Actions.
 * Variable: GA_MEASUREMENT_ID (atau NEXT_PUBLIC_GA_MEASUREMENT_ID).
 * Kosong / tidak valid = token menjadi string kosong, gtag tidak dimuat.
 *
 * Pakai:  GA_MEASUREMENT_ID='G-XXXX' node tools/inject-ga.js [path-file]
 */
const fs = require('fs');
const path = require('path');

const file = process.argv[2] || path.join(__dirname, '..', 'assets', 'js', 'ga-config.js');
const raw = String(process.env.GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '').trim();
const id = /^G-[A-Z0-9]{4,}$/.test(raw) ? raw : '';
const token = '__GA_MEASUREMENT_ID__';

let text;
try { text = fs.readFileSync(file, 'utf8'); }
catch (e) {
  console.error('Tidak bisa membaca ' + file + ': ' + e.message);
  process.exit(1);
}
if (!text.includes(token)) {
  console.error('Token ' + token + ' tidak ditemukan di ' + file);
  process.exit(1);
}
fs.writeFileSync(file, text.split(token).join(id));
console.log(id ? 'GA_MEASUREMENT_ID disuntikkan.' : 'GA_MEASUREMENT_ID kosong — analytics nonaktif.');
