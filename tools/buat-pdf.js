#!/usr/bin/env node
/*
 * buat-pdf.js — Generator HTML siap-cetak untuk produk PDF "The Quran Lens".
 * Mengambil satu episode dari content.js, merangkainya jadi halaman brand
 * (gelap-emas, serif), lengkap dengan CTA ajakan langganan di akhir.
 *
 * Pakai:  node tools/buat-pdf.js <id-episode> <output.html>
 * Lalu render ke PDF dengan Chromium --print-to-pdf (lihat perintah di chat).
 */
'use strict';
const fs = require('fs');
const path = require('path');
global.window = {};
require(path.join(__dirname, '..', 'assets', 'js', 'content.js'));
const AYAT = global.window.AYAT || [];
const episodeMeta = global.window.episodeMeta;

const id = process.argv[2] || 'al-ikhlas-1-4';
const out = process.argv[3] || path.join(__dirname, '..', `pdf-${id}.html`);
const SITE = 'thequranlensindonesia.com'; // domain brand

const a = AYAT.find((x) => x.id === id);
if (!a) { console.error('Episode tidak ditemukan:', id); process.exit(1); }
const meta = episodeMeta ? episodeMeta(id) : null;

const esc = (s) => String(s == null ? '' : s);

function banding(b) {
  if (!b || b.tipe !== 'banding') return '';
  const adaAlt = b.item.some((it) => it.alt);
  const cards = b.item.map((it) => `
    <div class="vb ${it.alt ? 'alt' : (adaAlt ? 'chosen' : '')}">
      ${adaAlt ? `<div class="vb-tag">${it.alt ? 'Alternatif' : 'Dipilih Al-Qur’an'}</div>` : ''}
      <div class="vb-arab" lang="ar" dir="rtl">${esc(it.arab)}</div>
      ${it.latin ? `<div class="vb-latin">${esc(it.latin)}</div>` : ''}
      <ul class="vb-sifat">${(it.sifat || []).map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
    </div>`).join('');
  return `<div class="banding">${cards}</div>${b.catatan ? `<div class="vb-note">${esc(b.catatan)}</div>` : ''}`;
}

function asal(k) {
  if (!k.asalKata) return '';
  const x = k.asalKata;
  const huruf = Array.isArray(x.huruf) ? x.huruf.join(' · ') : '';
  return `<div class="asal">
    <div class="asal-head">⌬ ASAL-USUL KATA${huruf ? ` · <span lang="ar" dir="rtl">${huruf}</span>` : ''}${x.makna ? ` · <i>${esc(x.makna)}</i>` : ''}</div>
    <p>${esc(x.gambar)}</p>
  </div>`;
}

