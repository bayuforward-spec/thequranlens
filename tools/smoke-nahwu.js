#!/usr/bin/env node
/*
 * smoke-nahwu.js — Uji asap halaman Belajar Nahwu di Chromium headless (Playwright).
 * Backend dicegat (health + /api/nahwu/tanya tiruan), jadi tidak memakai API key.
 *
 * Pakai:  python3 -m http.server 8765 &   (dari root repo)
 *         node tools/smoke-nahwu.js [folder-screenshot]
 */
let pw; try { pw = require('playwright'); } catch { pw = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright'); }
const { chromium } = pw;
const SP = process.argv[2] || require('os').tmpdir();
require('fs').mkdirSync(SP + '/shots', { recursive: true });
const BASE = 'http://localhost:8765/index.html';
const API = 'https://quran-lens-api.onrender.com';
let ok = 0, fail = 0;
const cek = (cond, msg) => { if (cond) { ok++; console.log('  ✓ ' + msg); } else { fail++; console.log('  ✗ ' + msg); } };

(async () => {
  const browser = await chromium.launch();
  for (const theme of ['dark', 'light']) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, serviceWorkers: 'block' });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error' && !/fonts\.g|Failed to load resource/.test(m.text())) errs.push(m.text()); });
    // Backend tiruan: health + tanya (SSE)
    await page.route(API + '/**', (route) => {
      const u = route.request().url();
      if (u.endsWith('/api/health')) return route.fulfill({ json: { ok: true, tanya: true }, headers: { 'access-control-allow-origin': '*' } });
      if (u.endsWith('/api/nahwu/tanya')) {
        const body = JSON.parse(route.request().postData());
        return route.fulfill({ status: 200, headers: { 'content-type': 'text/event-stream', 'access-control-allow-origin': '*' },
          body: `data: {"t":"Jawaban uji untuk: "}\n\ndata: ${JSON.stringify({ t: body.messages.at(-1).content })}\n\ndata: {"done":true}\n\n` });
      }
      return route.fulfill({ json: {} });
    });
    await page.addInitScript((t) => localStorage.setItem('ql-theme', t), theme);
    console.log(`\n[tema ${theme}]`);

    await page.goto(BASE);
    await page.click('.tab[data-tab="nahwu"]');
    await page.waitForSelector('.nw-gcard');
    cek(await page.locator('.nw-gcard').count() === 12, '12 kartu pertemuan di beranda kursus');
    cek(await page.locator('#nwSide .nw-nav').count() === 13, 'sidebar: beranda + 12 pertemuan');
    await page.screenshot({ path: `${SP}/shots/1-beranda-${theme}.png` });

    // Pertemuan 1 → Analisis ayat
    await page.click('.nw-gcard >> nth=0');
    cek(page.url().endsWith('#nahwu/p1/materi'), 'hash rute #nahwu/p1/materi');
    await page.click('#nwMk');
    await page.click('.nw-tabs [data-nw-tab="ayat"]');
    const w = page.locator('.nw-w').first();
    const bb = await w.evaluate((el) => getComputedStyle(el).borderBottomColor);
    await w.click();
    cek(/Mabni/.test(await page.locator('#nwEx0').innerText()), "klik kata قَدْ → keterangan Harf/Mabni");
    const rofa = await page.locator('.nw-w.irob-r').first().evaluate((el) => getComputedStyle(el).borderBottomColor);
    cek(rofa === (theme === 'dark' ? 'rgb(127, 168, 232)' : 'rgb(36, 88, 166)'), `garis rofa' biru (${rofa})`);
    cek(bb === (theme === 'dark' ? 'rgb(152, 160, 155)' : 'rgb(111, 117, 113)'), `garis mabni abu-abu (${bb})`);
    cek(await page.locator('.nw-eplink').count() >= 1, 'tautan balik "Buka kajian episode" ada');
    await page.screenshot({ path: `${SP}/shots/2-ayat-${theme}.png`, fullPage: false });

    // Latihan & quiz
    await page.click('.nw-tabs [data-nw-tab="latihan"]');
    await page.locator('#nwLat0 .nw-opt').first().click();
    cek(await page.locator('#nwLat0 .nw-fb').innerText().then((t) => /Tepat|Belum/.test(t)), 'latihan classify memberi umpan balik');
    await page.click('.nw-tabs [data-nw-tab="quiz"]');
    for (let k = 0; k < 5; k++) { await page.locator('.nw-opt').first().click(); await page.click('#nwQn'); }
    cek(/\d+%/.test(await page.locator('.nw-score').innerText()), 'quiz selesai & skor tampil');
    const S = await page.evaluate(() => JSON.parse(localStorage.getItem('quranlens_nahwu')));
    cek(S.read[1] === true && S.ayat[1].length === 1 && S.lat[1][0].done === 1 && typeof S.quiz[1] === 'number', 'progres tersimpan di localStorage quranlens_nahwu');

    // Widget pertemuan 9 & tabel 10
    await page.click('#nwSide [data-nw-go="9"]');
    await page.locator('[data-widget="amil"] [data-s="1"]').click();
    cek(/طَالِبًا/.test(await page.locator('[data-widget="amil"]').innerText()), "widget 'amil: nashob → طَالِبًا");
    await page.click('#nwSide [data-nw-go="10"]');
    cek(await page.locator('[data-widget="tabel9"] tr').count() === 10, 'widget tabel 9 isim mu\'rab');

    // Reload mempertahankan progres + rute
    await page.reload();
    await page.waitForSelector('.nw-title');
    cek((await page.locator('.nw-title').innerText()).includes("Sembilan Isim"), 'reload #nahwu/p10 membuka pertemuan 10');
    cek(await page.locator('#nwSide .nw-num.part, #nwSide .nw-num.done').count() >= 1, 'progres pertemuan 1 tetap setelah reload');

    // Tanya ustadz AI (backend tiruan)
    await page.click('#nwAskFab');
    await page.fill('#nwAskIn', 'Apa itu isim?');
    await page.click('#nwAskSend');
    await page.waitForSelector('.nw-msg.a:has-text("Jawaban uji")');
    cek(true, 'tanya AI: jawaban dialirkan dari /api/nahwu/tanya');
    await page.screenshot({ path: `${SP}/shots/3-tanya-${theme}.png` });
    await page.click('#nwAskX');

    // Episode → analisis nahwu
    await page.click('.tab[data-tab="kajian"]');
    cek(!page.url().includes('#nahwu'), 'keluar tab Nahwu menghapus hash');
    cek(await page.locator('#nwAskFab').isHidden(), 'tombol tanya tersembunyi di luar tab Nahwu');
    await page.evaluate(() => App.bukaEpisode('al-ikhlas-1-4'));
    const box = page.locator('.nw-epbox');
    cek(await box.locator('button').count() === 3, 'episode Al-Ikhlas: 3 tombol ke pertemuan 1/4/9');
    await box.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${SP}/shots/4-episode-${theme}.png` });
    await box.locator('button').nth(1).click();
    await page.waitForSelector('.nw-verse.sorot');
    cek(page.url().endsWith('#nahwu/p4/ayat/2') && (await page.locator('.nw-verse.sorot .nw-vref').innerText()).includes('112:2'), 'tombol membuka Pertemuan 4, ayat 112:2 disorot');

    // Mobile
    await page.setViewportSize({ width: 390, height: 844 });
    await page.click('.tab[data-tab="nahwu"]');
    await page.waitForSelector('.nw-title');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    cek(overflow <= 0, `mobile 390px tanpa scroll horizontal (${overflow})`);
    await page.screenshot({ path: `${SP}/shots/5-mobile-${theme}.png` });

    cek(errs.length === 0, 'tanpa error JS' + (errs.length ? ': ' + errs.join(' | ') : ''));
    await ctx.close();
  }
  await browser.close();
  console.log(`\n${ok} lulus, ${fail} gagal`);
  process.exit(fail ? 1 : 0);
})();
