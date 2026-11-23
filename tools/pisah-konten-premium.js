#!/usr/bin/env node
/*
 * pisah-konten-premium.js — Pisahkan lapisan Premium dari content.js publik.
 *
 * Sumber kebenaran konten LENGKAP disimpan di LUAR repo publik (mis. folder
 * pribadi di box). Alat ini menghasilkan:
 *   1. assets/js/content.js (publik): metadata, teks ayat, terjemah, hikmah,
 *      catatan ustadz, kartu kata pertama, dan cuplikan ≤130 huruf untuk lapisan terkunci.
 *   2. premium-content.json (RAHASIA): lapisan lengkap per episode berbayar,
 *      diunggah sebagai Render Secret File → /etc/secrets/premium-content.json.
 *
 * Pakai:
 *   node tools/pisah-konten-premium.js --sumber <content-lengkap.js> \
 *        --publik assets/js/content.js --premium <di-luar-repo>/premium-content.json
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const TEASER = 130;
// Lapisan yang ditampilkan sebagai cuplikan saat terkunci (lihat App.LAPISAN di app.js)
const LAPISAN_CUPLIKAN = ['asbabunNuzul', 'tafsir', 'linguistik', 'amalan'];
// Hanya tampil bila terbuka → tidak ikut ke berkas publik
const LAPISAN_TERTUTUP = ['tadabbur', 'visual'];
// Episode "etalase" yang sengaja tampil utuh di halaman publik (gratis.html →
// cariAyat('al-ikhlas-1-4')). Tetap utuh di content.js agar lead magnet tak berubah.
const ETALASE_UTUH = ['al-ikhlas-1-4'];

function cuplik(teks) {
  const t = String(Array.isArray(teks) ? teks.join(' ') : (teks || '')).replace(/\s+/g, ' ').trim();
  return t.length > TEASER ? t.slice(0, TEASER) + '…' : t;
}

function muatAyat(src) {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(src, ctx, { filename: 'content.js' });
  return ctx.window.AYAT || [];
}

/* HIKMAH_KATA (hikmah per kata) ditempel ke kajianKata saat content.js dimuat.
 * Untuk episode premium, hanya hikmah kata PERTAMA (kartu cicipan) yang tetap publik. */
function saringHikmahKata(src, idPremium) {
  const awal = src.indexOf('const HIKMAH_KATA = {');
  if (awal < 0) return src;
  const penanda = src.indexOf('\nAYAT.forEach(a => {\n  const hk', awal);
  if (penanda < 0) throw new Error('Blok penerap HIKMAH_KATA tidak dikenali');
  const akhir = src.lastIndexOf('};', penanda);
  const literal = src.slice(awal + 'const HIKMAH_KATA = '.length, akhir + 1);
  const obj = vm.runInNewContext('(' + literal + ')');
  const tersaring = {};
  for (const [id, daftar] of Object.entries(obj)) tersaring[id] = idPremium.has(id) ? daftar.slice(0, 1) : daftar;
  return src.slice(0, awal) + 'const HIKMAH_KATA = ' + JSON.stringify(tersaring, null, 2) + ';' + src.slice(akhir + 2);
}

function pisah(src, { etalase = ETALASE_UTUH } = {}) {
  const AYAT = muatAyat(src);
  const premium = {};
  const publik = AYAT.map((a) => {
    if (a.gratis || etalase.includes(a.id)) return a;
    const p = {};
    const s = { ...a };
    for (const k of [...LAPISAN_CUPLIKAN, ...LAPISAN_TERTUTUP]) {
      if (a[k] === undefined) continue;
      p[k] = a[k];
      if (LAPISAN_CUPLIKAN.includes(k)) s[k] = cuplik(a[k]); else delete s[k];
    }
    if (Array.isArray(a.kajianKata) && a.kajianKata.length > 1) {
      p.kajianKata = a.kajianKata;
      s.kajianKata = a.kajianKata.map((k, i) => (i === 0 ? k : {
        kata: k.kata, latin: k.latin, arti: k.arti, poin: [cuplik(k.poin || [])],
      }));
    }
    s.premium = true;
    premium[a.id] = p;
    return s;
  });
  // Ganti literal array AYAT di sumber (bagian lain file dibiarkan apa adanya)
  const awal = src.indexOf('const AYAT = [');
  const penanda = src.indexOf('\nfunction ayatHariIni');
  if (awal < 0 || penanda < 0) throw new Error('Struktur content.js tidak dikenali (const AYAT / function ayatHariIni)');
  const akhir = src.lastIndexOf('];', penanda);
  if (akhir < awal) throw new Error('Akhir array AYAT tidak ditemukan');
  const catatan = '/* Lapisan Premium (episode berbayar) TIDAK ada di berkas publik ini; disajikan\n' +
    ' * server lewat /api/premium/episode/:id. Jangan sunting manual: dibuat oleh\n' +
    ' * tools/pisah-konten-premium.js dari sumber lengkap di luar repo. */\n';
  let baru = src.slice(0, awal) + catatan + 'const AYAT = ' + JSON.stringify(publik, null, 2) + ';' + src.slice(akhir + 2);
  baru = saringHikmahKata(baru, new Set(Object.keys(premium)));
  return { publikJs: baru, premium: { versi: new Date().toISOString().slice(0, 10), episode: premium }, jumlahPremium: Object.keys(premium).length, total: AYAT.length };
}

if (require.main === module) {
  const arg = (n) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : ''; };
  const sumber = arg('--sumber');
  const keluarPublik = arg('--publik') || path.join(__dirname, '..', 'assets', 'js', 'content.js');
  const keluarPremium = arg('--premium');
  if (!sumber || !keluarPremium) {
    console.error('Pakai: node tools/pisah-konten-premium.js --sumber <lengkap.js> --publik assets/js/content.js --premium <luar-repo>/premium-content.json');
    process.exit(2);
  }
  const repo = path.resolve(__dirname, '..');
  if (path.resolve(keluarPremium).startsWith(repo + path.sep) && !path.resolve(keluarPremium).includes(path.join('server', 'data'))) {
    console.error('Menolak menulis premium-content.json di dalam repo publik. Pilih folder di luar repo (atau server/data/ yang di-.gitignore).');
    process.exit(2);
  }
  const h = pisah(fs.readFileSync(sumber, 'utf8'));
  fs.writeFileSync(keluarPublik, h.publikJs);
  fs.mkdirSync(path.dirname(keluarPremium), { recursive: true });
  fs.writeFileSync(keluarPremium, JSON.stringify(h.premium));
  const ukuran = fs.statSync(keluarPremium).size;
  console.log(`Selesai: ${h.total} episode, ${h.jumlahPremium} premium dipisah. premium-content.json ${(ukuran / 1024).toFixed(0)} KB${ukuran > 1000000 ? ' — MELEBIHI batas 1 MB Render Secret File!' : ''}.`);
}

module.exports = { pisah, cuplik, ETALASE_UTUH };
