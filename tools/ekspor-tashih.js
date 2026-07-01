#!/usr/bin/env node
/*
 * ekspor-tashih.js — Rangkai SELURUH episode jadi satu dokumen review (HTML)
 * untuk ditashih ustadz/ahli. Tema terang, kontras tinggi, ada kolom catatan
 * tiap episode. Render ke PDF dengan Chromium --print-to-pdf.
 *
 * Pakai:  node tools/ekspor-tashih.js <output.html>
 */
'use strict';
const fs = require('fs');
const path = require('path');
global.window = {};
require(path.join(__dirname, '..', 'assets', 'js', 'content.js'));
const AYAT = global.window.AYAT || [];
const MUSIM = global.window.MUSIM || [];
const cariAyat = global.window.cariAyat;
const out = process.argv[2] || path.join(__dirname, '..', 'tashih.html');
const WORD = out.toLowerCase().endsWith('.doc'); // mode dokumen Word (HTML .doc)

const esc = (s) => String(s == null ? '' : s);

// Urutkan sesuai MUSIM (urutan baca), lalu sisanya
const seen = new Set();
const ordered = [];
MUSIM.forEach((m) => (m.episodes || []).forEach((id) => { const a = cariAyat(id); if (a && !seen.has(id)) { seen.add(id); ordered.push({ a, musim: m.label }); } }));
AYAT.forEach((a) => { if (!seen.has(a.id)) { seen.add(a.id); ordered.push({ a, musim: '(tak terdaftar)' }); } });

// Rentang opsional: node tools/ekspor-tashih.js out.html <mulai> <akhir> (nomor episode, 1-indexed)
const _s = parseInt(process.argv[3], 10), _e = parseInt(process.argv[4], 10);
const _range = Number.isFinite(_s) && Number.isFinite(_e);
const _off = _range ? _s - 1 : 0;
const sel = _range ? ordered.slice(_s - 1, _e) : ordered;

function vizToText(b) {
  if (!b) return '';
  if (b.tipe === 'akar') return `<div class="viz"><b>Akar kata:</b> ${(b.huruf || []).join(' · ')} — ${esc(b.teks)}</div>`;
  if (b.tipe === 'banding') {
    const rows = b.item.map((it) => `<li>${it.alt ? '<span class="alt">[Alternatif]</span>' : '<span class="chosen">[Dipilih]</span>'} <b lang="ar" dir="rtl">${esc(it.arab)}</b> (${esc(it.latin)}): ${(it.sifat || []).map(esc).join('; ')}</li>`).join('');
    return `<div class="viz"><b>Perbandingan:</b><ul>${rows}</ul>${b.catatan ? `<i>Catatan: ${esc(b.catatan)}</i>` : ''}</div>`;
  }
  if (b.tipe === 'hitung') {
    const rows = b.item.map((it) => `<li>${esc(it.label)} — jumlah ${it.jumlah}${it.nuansa ? ` (${esc(it.nuansa)})` : ''}</li>`).join('');
    return `<div class="viz"><b>Hitungan:</b><ul>${rows}</ul>${b.catatan ? `<i>Catatan: ${esc(b.catatan)}</i>` : ''}</div>`;
  }
  if (b.tipe === 'taqdim') return `<div class="viz"><b>Taqdim:</b> ${(b.normal || []).join(' ')} → <b>${(b.quran || []).join(' ')}</b>${b.catatan ? ` — <i>${esc(b.catatan)}</i>` : ''}</div>`;
  return '';
}

