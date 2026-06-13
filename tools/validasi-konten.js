#!/usr/bin/env node
/*
 * validasi-konten.js — Penjaga mutu konten The Quran Lens.
 *
 * Jalankan SEBELUM commit/deploy untuk menangkap kesalahan umum saat menambah
 * episode: field wajib hilang, episode lupa didaftarkan ke MUSIM, jumlah
 * Hikmah Kata tak cocok, kata FOKUS salah ketik, atau ID kembar.
 *
 * Pakai:  node tools/validasi-konten.js
 * Keluar dengan kode 1 bila ada ERROR (cocok untuk CI), 0 bila bersih.
 */
'use strict';
const path = require('path');

// Muat content.js (mengisi global.window.AYAT / MUSIM)
global.window = {};
require(path.join(__dirname, '..', 'assets', 'js', 'content.js'));
const AYAT = global.window.AYAT || [];
const MUSIM = global.window.MUSIM || [];

const errors = [];
const warns = [];
const E = (m) => errors.push(m);
const W = (m) => warns.push(m);

// Buang harakat (samakan dengan app.js) agar pencocokan kata FOKUS tahan-banting
function strip(s) {
  return String(s || '')
    .replace(/[ؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۨ-ۭـ]/g, '')
    .replace(/[آأإٱ]/g, 'ا')
    .replace(/[^ء-ي]/g, '');
}

/* 1. Field wajib + ID unik ----------------------------------------------- */
const WAJIB = ['id', 'arab', 'latin', 'arti', 'surah', 'surahNo', 'ayatNo', 'sumber'];
const seen = new Set();
AYAT.forEach((a, i) => {
  const tag = `AYAT[${i}] (${a.id || '??'})`;
  WAJIB.forEach((f) => {
    if (a[f] === undefined || a[f] === null || a[f] === '') E(`${tag}: field wajib "${f}" hilang/kosong.`);
  });
  if (a.id) {
    if (seen.has(a.id)) E(`ID kembar: "${a.id}" dipakai lebih dari satu kali.`);
    seen.add(a.id);
  }
  // Harus punya minimal satu bentuk Hikmah & satu lapisan makna
  if (!a.hikmah && !Array.isArray(a.hikmahPoin)) W(`${tag}: tak ada "hikmah" atau "hikmahPoin".`);
  if (!a.tafsir) W(`${tag}: tak ada "tafsir".`);
  if (!a.asbabunNuzul) W(`${tag}: tak ada "asbabunNuzul" (boleh ditulis "tidak ada riwayat khusus").`);
  if (!a.amalan) W(`${tag}: tak ada "amalan".`);
  if (!Array.isArray(a.sumber) || !a.sumber.length) E(`${tag}: "sumber" wajib berisi ≥1 rujukan (kredibilitas).`);
});

/* 2. Sinkron AYAT <-> MUSIM ----------------------------------------------- */
const idDiMusim = new Set();
MUSIM.forEach((m) => {
  if (!Array.isArray(m.episodes)) { E(`MUSIM "${m.id}": "episodes" bukan array.`); return; }
  m.episodes.forEach((id) => {
    if (idDiMusim.has(id)) E(`Episode "${id}" terdaftar di lebih dari satu Musim.`);
    idDiMusim.add(id);
    if (!seen.has(id)) E(`MUSIM "${m.id}" menunjuk episode "${id}" yang TIDAK ADA di AYAT.`);
  });
});
AYAT.forEach((a) => {
  if (a.id && !idDiMusim.has(a.id)) E(`Episode "${a.id}" ada di AYAT tapi BELUM didaftarkan ke MUSIM mana pun (tak akan muncul di navigasi).`);
});

/* 3. FOKUS: kata yang di-glow harus benar-benar ada di teks arab ---------- */
AYAT.forEach((a) => {
  if (!Array.isArray(a.fokus)) return;
  const arab = strip(a.arab);
  a.fokus.forEach((k) => {
    if (!arab.includes(strip(k))) W(`FOKUS "${a.id}": kata "${k}" tak ditemukan dalam teks arab (salah ketik?).`);
  });
});

/* 4. Hikmah Kata: jumlah harus cocok dengan kajianKata -------------------- */
AYAT.forEach((a) => {
  if (Array.isArray(a.kajianKata)) {
    const withHikmah = a.kajianKata.filter((k) => k.hikmah).length;
    if (withHikmah && withHikmah !== a.kajianKata.length)
      W(`"${a.id}": Hikmah Kata terisi ${withHikmah}/${a.kajianKata.length}. Lengkapi agar tiap kata punya hikmah.`);
    a.kajianKata.forEach((k, i) => {
      if (!k.kata) E(`"${a.id}" kajianKata[${i}]: field "kata" (teks arab) hilang.`);
      if (!Array.isArray(k.sumber) || !k.sumber.length) W(`"${a.id}" kajianKata[${i}] (${k.latin || '?'}): tanpa "sumber".`);
      if (k.asalKata && !k.asalKata.gambar) E(`"${a.id}" kajianKata[${i}] (${k.latin || '?'}): "asalKata" tanpa "gambar".`);
    });
  }
});

/* Laporan ----------------------------------------------------------------- */
const line = '─'.repeat(60);
console.log(line);
console.log(`The Quran Lens — Validasi Konten`);
console.log(`Episode: ${AYAT.length}  |  Musim: ${MUSIM.length}  |  Terdaftar di navigasi: ${idDiMusim.size}`);
console.log(line);
if (warns.length) {
  console.log(`\n⚠️  PERINGATAN (${warns.length}) — sebaiknya dilengkapi:`);
  warns.forEach((m) => console.log('   • ' + m));
}
if (errors.length) {
  console.log(`\n❌ ERROR (${errors.length}) — WAJIB diperbaiki sebelum tayang:`);
  errors.forEach((m) => console.log('   • ' + m));
  console.log(`\nGagal. Perbaiki ${errors.length} error di atas.\n`);
  process.exit(1);
}
console.log(`\n✅ Bersih. ${warns.length ? `(${warns.length} peringatan, tidak memblokir.)` : 'Tanpa peringatan.'}\n`);
process.exit(0);
