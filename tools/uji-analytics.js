#!/usr/bin/env node
/*
 * uji-analytics.js — Uji logika atribusi & GA4 tanpa jaringan.
 * Measurement ID tidak boleh tertanam di kode. Tanpa ID, gtag tidak dimuat.
 *
 * Pakai:  node tools/uji-analytics.js
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const root = path.join(__dirname, '..');
let ok = 0;
let fail = 0;
function cek(cond, msg) {
  if (cond) { ok++; console.log('  ✓ ' + msg); }
  else { fail++; console.log('  ✗ ' + msg); }
}

function memStore() {
  const m = new Map();
  return {
    getItem(k) { return m.has(k) ? m.get(k) : null; },
    setItem(k, v) { m.set(String(k), String(v)); },
    removeItem(k) { m.delete(k); },
  };
}

function boot(opts) {
  opts = opts || {};
  const href = opts.href || 'https://thequranlensindonesia.com/';
  const u = new URL(href);
  const location = {
    href: u.href,
    search: u.search,
    pathname: u.pathname,
    protocol: u.protocol,
    hostname: u.hostname,
    origin: u.origin,
  };
  const scripts = [];
  const listeners = [];
  let cookieJar = '';
  const document = {
    referrer: opts.referrer || '',
    head: { appendChild(el) { scripts.push(el); } },
    documentElement: { appendChild(el) { scripts.push(el); } },
    addEventListener(type, fn, cap) { listeners.push({ type, fn, cap }); },
    getElementById() { return null; },
    createElement() { return { async: false, src: '', id: '' }; },
  };
  Object.defineProperty(document, 'cookie', {
    get() { return cookieJar; },
    set(v) { cookieJar = String(v).split(';')[0]; },
  });
  const window = { location, document, dataLayer: [] };
  window.window = window;
  const logs = [];
  const context = {
    window,
    document,
    location,
    localStorage: opts.localStorage || memStore(),
    sessionStorage: memStore(),
    URL,
    URLSearchParams,
    console: {
      info: (...a) => logs.push(a),
      log() {},
      warn() {},
      error() {},
    },
    Date,
    encodeURIComponent,
    decodeURIComponent,
    setTimeout,
    clearTimeout,
  };
  context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, 'assets/js/ga-config.js'), 'utf8'), context);
  if (opts.id !== undefined) context.window.QL_GA_MEASUREMENT_ID = opts.id;
  vm.runInContext(fs.readFileSync(path.join(root, 'assets/js/analytics.js'), 'utf8'), context);
  context.window.__scripts = scripts;
  context.window.__logs = logs;
  context.window.__listeners = listeners;
  return context;
}

function setLocation(ctx, href, referrer) {
  const u = new URL(href);
  ctx.location.href = u.href;
  ctx.location.search = u.search;
  ctx.location.pathname = u.pathname;
  ctx.location.protocol = u.protocol;
  ctx.location.hostname = u.hostname;
  ctx.location.origin = u.origin;
  if (referrer !== undefined) ctx.document.referrer = referrer;
}

const syntax = [
  'assets/js/analytics.js',
  'assets/js/ga-config.js',
  'assets/js/app.js',
  'assets/js/payment.js',
  'assets/js/nahwu-tanya.js',
  'sw.js',
  'tools/inject-ga.js',
  'tools/smoke-analytics.js',
];
console.log('\n[sintaks]');
syntax.forEach((rel) => {
  try {
    execFileSync(process.execPath, ['--check', path.join(root, rel)], { stdio: 'pipe' });
    cek(true, 'node --check ' + rel);
  } catch (e) {
    cek(false, 'node --check ' + rel);
  }
});

console.log('\n[tanpa ID]');
{
  const analyticsSrc = fs.readFileSync(path.join(root, 'assets/js/analytics.js'), 'utf8');
  const configSrc = fs.readFileSync(path.join(root, 'assets/js/ga-config.js'), 'utf8');
  cek(!/G-[A-Z0-9]{4,}/.test(analyticsSrc), 'analytics.js tidak menyimpan Measurement ID');
  cek(configSrc.includes('window.QL_GA_MEASUREMENT_ID = "G-6QBQF976B0"'), 'ga-config.js memakai ID produksi');
  const kosong = boot({ href: 'https://thequranlensindonesia.com/?analytics_debug=1', id: '' });
  const A0 = kosong.window.Analytics;
  cek(A0.measurementId() === '', 'string kosong bukan ID valid');
  A0.debug = true;
  A0.mountGtag();
  cek(kosong.window.__scripts.length === 0, 'gtag.js tidak dimuat bila ID kosong');
  cek(!kosong.window.gtag, 'fungsi gtag tidak dibuat bila ID kosong');
  const noted = kosong.window.__logs.some((row) => row[0] === '[analytics]' && row[1] === 'ga_status' && row[2].active === '0');
  cek(noted, 'debug mencatat GA nonaktif');

  const bawaan = boot({ href: 'https://thequranlensindonesia.com/?analytics_debug=1' });
  const A1 = bawaan.window.Analytics;
  A1.debug = true;
  cek(A1.measurementId() === 'G-6QBQF976B0', 'nilai di ga-config.js langsung dipakai (tanpa build)');
  A1.mountGtag();
  cek(bawaan.window.__scripts.length === 1 && bawaan.window.__scripts[0].src.indexOf('id=G-6QBQF976B0') !== -1, 'deploy branch memuat gtag dengan ID di file');
}

console.log('\n[ID valid]');
{
  const ctx = boot({
    href: 'https://thequranlensindonesia.com/?utm_source=youtube&analytics_debug=1',
    id: 'G-TEST12345',
  });
  const A = ctx.window.Analytics;
  A.debug = true;
  A.capture();
  A.mountGtag();
  cek(A.measurementId() === 'G-TEST12345', 'ID G-TEST12345 diterima');
  cek(ctx.window.__scripts.length === 1, 'satu skrip gtag');
  cek(ctx.window.__scripts[0].src.indexOf('https://www.googletagmanager.com/gtag/js?id=G-TEST12345') === 0, 'src gtag benar');
  cek(ctx.window.__scripts[0].src.indexOf('doubleclick') === -1, 'bukan skrip iklan');
  const dl = ctx.window.dataLayer.map((args) => Array.prototype.slice.call(args));
  const sets = dl.filter((a) => a[0] === 'set');
  cek(sets.some((a) => a[1] === 'allow_google_signals' && a[2] === false), 'Google Signals mati');
  cek(sets.some((a) => a[1] === 'allow_ad_personalization_signals' && a[2] === false), 'personalisasi iklan mati');
  const consent = dl.find((a) => a[0] === 'consent' && a[1] === 'default');
  cek(consent && consent[2].ad_storage === 'denied' && consent[2].ad_personalization === 'denied' && consent[2].analytics_storage === 'granted', 'consent: iklan ditolak, analitik diizinkan');
  const cfg = dl.find((a) => a[0] === 'config');
  cek(cfg && cfg[1] === 'G-TEST12345' && cfg[2].send_page_view === true && cfg[2].allow_google_signals === false && cfg[2].debug_mode === true, 'config page_view otomatis, signals mati, debug_mode');
  cek(cfg[2].page_location.indexOf('analytics_debug') === -1, 'analytics_debug tidak ikut ke page_location');
  cek(cfg[2].page_location.indexOf('utm_source=youtube') !== -1, 'UTM tetap di page_location');
}

console.log('\n[ID ditolak]');
['', 'G-', 'UA-123', 'g-test1234', '__GA_MEASUREMENT_ID__', 'G-AB'].forEach((bad) => {
  const ctx = boot({ id: bad });
  cek(ctx.window.Analytics.measurementId() === '', 'ditolak: ' + JSON.stringify(bad));
});

console.log('\n[first-touch & last-touch]');
{
  const ctx = boot({
    href: 'https://thequranlensindonesia.com/gratis.html?utm_source=youtube&utm_medium=deskripsi&utm_campaign=comeback_okt26&utm_content=link1&utm_term=kata&analytics_debug=1',
    referrer: 'https://www.youtube.com/watch?v=rahasia',
  });
  const A = ctx.window.Analytics;
  A.capture();
  let s = A.read();
  cek(s.first.utm_source === 'youtube' && s.last.utm_source === 'youtube', 'kunjungan pertama mengisi first dan last');
  cek(s.first.utm_medium === 'deskripsi' && s.first.utm_campaign === 'comeback_okt26', 'medium & campaign tersimpan');
  cek(s.first.utm_content === 'link1' && s.first.utm_term === 'kata', 'content & term tersimpan');
  cek(s.first.referrer === 'https://www.youtube.com/watch', 'perujuk tanpa query');
  cek(s.first.landing_page.indexOf('gratis.html') !== -1 && s.first.landing_page.indexOf('analytics_debug') === -1, 'halaman masuk tanpa flag debug');
  cek(s.exp - s.first.ts === A.TTL_MS, 'kedaluwarsa 90 hari');

  setLocation(ctx, 'https://thequranlensindonesia.com/', 'https://thequranlensindonesia.com/gratis.html');
  A.capture();
  s = A.read();
  cek(s.first.utm_source === 'youtube' && s.last.utm_campaign === 'comeback_okt26', 'kunjungan langsung tidak menimpa last-touch');

  setLocation(ctx, 'https://thequranlensindonesia.com/?utm_source=instagram&utm_medium=bio&utm_campaign=al_ikhlas', 'https://l.instagram.com/');
  A.capture();
  s = A.read();
  cek(s.first.utm_source === 'youtube' && s.first.utm_medium === 'deskripsi', 'first-touch tetap YouTube');
  cek(s.last.utm_source === 'instagram' && s.last.utm_medium === 'bio' && s.last.utm_campaign === 'al_ikhlas', 'last-touch jadi Instagram');
  cek(s.last.referrer === 'https://l.instagram.com/', 'perujuk last-touch');

  const p = A.attributionParams();
  cek(p.ft_source === 'youtube' && p.ft_medium === 'deskripsi' && p.ft_campaign === 'comeback_okt26', 'param ft_*');
  cek(p.lt_source === 'instagram' && p.lt_medium === 'bio' && p.lt_campaign === 'al_ikhlas', 'param lt_*');
  cek(p.ft_referrer === 'https://www.youtube.com/watch' && p.lt_landing.indexOf('utm_source=instagram') !== -1, 'perujuk & landing di param');

  A.debug = true;
  A.event('premium_checkout_click', { plan: 'yearly', provider: 'mayar' });
  const row = ctx.window.__logs.filter((r) => r[1] === 'premium_checkout_click').pop();
  cek(row && row[2].plan === 'yearly' && row[2].ft_source === 'youtube' && row[2].lt_source === 'instagram', 'konversi membawa first dan last touch');

  const mayar = A.decorateMayar('https://bayu-maulana.myr.id/m/the-quran-lens', 'Tahunan');
  const mu = new URL(mayar);
  cek(mu.searchParams.get('utm_source') === 'instagram', 'URL Mayar memakai last-touch source');
  cek(mu.searchParams.get('utm_medium') === 'bio' && mu.searchParams.get('utm_campaign') === 'al_ikhlas', 'URL Mayar medium & campaign');
  cek(mu.searchParams.get('plan') === 'yearly', 'URL Mayar plan=yearly');
  cek(A.decorateMayar('https://bayu-maulana.myr.id/m/the-quran-lens', 'Bulanan').includes('plan=monthly'), 'plan bulanan = monthly');
  cek(A.decorateMayar('bukan-url', 'Bulanan') === 'bukan-url', 'URL rusak tidak diubah');
}

console.log('\n[kedaluwarsa & cookie]');
{
  const ctx = boot({ href: 'https://thequranlensindonesia.com/?utm_source=tiktok&utm_medium=story&utm_campaign=video-slug' });
  const A = ctx.window.Analytics;
  const lama = {
    v: 1, exp: Date.now() - 1000,
    first: { utm_source: 'community', utm_medium: 'kartu', utm_campaign: 'lama', utm_content: '', utm_term: '', referrer: '', landing_page: '/', ts: 1 },
    last: { utm_source: 'community', utm_medium: 'kartu', utm_campaign: 'lama', utm_content: '', utm_term: '', referrer: '', landing_page: '/', ts: 1 },
  };
  ctx.localStorage.setItem(A.KEY, JSON.stringify(lama));
  A.capture();
  const s = A.read();
  cek(s.first.utm_source === 'tiktok' && s.last.utm_medium === 'story', 'rekaman kedaluwarsa diganti kunjungan baru');
}

{
  const broken = {
    getItem() { throw new Error('denied'); },
    setItem() { throw new Error('denied'); },
  };
  const ctx = boot({
    href: 'https://thequranlensindonesia.com/?utm_source=community&utm_medium=kartu&utm_campaign=comeback_okt26',
    localStorage: broken,
  });
  const A = ctx.window.Analytics;
  A.capture();
  cek(ctx.document.cookie.indexOf('quranlens_attr=') === 0, 'cookie cadangan saat localStorage ditolak');
  const s = A.read();
  cek(s && s.first.utm_source === 'community' && s.first.utm_medium === 'kartu', 'atribusi terbaca balik dari cookie');
}

console.log('\n[peristiwa]');
{
  const ctx = boot({ href: 'https://thequranlensindonesia.com/?utm_source=youtube&utm_medium=komentar_tersemat&utm_campaign=comeback_okt26', id: 'G-TEST12345' });
  const A = ctx.window.Analytics;
  A.debug = true;
  A.capture();
  A.mountGtag();
  A.episodeRead({ id: 'al-baqarah-1', surah: 'Al-Baqarah', ayatNo: '1', gratis: false, kajianKata: [{ latin: 'Alif Lām Mīm' }] });
  A.eventOnce('premium:beranda', 'premium_view', { surface: 'beranda' });
  A.eventOnce('premium:beranda', 'premium_view', { surface: 'beranda' });
  const names = ctx.window.__logs.map((r) => r[1]);
  cek(names.filter((n) => n === 'episode_read').length === 1, 'episode_read sekali');
  cek(names.filter((n) => n === 'premium_view').length === 1, 'premium_view tidak dobel per permukaan');
  const ep = ctx.window.__logs.find((r) => r[1] === 'episode_read')[2];
  cek(ep.surah === 'Al-Baqarah' && ep.ayat === '1' && ep.kata === 'Alif Lām Mīm' && ep.episode_id === 'al-baqarah-1' && ep.gratis === '0', 'episode_read bawa surah, ayat, kata');
  cek(ep.ft_source === 'youtube' && ep.lt_medium === 'komentar_tersemat', 'episode_read bawa atribusi');
  const ev = ctx.window.dataLayer.map((a) => Array.prototype.slice.call(a)).filter((a) => a[0] === 'event');
  cek(ev.some((a) => a[1] === 'episode_read' && a[2].lt_source === 'youtube'), 'gtag menerima episode_read');
  cek(!ev.some((a) => a[1] === 'page_view'), 'page_view tidak dikirim manual');

  cek(A.platformOf('www.youtube.com') === 'youtube' && A.platformOf('youtu.be') === 'youtube', 'host YouTube');
  cek(A.platformOf('instagram.com') === 'instagram' && A.platformOf('vm.tiktok.com') === 'tiktok', 'host IG & TikTok');
  cek(A.platformOf('mayar.id') === '' && A.platformOf('thequranlensindonesia.com') === '', 'host lain bukan outbound kanal');
  A.onOutboundClick({ target: { closest: () => ({ href: 'https://www.youtube.com/watch?v=abc' }) } });
  A.onOutboundClick({ target: { closest: () => ({ href: 'https://www.instagram.com/quranlens/' }) } });
  A.onOutboundClick({ target: { closest: () => ({ href: 'https://www.tiktok.com/@quranlens' }) } });
  A.onOutboundClick({ target: { closest: () => ({ href: 'https://thequranlensindonesia.com/privacy.html' }) } });
  const after = ctx.window.__logs.map((r) => r[1]);
  const outbound = after.filter((n) => String(n).indexOf('outbound_') === 0);
  cek(outbound.indexOf('outbound_youtube') !== -1 && outbound.indexOf('outbound_instagram') !== -1 && outbound.indexOf('outbound_tiktok') !== -1, 'klik kanal tercatat');
  cek(outbound.length === 3, 'tautan internal tidak jadi outbound');
}

console.log('\n[injector]');
{
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ql-ga-'));
  const file = path.join(dir, 'ga-config.js');
  const sample = 'window.QL_GA_MEASUREMENT_ID = "G-6QBQF976B0";\n';
  const run = (env) => execFileSync(process.execPath, [path.join(root, 'tools/inject-ga.js'), file], {
    env: Object.assign({}, process.env, env),
  });
  fs.writeFileSync(file, sample);
  run({ GA_MEASUREMENT_ID: '', NEXT_PUBLIC_GA_MEASUREMENT_ID: '' });
  cek(fs.readFileSync(file, 'utf8') === sample, 'variable kosong tidak menimpa ID di file');
  run({ GA_MEASUREMENT_ID: 'G-ABC12345', NEXT_PUBLIC_GA_MEASUREMENT_ID: '' });
  cek(fs.readFileSync(file, 'utf8').includes('"G-ABC12345"'), 'variable valid menimpa ID');
  run({ GA_MEASUREMENT_ID: 'off', NEXT_PUBLIC_GA_MEASUREMENT_ID: '' });
  cek(fs.readFileSync(file, 'utf8').includes('= ""'), 'off mengosongkan ID (analytics nonaktif)');
  fs.writeFileSync(file, 'window.QL_GA_MEASUREMENT_ID = "__GA_MEASUREMENT_ID__";\n');
  run({ GA_MEASUREMENT_ID: 'G-ZZZZ9999', NEXT_PUBLIC_GA_MEASUREMENT_ID: '' });
  cek(fs.readFileSync(file, 'utf8').includes('"G-ZZZZ9999"') && !fs.readFileSync(file, 'utf8').includes('__GA_MEASUREMENT_ID__'), 'token lama tetap bisa diganti');
  fs.writeFileSync(file, 'window.QL_LAIN = 1;\n');
  let rejected = false;
  try { run({ GA_MEASUREMENT_ID: 'G-ABC12345' }); } catch (e) { rejected = true; }
  cek(rejected, 'injector gagal bila penugasan tidak ada');
  fs.writeFileSync(file, sample);
  rejected = false;
  try { run({ GA_MEASUREMENT_ID: 'bukan-id', NEXT_PUBLIC_GA_MEASUREMENT_ID: '' }); } catch (e) { rejected = true; }
  cek(rejected && fs.readFileSync(file, 'utf8') === sample, 'ID tidak valid ditolak dan file tidak berubah');
}

console.log('\n' + ok + ' lulus, ' + fail + ' gagal');
process.exit(fail ? 1 : 0);
