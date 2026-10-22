#!/usr/bin/env node
/*
 * smoke-analytics.js — Uji peristiwa di Chromium (halaman sungguhan).
 * Tanpa Measurement ID, gtag tidak boleh dimuat. Dengan ID tiruan, dataLayer
 * harus menolak sinyal iklan.
 *
 * Pakai (dari root repo, server belum perlu jalan — skrip ini yang menyalakan):
 *   node tools/smoke-analytics.js
 *
 * Butuh paket `playwright` atau `playwright-core` plus Chrome.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

let chromium;
try { ({ chromium } = require('playwright')); }
catch (e) {
  try { ({ chromium } = require('playwright-core')); }
  catch (e2) {
    console.error('playwright tidak terpasang. Uji logika tetap bisa: node tools/uji-analytics.js');
    process.exit(0);
  }
}

const ROOT = path.join(__dirname, '..');
const API = 'https://quran-lens-api.onrender.com';
let ok = 0;
let fail = 0;
const cek = (cond, msg) => {
  if (cond) { ok++; console.log('  ✓ ' + msg); }
  else { fail++; console.log('  ✗ ' + msg); }
};

function startServer() {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      const u = new URL(req.url, 'http://127.0.0.1');
      let rel = decodeURIComponent(u.pathname);
      if (rel === '/') rel = '/index.html';
      const full = path.join(ROOT, rel);
      if (!full.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
      fs.readFile(full, (err, data) => {
        if (err) { res.writeHead(404); res.end('not found'); return; }
        const ext = path.extname(full);
        const type = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml' }[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': type });
        res.end(data);
      });
    });
    srv.listen(0, '127.0.0.1', () => resolve(srv));
  });
}

function logNames(page) {
  return page.evaluate(() => (window.__analyticsLog || []).map((r) => r.name));
}
function findLog(page, name) {
  return page.evaluate((n) => (window.__analyticsLog || []).filter((r) => r.name === n), name);
}

(async () => {
  const srv = await startServer();
  const port = srv.address().port;
  const base = 'http://127.0.0.1:' + port;
  const exe = process.env.CHROME_PATH || '/usr/bin/google-chrome';
  const browser = await chromium.launch({
    executablePath: fs.existsSync(exe) ? exe : undefined,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, serviceWorkers: 'block' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.route('**/*fonts.googleapis.com/**', (r) => r.abort());
  await page.route('**/*fonts.gstatic.com/**', (r) => r.abort());
  await page.route('**/*googletagmanager.com/**', (r) => r.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
  await page.route('**/*google-analytics.com/**', (r) => r.fulfill({ status: 204, body: '' }));
  await page.route(API + '/api/health', (r) => r.fulfill({ json: { ok: true, tanya: true } }));
  await page.route(API + '/api/nahwu/tanya', (r) => r.fulfill({
    status: 200,
    headers: { 'content-type': 'text/event-stream' },
    body: 'data: {"t":"Jawaban uji"}\n\ndata: {"done":true}\n\n',
  }));

  const land = base + '/index.html?utm_source=youtube&utm_medium=deskripsi&utm_campaign=comeback_okt26&utm_content=link1&utm_term=kata&analytics_debug=1';
  console.log('\n[tanpa Measurement ID]');
  await page.goto(land, { waitUntil: 'domcontentloaded', referer: 'https://www.youtube.com/watch?v=rahasia' });
  await page.waitForFunction(() => window.Analytics && window.App);

  const gtagSrc = await page.evaluate(() => [...document.scripts].map((s) => s.src).filter((s) => /googletagmanager|google-analytics|doubleclick/.test(s)));
  cek(gtagSrc.length === 0, 'tidak ada skrip Google');
  const status = await findLog(page, 'ga_status');
  cek(status.length === 1 && status[0].params.active === '0' && status[0].params.page_view === 'nonaktif', 'debug: GA nonaktif, page_view tidak dikirim');

  const attr = await page.evaluate(() => JSON.parse(localStorage.getItem('quranlens_attr')));
  cek(attr.first.utm_source === 'youtube' && attr.last.utm_campaign === 'comeback_okt26', 'UTM first & last tersimpan');
  cek(attr.first.utm_medium === 'deskripsi' && attr.first.utm_content === 'link1' && attr.first.utm_term === 'kata', 'medium, content, term tersimpan');
  cek(attr.first.referrer === 'https://www.youtube.com/watch', 'perujuk YouTube tanpa query');
  cek(attr.exp - attr.first.ts === 90 * 24 * 60 * 60 * 1000, 'masa simpan 90 hari');

  await page.click('.hero-cta .btn.gold');
  await page.waitForFunction(() => (window.__analyticsLog || []).some((r) => r.name === 'episode_read'));
  const baca = await findLog(page, 'episode_read');
  cek(baca.length === 1 && baca[0].params.surah && baca[0].params.ayat && baca[0].params.ft_source === 'youtube', 'episode_read saat Mulai membaca, bawa surah/ayat/UTM');

  await page.evaluate(() => App.gotoEpisode('al-baqarah-1'));
  await page.waitForFunction(() => (window.__analyticsLog || []).filter((r) => r.name === 'episode_read').length >= 2);
  const baca2 = await findLog(page, 'episode_read');
  const alq = baca2[baca2.length - 1].params;
  cek(alq.episode_id === 'al-baqarah-1' && alq.surah === 'Al-Baqarah' && alq.ayat === '1' && /Alif/.test(alq.kata || '') && alq.gratis === '0', 'episode_read Al-Baqarah bawa kata');

  await page.click('.btn-mark');
  const saved = await findLog(page, 'save_episode');
  cek(saved.length === 1 && saved[0].params.episode_id === 'al-baqarah-1', 'save_episode');
  await page.click('.btn-mark');
  const saved2 = await findLog(page, 'save_episode');
  cek(saved2.length === 1, 'melepas tanda tidak mengulang save_episode');

  await page.click('.premium-cta .btn');
  const lanjut = await findLog(page, 'lanjutkan_membaca');
  cek(lanjut.length === 1 && lanjut[0].params.episode_id === 'al-baqarah-1' && lanjut[0].params.lt_medium === 'deskripsi', 'lanjutkan_membaca');
  const modalView = await findLog(page, 'premium_view');
  cek(modalView.some((r) => r.params.surface === 'modal'), 'premium_view modal');

  await page.evaluate(() => {
    window.__opened = [];
    window.open = (url) => { window.__opened.push(String(url)); return null; };
  });
  await page.click('#modalUpgrade .plan');
  const opened = await page.evaluate(() => window.__opened);
  cek(opened.length === 1, 'checkout membuka satu URL');
  if (opened[0]) {
    const u = new URL(opened[0]);
    cek(u.hostname === 'bayu-maulana.myr.id', 'host Mayar tidak berubah');
    cek(u.searchParams.get('utm_source') === 'youtube' && u.searchParams.get('utm_medium') === 'deskripsi' && u.searchParams.get('utm_campaign') === 'comeback_okt26', 'UTM menempel di URL Mayar');
    cek(u.searchParams.get('plan') === 'monthly', 'plan=monthly untuk paket bulanan');
  } else {
    cek(false, 'UTM menempel di URL Mayar');
    cek(false, 'plan=monthly untuk paket bulanan');
  }
  const checkout = await findLog(page, 'premium_checkout_click');
  cek(checkout.length === 1 && checkout[0].params.plan === 'monthly' && checkout[0].params.provider === 'mayar' && checkout[0].params.ft_source === 'youtube', 'premium_checkout_click');

  await page.click('#modalUpgrade .btn.ghost');
  await page.click('.tab[data-tab="beranda"]');
  await page.locator('#pricingBeranda').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => (window.__analyticsLog || []).some((r) => r.name === 'premium_view' && r.params.surface === 'beranda'));
  cek(true, 'premium_view beranda saat harga terlihat');

  await page.click('.tab[data-tab="langganan"]');
  const langganan = await findLog(page, 'premium_view');
  cek(langganan.some((r) => r.params.surface === 'langganan'), 'premium_view tab langganan');

  await page.evaluate(() => {
    const a = document.createElement('a');
    a.href = 'https://www.youtube.com/watch?v=abc';
    a.id = 'yt-test';
    a.textContent = 'yt';
    a.addEventListener('click', (e) => e.preventDefault());
    document.body.appendChild(a);
    const b = document.createElement('a');
    b.href = 'https://www.instagram.com/thequranlens/';
    b.id = 'ig-test';
    b.textContent = 'ig';
    b.addEventListener('click', (e) => e.preventDefault());
    document.body.appendChild(b);
    const c = document.createElement('a');
    c.href = 'https://www.tiktok.com/@thequranlens';
    c.id = 'tt-test';
    c.textContent = 'tt';
    c.addEventListener('click', (e) => e.preventDefault());
    document.body.appendChild(c);
  });
  await page.click('#yt-test');
  await page.click('#ig-test');
  await page.click('#tt-test');
  const names = await logNames(page);
  cek(names.includes('outbound_youtube') && names.includes('outbound_instagram') && names.includes('outbound_tiktok'), 'klik keluar YouTube, Instagram, TikTok');

  await page.click('.tab[data-tab="nahwu"]');
  await page.waitForSelector('#nwAskFab', { state: 'visible', timeout: 8000 });
  await page.click('#nwAskFab');
  await page.fill('#nwAskIn', 'Apa beda isim dan fiil?');
  await page.click('#nwAskSend');
  await page.waitForFunction(() => (window.__analyticsLog || []).some((r) => r.name === 'tanya_ustadz_used'));
  const tanya = await findLog(page, 'tanya_ustadz_used');
  const dumped = JSON.stringify(tanya);
  cek(tanya.length === 1 && !/isim dan fiil/.test(dumped), 'tanya_ustadz_used tanpa isi pertanyaan');

  console.log('\n[kunjungan berikut]');
  await page.goto(base + '/index.html?analytics_debug=1', { waitUntil: 'domcontentloaded' });
  const tetap = await page.evaluate(() => JSON.parse(localStorage.getItem('quranlens_attr')));
  cek(tetap.first.utm_source === 'youtube' && tetap.last.utm_campaign === 'comeback_okt26', 'kunjungan tanpa UTM tidak menimpa atribusi');
  await page.goto(base + '/index.html?utm_source=instagram&utm_medium=bio&utm_campaign=al-ikhlas&analytics_debug=1', { waitUntil: 'domcontentloaded' });
  const baru = await page.evaluate(() => JSON.parse(localStorage.getItem('quranlens_attr')));
  cek(baru.first.utm_source === 'youtube' && baru.last.utm_source === 'instagram' && baru.last.utm_medium === 'bio', 'last-touch berganti, first-touch tetap');

  console.log('\n[ID tiruan]');
  const context2 = await browser.newContext({ viewport: { width: 1280, height: 900 }, serviceWorkers: 'block' });
  const page2 = await context2.newPage();
  page2.on('pageerror', (e) => errors.push(String(e)));
  await page2.route('**/assets/js/ga-config.js', (r) => r.fulfill({
    contentType: 'application/javascript',
    body: 'window.QL_GA_MEASUREMENT_ID = "G-TEST12345";',
  }));
  await page2.route('**/*googletagmanager.com/**', (r) => r.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
  await page2.route('**/*google-analytics.com/**', (r) => r.fulfill({ status: 204, body: '' }));
  await page2.route('**/*doubleclick.net/**', (r) => r.fulfill({ status: 204, body: '' }));
  await page2.route('**/*fonts.googleapis.com/**', (r) => r.abort());
  await page2.route('**/*fonts.gstatic.com/**', (r) => r.abort());
  await page2.goto(base + '/index.html?utm_source=tiktok&utm_medium=story&utm_campaign=comeback_okt26&analytics_debug=1', { waitUntil: 'domcontentloaded' });
  await page2.waitForFunction(() => window.Analytics && window.dataLayer && window.dataLayer.length);
  const srcs = await page2.evaluate(() => [...document.scripts].map((s) => s.src));
  cek(srcs.some((s) => s.indexOf('https://www.googletagmanager.com/gtag/js?id=G-TEST12345') === 0), 'gtag dimuat hanya untuk ID valid');
  cek(!srcs.some((s) => /doubleclick|googleadservices|googlesyndication/.test(s)), 'tidak ada skrip iklan/remarketing');
  const dl = await page2.evaluate(() => window.dataLayer.map((args) => Array.prototype.slice.call(args).map((x) => (x instanceof Date ? 'date' : x))));
  const consent = dl.find((a) => a[0] === 'consent');
  const cfg = dl.find((a) => a[0] === 'config');
  cek(consent && consent[2].ad_storage === 'denied' && consent[2].ad_user_data === 'denied' && consent[2].ad_personalization === 'denied' && consent[2].analytics_storage === 'granted', 'consent iklan ditolak');
  cek(cfg && cfg[2].allow_google_signals === false && cfg[2].allow_ad_personalization_signals === false && cfg[2].send_page_view === true && cfg[2].debug_mode === true, 'Signals mati, page_view otomatis, debug_mode untuk DebugView');
  const st = await page2.evaluate(() => (window.__analyticsLog || []).find((r) => r.name === 'ga_status'));
  cek(st && st.params.active === '1' && st.params.page_view === 'otomatis', 'debug: page_view otomatis saat ID ada');

  console.log('\n[gratis & privasi]');
  const context3 = await browser.newContext({ viewport: { width: 1280, height: 900 }, serviceWorkers: 'block' });
  const page3 = await context3.newPage();
  page3.on('pageerror', (e) => errors.push(String(e)));
  await page3.route('**/*fonts.googleapis.com/**', (r) => r.abort());
  await page3.route('**/*fonts.gstatic.com/**', (r) => r.abort());
  await page3.goto(base + '/gratis.html?utm_source=instagram&utm_medium=bio&utm_campaign=al-ikhlas&analytics_debug=1', { waitUntil: 'domcontentloaded' });
  await page3.waitForFunction(() => (window.__analyticsLog || []).some((r) => r.name === 'episode_read'));
  const etalase = await page3.evaluate(() => (window.__analyticsLog || []).find((r) => r.name === 'episode_read'));
  cek(etalase && etalase.params.episode_id === 'al-ikhlas-1-4' && etalase.params.ft_source === 'instagram' && etalase.params.lt_medium === 'bio', 'gratis.html episode_read + UTM');
  const gtagGratis = await page3.evaluate(() => [...document.scripts].some((s) => /googletagmanager/.test(s.src)));
  cek(!gtagGratis, 'gratis.html tanpa ID tidak memuat gtag');

  const page4 = await context3.newPage();
  page4.on('pageerror', (e) => errors.push(String(e)));
  await page4.goto(base + '/privacy.html?analytics_debug=1', { waitUntil: 'domcontentloaded' });
  await page4.waitForFunction(() => (window.__analyticsLog || []).some((r) => r.name === 'ga_status'));
  const priv = await page4.evaluate(() => (window.__analyticsLog || []).find((r) => r.name === 'ga_status'));
  cek(priv && priv.params.active === '0', 'privacy.html analitik no-op tanpa ID');
  const adaCatatan = await page4.evaluate(() => /Analitik kunjungan/.test(document.body.innerText) && /Google Signals/.test(document.body.innerText));
  cek(adaCatatan, 'halaman privasi menyebut analitik dan menolak Google Signals');

  cek(errors.length === 0, 'tidak ada pageerror (' + errors.join(' | ') + ')');

  await browser.close();
  srv.close();
  console.log('\n' + ok + ' lulus, ' + fail + ' gagal');
  process.exit(fail ? 1 : 0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