function kataCard(k, i) {
  const blocks = [];
  if (k.akar && k.akar.tipe === 'akar') blocks.push(`<div class="akar" lang="ar" dir="rtl">${(k.akar.huruf || []).join(' · ')}</div>`);
  return `<div class="kata">
    <div class="kata-no">Kata ${i + 1}</div>
    <div class="kata-arab" lang="ar" dir="rtl">${esc(k.kata)}</div>
    <div class="kata-gloss"><b>${esc(k.latin)}</b> — ${esc(k.arti)}</div>
    ${Array.isArray(k.poin) ? `<ul class="poin">${k.poin.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
    ${asal(k)}
    ${blocks.join('')}
    ${banding(k.banding)}
    ${k.hikmah ? `<div class="hikmah"><span>HIKMAH</span><p>${esc(k.hikmah)}</p></div>` : ''}
    ${Array.isArray(k.sumber) && k.sumber.length ? `<div class="rujukan">Rujukan: ${k.sumber.map(esc).join(' · ')}</div>` : ''}
  </div>`;
}

const lapisan = [
  ['📜', 'Asbabun Nuzul', a.asbabunNuzul],
  ['📖', 'Tafsir', a.tafsir],
  ['🌿', 'Hikmah', a.hikmah],
  ['🤲', 'Amalan & Kehidupan', a.amalan],
].filter(([, , v]) => v);

const html = `<!doctype html>
<html lang="id"><head><meta charset="utf-8">
<style>
  :root{--bg:#080808;--warm:#0c0a07;--gold:#f2d060;--label:#c9a84c;--body:#e1d9c6;--sub:#c8bfaa;--line:rgba(201,168,76,.18);--cardline:rgba(201,168,76,.40);--soft:rgba(242,208,96,.08)}
  @page{size:A4;margin:0}
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:var(--bg);color:var(--body);font-family:'Lora',serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .page{min-height:297mm;padding:24mm 20mm;background:radial-gradient(120% 80% at 50% -10%,#141008,#080808 60%);position:relative;page-break-after:always}
  .frame{position:absolute;inset:10mm;border:1px solid var(--line);pointer-events:none}
  .label{font-family:'Cinzel',serif;letter-spacing:.22em;text-transform:uppercase;color:var(--label)}
  /* Cover */
  .cover{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
  .logo{font-size:54pt;color:var(--gold);text-shadow:0 0 30px rgba(242,208,96,.4)}
  .brand{font-family:'Cinzel',serif;letter-spacing:.34em;font-size:13pt;color:var(--label);margin:10pt 0 4pt}
  .cover-arab{font-family:'Amiri',serif;font-size:46pt;color:var(--gold);direction:rtl;margin:26pt 0 18pt;text-shadow:0 0 36px rgba(242,208,96,.35);line-height:1.7}
  .cover-title{font-family:'Lora','Cormorant Garamond',serif;font-weight:700;font-size:30pt;color:var(--body)}
  .cover-sub{font-family:'Lora','Cormorant Garamond',serif;font-style:italic;font-size:15pt;color:var(--sub);margin-top:8pt}
  .cover-kicker{margin-top:26pt;font-size:8.5pt;letter-spacing:.18em}
  /* Ayah */
  .ayah{background:var(--soft);border:1px solid var(--line);border-radius:10pt;padding:20pt;text-align:center;margin-bottom:16pt}
  .ayah-arab{font-family:'Amiri',serif;font-size:24pt;color:var(--gold);direction:rtl;line-height:2}
  .ayah-latin{font-family:'Lora','Cormorant Garamond',serif;font-style:italic;color:var(--sub);font-size:13pt;margin-top:12pt}
  .ayah-arti{font-family:'Lora','Cormorant Garamond',serif;font-size:14pt;margin-top:6pt}
  /* Kata card */
  .kata{border:1px solid var(--line);border-radius:10pt;padding:16pt 18pt;margin-bottom:14pt;background:linear-gradient(180deg,var(--warm),#0a0805);break-inside:avoid;box-shadow:0 6pt 20pt rgba(0,0,0,.3)}
  .kata-no{font-family:'Cinzel',serif;font-size:7.5pt;letter-spacing:.18em;color:var(--label);text-align:center}
  .kata-arab{font-family:'Amiri',serif;font-size:26pt;color:var(--gold);direction:rtl;text-align:center;margin:6pt 0;text-shadow:0 0 22px rgba(242,208,96,.3)}
  .kata-gloss{text-align:center;font-family:'Lora','Cormorant Garamond',serif;font-style:italic;font-size:13pt;color:var(--sub);margin-bottom:10pt}
  .kata-gloss b{color:var(--label);font-style:normal;font-family:'Cinzel',serif;font-size:9pt;letter-spacing:.08em}
  .poin{list-style:none;margin:8pt 0}
  .poin li{font-family:'Lora','Cormorant Garamond',serif;font-style:italic;font-size:13.5pt;line-height:1.5;padding-left:16pt;position:relative;margin-bottom:6pt}
  .poin li:before{content:'✦';position:absolute;left:0;color:var(--gold);font-size:.8em}
  .poin li b,.asal p b{color:var(--label);font-weight:600;font-style:normal}
  .asal{border:1px solid var(--line);border-left:2.5pt solid var(--label);border-radius:8pt;background:linear-gradient(180deg,var(--soft),transparent);padding:11pt 13pt;margin:10pt 0}
  .asal-head{font-family:'Cinzel',serif;font-size:7.5pt;letter-spacing:.12em;color:var(--label);margin-bottom:6pt}
  .asal-head span{font-family:'Amiri',serif;font-size:11pt;color:var(--gold)}
  .asal p{font-size:11.5pt;line-height:1.65;color:var(--body)}
  .akar{font-family:'Amiri',serif;color:var(--gold);text-align:center;font-size:15pt;margin:6pt 0}
  .banding{display:flex;gap:8pt;margin:10pt 0}
  .vb{flex:1;border:1px solid var(--line);border-radius:8pt;padding:10pt;text-align:center;background:var(--soft)}
  .vb.chosen{border-color:var(--cardline);box-shadow:inset 0 0 0 .5pt var(--cardline)}
  .vb.alt{opacity:.62}
  .vb-tag{font-family:'Cinzel',serif;font-size:6.5pt;letter-spacing:.1em;color:var(--label);margin-bottom:4pt}
  .vb-arab{font-family:'Amiri',serif;font-size:16pt;color:var(--gold);direction:rtl}
  .vb-latin{font-family:'Cinzel',serif;font-size:8pt;letter-spacing:.06em;color:var(--label);margin:3pt 0 6pt}
  .vb-sifat{list-style:none;text-align:left}
  .vb-sifat li{font-size:9.5pt;line-height:1.4;color:var(--sub);padding-left:9pt;position:relative;margin-bottom:2pt}
  .vb-sifat li:before{content:'·';position:absolute;left:2pt;color:var(--gold)}
  .vb-note{font-family:'Lora','Cormorant Garamond',serif;font-style:italic;text-align:center;color:var(--label);font-size:12pt;margin-top:4pt}
  .hikmah{border-top:1px solid var(--line);margin-top:12pt;padding-top:10pt}
  .hikmah span{font-family:'Cinzel',serif;font-size:7pt;letter-spacing:.18em;color:var(--label)}
  .hikmah p{font-family:'Lora','Cormorant Garamond',serif;font-style:italic;font-size:14pt;color:var(--gold);margin-top:4pt;line-height:1.4}
  .rujukan{font-size:8.5pt;color:var(--sub);opacity:.8;margin-top:10pt}
  .section-title{font-family:'Cinzel',serif;letter-spacing:.18em;color:var(--gold);font-size:11pt;text-align:center;margin:20pt 0 12pt;text-transform:uppercase}
  .lapisan{border:1px solid var(--line);border-radius:10pt;padding:14pt 16pt;margin-bottom:12pt;break-inside:avoid}
  .lapisan h3{font-family:'Cinzel',serif;font-size:9pt;letter-spacing:.14em;color:var(--label);text-transform:uppercase;margin-bottom:7pt}
  .lapisan p{font-size:12pt;line-height:1.7;color:var(--body)}
  /* CTA */
  .cta{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
  .cta-q{font-family:'Lora','Cormorant Garamond',serif;font-style:italic;font-size:18pt;color:var(--sub);max-width:130mm;line-height:1.5}
  .cta-big{font-family:'Lora','Cormorant Garamond',serif;font-weight:700;font-size:26pt;color:var(--gold);margin:14pt 0;text-shadow:0 0 30px rgba(242,208,96,.3)}
  .cta-url{font-family:'Cinzel',serif;letter-spacing:.16em;font-size:14pt;color:var(--body);border:1px solid var(--cardline);border-radius:999pt;padding:10pt 22pt;margin-top:8pt}
  .cta-note{font-size:9pt;color:var(--sub);opacity:.75;margin-top:30pt;max-width:130mm;line-height:1.6}
  .foot{position:absolute;bottom:14mm;left:0;right:0;text-align:center;font-family:'Cinzel',serif;font-size:7pt;letter-spacing:.2em;color:var(--label);opacity:.7}
</style></head><body>

<section class="page cover"><div class="frame"></div>
  <div class="logo">۞</div>
  <div class="brand">THE QURAN LENS</div>
  <div class="label" style="font-size:8pt">Melihat melalui kata</div>
  <div class="cover-arab" lang="ar" dir="rtl">${esc(a.arab)}</div>
  <div class="cover-title">QS. ${esc(a.surah)} : ${esc(a.ayatNo)}</div>
  <div class="cover-sub">Membedah setiap kata — kenapa Allah memilihnya, bukan yang lain</div>
  <div class="cover-kicker label">${meta ? esc(meta.musim.label) + ' · Episode ' + meta.no : 'Edisi Pilihan'}</div>
  <div class="foot">THE QURAN LENS · ${SITE}</div>
</section>

<section class="page"><div class="frame"></div>
  <div class="ayah">
    <div class="ayah-arab" lang="ar" dir="rtl">${esc(a.arab)}</div>
    <div class="ayah-latin">${esc(a.latin)}</div>
    <div class="ayah-arti">“${esc(a.arti)}”</div>
  </div>
  <div class="section-title">Kajian Kata demi Kata</div>
  ${(a.kajianKata || []).map(kataCard).join('')}
  ${lapisan.length ? `<div class="section-title">Kajian Ayat Menyeluruh</div>${lapisan.map(([ic, t, v]) => `<div class="lapisan"><h3>${ic} ${t}</h3><p>${esc(v)}</p></div>`).join('')}` : ''}
  ${Array.isArray(a.sumber) ? `<div class="rujukan" style="text-align:center;margin-top:14pt">Rujukan utama: ${a.sumber.map(esc).join(' · ')}</div>` : ''}
  <div class="foot">THE QURAN LENS · ${SITE}</div>
</section>

<section class="page cta"><div class="frame"></div>
  <div class="logo" style="font-size:34pt">۞</div>
  <div class="cta-q">Ini baru <b>1 kata kunci dari 1 surah</b>.<br>Setiap ayat menyimpan pilihan kata yang mengubah cara kita membaca.</div>
  <div class="cta-big">Eksplor seluruhnya.</div>
  <div class="cta-q" style="font-size:14pt">Puluhan episode interaktif — Al-Fātiḥah, Ayat Kursi, hingga Juz 30 lengkap — kajian kata demi kata, perbandingan, & hikmah.</div>
  <div class="cta-url">${SITE}</div>
  <div class="label" style="font-size:9pt;margin-top:12pt">Mulai dari Rp 49.000 / bulan · batal kapan saja</div>
  <div class="cta-note">Konten edukatif. Rujukan tafsir mu'tabar (Ibnu Katsir, As-Sa‘di, Al-Qurthubi, dll). Untuk pendalaman, rujuk ulama & guru terpercaya. © The Quran Lens.</div>
  <div class="foot">MELIHAT MELALUI KATA</div>
</section>

</body></html>`;

fs.writeFileSync(out, html);
console.log('HTML ditulis:', out);
