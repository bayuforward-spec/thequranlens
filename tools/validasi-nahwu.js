#!/usr/bin/env node
/*
 * validasi-nahwu.js — Penjaga mutu data "Belajar Nahwu" (assets/js/nahwu-data.js).
 *
 * Memeriksa: 12 pertemuan lengkap, token ayat [kata, I/F/H, r/n/j/z/m, keterangan],
 * indeks jawaban latihan & quiz dalam rentang, widget di materi dikenal, dan
 * menampilkan tautan ayat Nahwu → episode Kajian.
 *
 * Pakai:  node tools/validasi-nahwu.js
 * Keluar dengan kode 1 bila ada ERROR, 0 bila bersih.
 */
'use strict';
const path = require('path');

global.window = {};
require(path.join(__dirname, '..', 'assets', 'js', 'content.js'));
require(path.join(__dirname, '..', 'assets', 'js', 'nahwu-data.js'));
const P = global.window.NAHWU || [];
const W = global.window.NAHWU_WIDGET || {};

const errors = [];
const warns = [];
const E = (m) => errors.push(m);
const Wn = (m) => warns.push(m);
const inRange = (x, n) => Number.isInteger(x) && x >= 0 && x < n;

if (P.length !== 13 || P[0] !== undefined) E(`NAHWU harus berisi indeks 1..12 (panjang ${P.length}).`);

let nKata = 0, nSoal = 0, nQuiz = 0;
for (let i = 1; i <= 12; i++) {
  const p = P[i];
  const tag = `Pertemuan ${i}`;
  if (!p) { E(`${tag}: tidak ada.`); continue; }
  ['title', 'sub', 'materi'].forEach((f) => { if (!p[f] || typeof p[f] !== 'string') E(`${tag}: "${f}" kosong.`); });

  // Widget yang dipakai di materi harus dikenal
  (String(p.materi).match(/data-widget="([^"]+)"/g) || []).forEach((m) => {
    const name = m.slice(13, -1);
    if (!W[name]) E(`${tag}: widget "${name}" tidak ada di NAHWU_WIDGET.`);
  });

  // Analisis ayat
  if (!Array.isArray(p.ayat) || !p.ayat.length) E(`${tag}: "ayat" kosong.`);
  (p.ayat || []).forEach((v, vi) => {
    const vt = `${tag} ayat[${vi}] (${v.ref})`;
    if (!v.ref || !v.id) E(`${vt}: "ref"/"id" kosong.`);
    if (!/^Hadits/.test(v.ref) && !window.nahwuParseRef(v.ref).length) Wn(`${vt}: ref tak berisi nomor surah:ayat.`);
    (v.t || []).forEach((w, wi) => {
      nKata++;
      if (!Array.isArray(w) || w.length !== 4) return E(`${vt} kata[${wi}]: harus [kata, jenis, i'rob, keterangan].`);
      if (!'IFH'.includes(w[1]) || w[1].length !== 1) E(`${vt} kata[${wi}] "${w[0]}": jenis "${w[1]}" bukan I/F/H.`);
      if (!'rnjzm'.includes(w[2]) || w[2].length !== 1) E(`${vt} kata[${wi}] "${w[0]}": i'rob "${w[2]}" bukan r/n/j/z/m.`);
      if (w[1] === 'H' && w[2] !== 'm') Wn(`${vt} "${w[0]}": harf tapi tidak mabni.`);
      if (w[1] === 'I' && w[2] === 'z') E(`${vt} "${w[0]}": isim tidak bisa jazm.`);
      if (w[1] === 'F' && w[2] === 'j') E(`${vt} "${w[0]}": fi'il tidak bisa jer.`);
    });
  });

  // Latihan
  (p.latihan || []).forEach((e, ei) => {
    const et = `${tag} latihan[${ei}]`;
    if (!['classify', 'transform'].includes(e.type)) E(`${et}: type "${e.type}" tak dikenal.`);
    (e.items || []).forEach((it, k) => {
      nSoal++;
      if (e.type === 'transform') { if (!it[0] || !it[1]) E(`${et} item[${k}]: soal/jawaban kosong.`); }
      else if (e.opts) { if (!inRange(it[1], e.opts.length)) E(`${et} item[${k}]: jawaban ${it[1]} di luar opts.`); }
      else if (!Array.isArray(it[1]) || !inRange(it[2], it[1].length)) E(`${et} item[${k}]: pilihan/jawaban tidak valid.`);
    });
  });

  // Quiz
  if (!Array.isArray(p.quiz) || !p.quiz.length) E(`${tag}: "quiz" kosong.`);
  (p.quiz || []).forEach((q, k) => {
    nQuiz++;
    if (!q.q || !Array.isArray(q.o) || !inRange(q.a, q.o.length)) E(`${tag} quiz[${k}]: soal/pilihan/jawaban tidak valid.`);
    if (!q.why) Wn(`${tag} quiz[${k}]: tanpa penjelasan "why".`);
  });
}

// Tautan ke episode Kajian
const tautan = (window.AYAT || []).map((a) => [a.id, window.nahwuUntukEpisode(a)]).filter(([, h]) => h.length);

console.log(`📚 ${P.filter(Boolean).length} pertemuan · ${nKata} kata beranalisis · ${nSoal} soal latihan · ${nQuiz} soal quiz`);
console.log(`🔗 ${tautan.length} episode Kajian bertaut ke analisis nahwu:`);
tautan.forEach(([id, h]) => console.log(`   ${id.padEnd(20)} → ${h.map((x) => `P${x.p}`).join(', ')}`));
warns.forEach((m) => console.log('⚠️  ' + m));
errors.forEach((m) => console.log('❌ ' + m));
console.log(errors.length ? `\n${errors.length} error, ${warns.length} peringatan.` : `\n✅ Bersih (${warns.length} peringatan).`);
process.exit(errors.length ? 1 : 0);
