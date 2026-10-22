#!/usr/bin/env node
/*
 * inject-ga.js — Timpa Measurement ID di assets/js/ga-config.js.
 *
 * Dipakai workflow GitHub Actions bila sumber Pages = GitHub Actions.
 * Deploy dari branch tidak menjalankan skrip ini; yang terbit adalah
 * nilai yang sudah tertulis di ga-config.js.
 *
 * Variable: GA_MEASUREMENT_ID (atau NEXT_PUBLIC_GA_MEASUREMENT_ID).
 *   - kosong / tidak di-set → file tidak diubah (nilai di repo tetap)
 *   - G-XXXXXXXX yang valid → menimpa nilai di file
 *   - off → menulis string kosong (gtag tidak dimuat)
 *
 * Pakai:  GA_MEASUREMENT_ID='G-XXXX' node tools/inject-ga.js [path-file]
 */
const fs = require('fs');
const path = require('path');

const file = process.argv[2] || path.join(__dirname, '..', 'assets', 'js', 'ga-config.js');
const raw = String(process.env.GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '').trim();
const ASSIGN = /window\.QL_GA_MEASUREMENT_ID\s*=\s*(?:"[^"]*"|'[^']*')/;
const TOKEN = '__GA_MEASUREMENT_ID__';

let text;
try { text = fs.readFileSync(file, 'utf8'); }
catch (e) {
  console.error('Tidak bisa membaca ' + file + ': ' + e.message);
  process.exit(1);
}

if (!raw) {
  console.log('GA_MEASUREMENT_ID tidak di-set — nilai di ga-config.js dipakai apa adanya.');
  process.exit(0);
}

let id;
if (/^(off|disabled|none)$/i.test(raw)) id = '';
else if (/^G-[A-Z0-9]{4,}$/.test(raw)) id = raw;
else {
  console.error('GA_MEASUREMENT_ID tidak valid (pakai G-… atau off): ' + raw);
  process.exit(1);
}

if (text.includes(TOKEN)) {
  text = text.split(TOKEN).join(id);
} else if (ASSIGN.test(text)) {
  text = text.replace(ASSIGN, 'window.QL_GA_MEASUREMENT_ID = "' + id + '"');
} else {
  console.error('Penugasan window.QL_GA_MEASUREMENT_ID tidak ditemukan di ' + file);
  process.exit(1);
}
fs.writeFileSync(file, text);
console.log(id ? 'GA_MEASUREMENT_ID ditimpa menjadi ' + id + '.' : 'GA_MEASUREMENT_ID dikosongkan — analytics nonaktif.');