function kataBlock(k, i) {
  const blocks = [];
  if (k.akar) blocks.push(vizToText(k.akar));
  if (k.banding) blocks.push(vizToText(k.banding));
  if (k.hitung) blocks.push(vizToText(k.hitung));
  if (k.taqdim) blocks.push(vizToText(k.taqdim));
  if (Array.isArray(k.viz)) k.viz.forEach((v) => blocks.push(vizToText(v)));
  const asal = k.asalKata ? `<div class="viz asal"><b>⌬ Asal-Usul Kata:</b> ${(k.asalKata.huruf || []).join(' · ')} — <i>${esc(k.asalKata.makna)}</i><br>${esc(k.asalKata.gambar)}</div>` : '';
  return `<div class="kata">
    <div class="kata-h"><span class="kn">Kata ${i + 1}</span> <b lang="ar" dir="rtl" class="ar">${esc(k.kata)}</b> — <span class="tr">${esc(k.latin)}</span> · <span class="ar-arti">${esc(k.arti)}</span></div>
    ${Array.isArray(k.poin) ? `<ul class="poin">${k.poin.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
    ${asal}
    ${blocks.join('')}
    ${k.hikmah ? `<div class="mini"><b>Hikmah kata:</b> ${esc(k.hikmah)}</div>` : ''}
    ${Array.isArray(k.sumber) ? `<div class="src">Sumber: ${k.sumber.map(esc).join(' · ')}</div>` : ''}
  </div>`;
}

const lapisan = (a) => [
  ['Asbabun Nuzul', a.asbabunNuzul],
  ['Tafsir', a.tafsir],
  ['Hikmah (ayat)', a.hikmah],
  ['Kajian Linguistik', a.linguistik],
  ['Amalan & Kehidupan', a.amalan],
].filter(([, v]) => v).map(([t, v]) => `<div class="lap"><h4>${t}</h4><p>${esc(v)}</p></div>`).join('');

const episodes = sel.map(({ a, musim }, idx) => `
  <section class="ep">
    <div class="ep-h">
      <span class="ep-no">#${idx + 1 + _off}</span>
      <h2>QS. ${esc(a.surah)} : ${esc(a.ayatNo)} <small>(surah ${a.surahNo} · Juz ${a.juz} · ${esc(musim)} · id: ${esc(a.id)})</small></h2>
    </div>
    <div class="teks">
      <div class="arab" lang="ar" dir="rtl">${esc(a.arab)}</div>
      <div class="latin"><b>Latin:</b> ${esc(a.latin)}</div>
      <div class="arti"><b>Arti:</b> ${esc(a.arti)}</div>
    </div>
    ${Array.isArray(a.kajianKata) && a.kajianKata.length ? `<h3>Kajian Kata demi Kata</h3>${a.kajianKata.map(kataBlock).join('')}` : ''}
    ${Array.isArray(a.hikmahPoin) ? `<div class="lap"><h4>Hikmah (poin)</h4><ul>${a.hikmahPoin.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></div>` : ''}
    <h3>Kajian Ayat Menyeluruh</h3>
    ${lapisan(a)}
    ${Array.isArray(a.sumber) ? `<div class="src big">Rujukan utama: ${a.sumber.map(esc).join(' · ')}</div>` : ''}
    <div class="catatan"><b>Catatan tashih ustadz:</b>
      <p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p></div>
  </section>`).join('');

const html = `${WORD
  ? '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><meta name=ProgId content=Word.Document><!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->'
  : '<!doctype html><html lang="id"><head><meta charset="utf-8">'}<style>
  @page { size: A4; margin: 16mm 14mm; }
  * { box-sizing: border-box; }
  body { font-family: 'Lora', Georgia, serif; color: #1a1a1a; line-height: 1.55; font-size: 11pt; }
  .cover { text-align: center; padding: 30mm 10mm; page-break-after: always; }
  .cover h1 { font-size: 26pt; margin: 0 0 6pt; }
  .cover .sub { font-style: italic; color: #555; font-size: 13pt; }
  .cover .meta { margin-top: 18pt; font-size: 11pt; color: #333; }
  .cover .note { margin-top: 24pt; text-align: left; background: #faf6ea; border: 1px solid #e0d3a8; border-radius: 8px; padding: 14pt 16pt; font-size: 10.5pt; }
  .cover .note b { color: #8a6d12; }
  .ep { page-break-inside: avoid; page-break-before: always; border-top: 2px solid #c9a84c; padding-top: 8pt; margin-top: 10pt; }
  .ep-h { display: flex; align-items: baseline; gap: 8px; }
  .ep-no { background: #8a6d12; color: #fff; font-weight: 700; padding: 1pt 7pt; border-radius: 5px; font-size: 10pt; }
  .ep-h h2 { font-size: 15pt; margin: 0; }
  .ep-h small { font-weight: 400; color: #777; font-size: 8.5pt; }
  .teks { background: #f7f3e8; border: 1px solid #e5dcc2; border-radius: 8px; padding: 10pt 12pt; margin: 8pt 0; }
  .arab { font-family: 'Amiri', 'Traditional Arabic', 'Arabic Typesetting', 'Scheherazade New', serif; font-size: 19pt; line-height: 2; direction: rtl; text-align: right; color: #1a1408; }
  .latin, .arti { font-size: 10.5pt; margin-top: 4pt; }
  h3 { font-size: 11.5pt; color: #8a6d12; border-bottom: 1px solid #e0d3a8; padding-bottom: 2pt; margin: 12pt 0 6pt; text-transform: uppercase; letter-spacing: .04em; }
  .kata { border: 1px solid #e2e2e2; border-left: 3px solid #c9a84c; border-radius: 6px; padding: 8pt 10pt; margin-bottom: 7pt; page-break-inside: avoid; }
  .kata-h { font-size: 11pt; margin-bottom: 4pt; }
  .kata-h .ar { font-family: 'Amiri', 'Traditional Arabic', 'Arabic Typesetting', 'Scheherazade New', serif; font-size: 15pt; }
  .kn { background: #eee; border-radius: 4px; padding: 0 5pt; font-size: 8pt; color: #555; }
  .poin { margin: 4pt 0 4pt 16pt; } .poin li { margin-bottom: 2pt; font-size: 10.5pt; }
  .viz { background: #fbf9f1; border: 1px dashed #d9cba0; border-radius: 5px; padding: 5pt 8pt; margin: 5pt 0; font-size: 10pt; }
  .viz ul { margin: 3pt 0 3pt 16pt; } .viz .ar { font-family: 'Amiri', 'Traditional Arabic', 'Arabic Typesetting', 'Scheherazade New', serif; }
  .viz b[lang="ar"] { font-family: 'Amiri', 'Traditional Arabic', 'Arabic Typesetting', 'Scheherazade New', serif; font-size: 13pt; }
  .asal { background: #f4f8f4; border-color: #bcd; }
  .chosen { color: #1a7a3a; font-weight: 700; } .alt { color: #999; }
  .mini { font-size: 10pt; font-style: italic; color: #444; margin-top: 4pt; }
  .src { font-size: 8.5pt; color: #888; margin-top: 4pt; } .src.big { margin-top: 8pt; }
  .lap { margin: 6pt 0; } .lap h4 { font-size: 10pt; color: #8a6d12; margin: 6pt 0 2pt; } .lap p { font-size: 10.5pt; margin: 0; }
  .catatan { margin-top: 10pt; border: 1px solid #c9a84c; border-radius: 6px; padding: 8pt 10pt; background: #fffdf5; }
  .catatan .lines { height: 60pt; background-image: repeating-linear-gradient(transparent, transparent 19pt, #ddd 19pt, #ddd 20pt); margin-top: 4pt; }
</style></head><body>
  <section class="cover">
    <h1>The Quran Lens</h1>
    <div class="sub">Naskah untuk Tashih (Pemeriksaan Keilmuan)</div>
    <div class="meta">${_range ? `Batch pilot: <b>episode #${_s}–#${_e}</b> (${sel.length} episode)` : `Total: <b>${sel.length} episode</b> · ${MUSIM.length} musim`}<br>Mohon koreksi: teks Arab, transliterasi, terjemah, klaim balaghah/akar kata, & riwayat.</div>
    <div class="note">
      <b>Kepada Ustadz/Ahli yang kami hormati,</b><br><br>
      Mohon berkenan memeriksa naskah ini. Fokus tashih:<br>
      1. Ketepatan <b>teks Arab</b> & harakat.<br>
      2. <b>Transliterasi</b> & <b>terjemahan</b>.<br>
      3. Klaim <b>balaghah & akar kata</b> ("Asal-Usul Kata", "Perbandingan") — apakah sahih & tidak berlebihan.<br>
      4. <b>Asbabun nuzul</b> & sandaran <b>riwayat</b>.<br>
      5. Adab penyampaian.<br><br>
      Tersedia kolom <b>"Catatan tashih"</b> di akhir tiap episode. Jazākumullāhu khairan. 🙏
    </div>
  </section>
  ${episodes}
</body></html>`;

fs.writeFileSync(out, html);
console.log('HTML tashih ditulis:', out, '—', sel.length, 'episode', _range ? `(#${_s}–#${_e})` : '');
