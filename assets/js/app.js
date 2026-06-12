/*
 * app.js — Navigasi, render ayat & 6 lapisan tadabbur, gating Premium,
 * bookmark, dan streak harian.
 */
const App = {
  // Definisi 6 lapisan + ikon + status premium-nya
  LAPISAN: [
    { key: 'asbabunNuzul', ico: '📜', judul: 'Asbabun Nuzul', premium: true },
    { key: 'tafsir',       ico: '📖', judul: 'Tafsir Ringkas', premium: true },
    { key: 'hikmah',       ico: '🌿', judul: 'Hikmah Ayat',    premium: false },
    { key: 'linguistik',   ico: '✨', judul: 'Keajaiban Linguistik', premium: true },
    { key: 'amalan',       ico: '🤲', judul: 'Amalan & Kehidupan',   premium: true },
  ],

  /* ---------- Init ---------- */
  init() {
    // Sinkronkan tombol tema dengan pilihan tersimpan (default: terang)
    this.setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'terang');

    document.getElementById('tabs').addEventListener('click', (e) => {
      const t = e.target.closest('.tab');
      if (t) this.switchTab(t.dataset.tab);
    });

    // Aktivasi otomatis bila pembeli kembali dari checkout Scalev
    const redir = Payment.cekRedirect();
    if (redir) {
      Payment.bersihkanURL();
      if (Payment.backendAktif()) {
        // Verifikasi ke server (anti-bypass) sebelum membuka Premium
        this.aktifkan(redir.order, redir.paket, true);
      } else {
        // Mode demo sisi-klien
        Store.setPro(redir.paket, redir.order);
        setTimeout(() => this.toast(`🎉 Pembayaran berhasil! Premium ${redir.paket} aktif.`), 400);
      }
    }

    const s = Store.catatKunjungan();
    this.renderStreak(s);
    this.refreshProUI();
    this.renderHariIni();
    this.renderDaftar();
    this.renderTersimpan();
  },

  switchTab(name) {
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
    document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + name));
    if (name === 'tersimpan') this.renderTersimpan();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  /* ---------- Streak ---------- */
  renderStreak(s) {
    const el = document.getElementById('streakPill');
    if (!el) return;
    el.textContent = s.count > 1
      ? `🔥 ${s.count} hari beruntun menyelami Al-Qur'an`
      : `🔥 Hari pertamamu — mulai kebiasaan tadabbur!`;
  },

  /* ---------- Premium UI ---------- */
  refreshProUI() {
    const pro = Store.isPro();
    const badge = document.getElementById('proBadge');
    if (pro) {
      badge.textContent = '✓ Premium ' + pro.paket;
      badge.classList.add('is-pro');
      badge.onclick = () => this.toast('Akses Premium kamu aktif 💚');
    } else {
      badge.textContent = '✦ Premium';
      badge.classList.remove('is-pro');
      badge.onclick = () => this.openUpgrade();
    }
  },

  /* ---------- Render satu ayat lengkap ---------- */
  renderAyat(ayat) {
    const pro = !!Store.isPro();
    const terbukaPenuh = pro || ayat.gratis;
    const marked = Store.isMarked(ayat.id);

    let html = `<article class="card">
      <button class="btn-mark ${marked ? 'on' : ''}" title="Simpan ayat"
        onclick="App.toggleMark('${ayat.id}', this)">${marked ? '🔖' : '🏷️'}</button>
      <div class="card-head">
        <div>
          <div class="card-meta">QS. ${ayat.surah} : ${ayat.ayatNo} · Juz ${ayat.juz}</div>
          <div class="card-title">Surah ${ayat.surah}</div>
        </div>
      </div>
      <div class="ayat-arab" lang="ar" dir="rtl">${ayat.arab}</div>
      <div class="ayat-latin">${ayat.latin}</div>
      <div class="ayat-arti">“${ayat.arti}”</div>
      <div class="tema">${ayat.tema.map(t => `<span>${t}</span>`).join('')}</div>`;

    // 6 lapisan
    let adaTerkunci = false;
    this.LAPISAN.forEach(l => {
      const isi = ayat[l.key];
      if (!isi) return;
      const terkunci = l.premium && !terbukaPenuh;
      if (terkunci) { adaTerkunci = true; return; }
      const grafik = (l.key === 'linguistik' && ayat.visual) ? this.renderVisual(ayat.visual) : '';
      html += `<div class="layer ${l.key}">
        <div class="layer-head"><span class="layer-ico">${l.ico}</span>
          <span class="layer-title">${l.judul}</span></div>
        <p>${isi}</p>
        ${grafik}
      </div>`;
    });

    if (adaTerkunci) {
      html += `<div class="lock">
        <div class="lk">🔒</div>
        <h4>Selami lebih dalam dengan Premium</h4>
        <p>Buka asbabun nuzul, tafsir, keajaiban linguistik & amalan untuk ayat ini.</p>
        <button class="btn gold" onclick="App.openUpgrade()">✦ Buka Akses</button>
      </div>`;
    }

    html += `<div class="sumber">📚 Rujukan: ${ayat.sumber.join(' · ')}</div></article>`;
    return html;
  },

  /* ---------- Grafik linguistik (efek "wow": perbandingan kata/huruf) ---------- */
  renderVisual(blocks) {
    if (!Array.isArray(blocks) || !blocks.length) return '';
    return `<div class="viz">${blocks.map(b => this.renderViz(b)).join('')}</div>`;
  },

  renderViz(b) {
    const note = b.catatan ? `<div class="viz-note">${b.catatan}</div>` : '';
    switch (b.tipe) {
      // Akar kata bersama: huruf-huruf Arab berjarak (mis. ر · ح · م)
      case 'akar':
        return `<div class="viz-akar">
          <div class="vk-huruf" lang="ar" dir="rtl">${b.huruf.map(h => `<span>${h}</span>`).join('<i>·</i>')}</div>
          ${b.teks ? `<div class="vk-teks">${b.teks}</div>` : ''}
        </div>`;

      // Perbandingan 2–3 kata: kartu sejajar (Ar-Rahman vs Ar-Rahim, dst)
      case 'banding':
        return `<div class="viz-banding" style="--n:${b.item.length}">
          ${b.item.map((it, i) => `<div class="vb-card" style="--d:${i}">
            <div class="vb-arab" lang="ar" dir="rtl">${it.arab}</div>
            ${it.latin ? `<div class="vb-latin">${it.latin}</div>` : ''}
            <div class="vb-sifat">${(it.sifat || []).map(s => `<span>${s}</span>`).join('')}</div>
          </div>`).join('')}
        </div>${note}`;

      // Hitungan: titik-titik (mis. 1 kesulitan vs 2 kemudahan)
      case 'hitung':
        return `<div class="viz-hitung">
          ${b.item.map((it, i) => `<div class="vh-row" style="--d:${i}">
            <div class="vh-info"><div class="vh-label">${it.label}</div>
              ${it.nuansa ? `<div class="vh-nuansa">${it.nuansa}</div>` : ''}</div>
            <div class="vh-dots">${Array.from({ length: it.jumlah || 0 }).map(() => '<i></i>').join('')}</div>
          </div>`).join('')}
        </div>${note}`;

      // Taqdim: susunan kata lazim → susunan Al-Qur'an (urutan dibalik)
      case 'taqdim':
        return `<div class="viz-taqdim">
          <div class="vt-row"><span class="vt-lbl">${b.labelNormal || 'Lazimnya'}</span>
            <div class="vt-words" lang="ar" dir="rtl">${b.normal.map(w => `<span>${w}</span>`).join('')}</div></div>
          <div class="vt-arrow">↓</div>
          <div class="vt-row hl"><span class="vt-lbl">${b.labelQuran || 'Al-Qur’an'}</span>
            <div class="vt-words" lang="ar" dir="rtl">${b.quran.map(w => `<span>${w}</span>`).join('')}</div></div>
        </div>${note}`;

      default:
        return '';
    }
  },

  /* ---------- Tema terang/gelap ---------- */
  setTheme(mode) {
    const m = (mode === 'dark') ? 'dark' : 'terang';
    document.documentElement.dataset.theme = (m === 'dark') ? 'dark' : 'light';
    try { localStorage.setItem('ql-theme', document.documentElement.dataset.theme); } catch (e) {}
    const btn = document.getElementById('themeToggle');
    if (btn) {
      const gelap = document.documentElement.dataset.theme === 'dark';
      btn.textContent = gelap ? '☀️' : '🌙';
      btn.title = gelap ? 'Beralih ke mode terang' : 'Beralih ke mode malam';
      btn.setAttribute('aria-label', btn.title);
    }
  },
  toggleTheme() {
    const gelap = document.documentElement.dataset.theme === 'dark';
    this.setTheme(gelap ? 'terang' : 'dark');
  },

  /* ---------- Ayat Hari Ini ---------- */
  renderHariIni() {
    const ayat = ayatHariIni();
    const tgl = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    document.getElementById('hariIniBox').innerHTML =
      `<p class="section-sub" style="margin-bottom:14px">☀️ ${tgl}</p>` + this.renderAyat(ayat);
  },

  /* ---------- Perpustakaan ---------- */
  renderDaftar() {
    const pro = !!Store.isPro();
    document.getElementById('daftarAyat').innerHTML = AYAT.map(a => `
      <div class="ayat-item" onclick="App.bukaAyat('${a.id}')">
        <div class="ayat-no">${a.surahNo}</div>
        <div>
          <div class="ii-title">${a.surah} <span style="color:var(--muted);font-weight:600">: ${a.ayatNo}</span></div>
          <div class="ii-sub">${a.tema.join(' · ')}</div>
        </div>
        ${(pro || a.gratis) ? '<span class="ii-free">Terbuka</span>' : '<span class="ii-lock">🔒</span>'}
      </div>`).join('');
  },

  /* ---------- Tersimpan ---------- */
  renderTersimpan() {
    const ids = Store.bookmarks();
    const box = document.getElementById('daftarTersimpan');
    if (!ids.length) {
      box.innerHTML = `<div class="card" style="text-align:center;color:var(--muted)">
        Belum ada ayat tersimpan. Tekan 🏷️ pada sebuah ayat untuk menyimpannya.</div>`;
      return;
    }
    box.innerHTML = ids.map(id => {
      const a = cariAyat(id); if (!a) return '';
      return `<div class="ayat-item" onclick="App.bukaAyat('${a.id}')">
        <div class="ayat-no">${a.surahNo}</div>
        <div><div class="ii-title">${a.surah} : ${a.ayatNo}</div>
          <div class="ii-sub">${a.tema.join(' · ')}</div></div>
        <span class="ii-lock">🔖</span>
      </div>`;
    }).join('');
  },

  // Buka satu ayat di tab "Hari Ini" (dipakai sebagai panel detail)
  bukaAyat(id) {
    const a = cariAyat(id); if (!a) return;
    document.getElementById('hariIniBox').innerHTML =
      `<button class="btn ghost" style="margin-bottom:14px" onclick="App.renderHariIni()">← Ayat Hari Ini</button>` +
      this.renderAyat(a);
    this.switchTab('hari-ini');
  },

  toggleMark(id, btn) {
    const ditandai = Store.toggleMark(id);
    if (btn) { btn.classList.toggle('on', ditandai); btn.textContent = ditandai ? '🔖' : '🏷️'; }
    this.toast(ditandai ? '🔖 Ayat disimpan' : 'Dihapus dari tersimpan');
    this.renderTersimpan();
  },

  /* ---------- Premium / pembayaran ---------- */
  openUpgrade() { document.getElementById('modalUpgrade').classList.add('show'); },
  closeUpgrade() { document.getElementById('modalUpgrade').classList.remove('show'); },

  beli(paket) {
    if (Payment.checkout(paket)) {
      this.toast('Mengarahkan ke pembayaran Scalev…');
    } else {
      // Mode demo: belum ada URL Scalev terpasang
      Store.setPro(paket, 'DEMO');
      this.closeUpgrade();
      this.afterUnlock();
      this.toast(`🎉 (Mode demo) Premium ${paket} aktif. Pasang URL Scalev untuk transaksi nyata.`);
    }
  },

  aktivasiManual() {
    const paket = document.getElementById('m-paket').value;
    const order = (document.getElementById('m-order').value || '').trim();
    if (!order) return this.toast('Masukkan Order ID dari Scalev terlebih dahulu.');
    if (Payment.backendAktif()) {
      this.aktifkan(order, paket, false);
    } else {
      // Mode demo sisi-klien (tanpa backend)
      Store.setPro(paket, order);
      this.closeUpgrade();
      this.afterUnlock();
      this.toast(`✓ Premium ${paket} aktif. Terima kasih 💚`);
    }
  },

  // Aktivasi dengan verifikasi server. `paketHint` dipakai bila server tak
  // mengembalikan nama paket. `dariRedirect` menentukan gaya notifikasi.
  async aktifkan(order, paketHint, dariRedirect) {
    this.toast('Memverifikasi pembayaran…');
    const hasil = await Payment.verifikasiOrder(order);
    if (hasil && hasil.active) {
      Store.setPro(hasil.paket || paketHint, order);
      this.closeUpgrade();
      this.afterUnlock();
      this.toast(`🎉 Pembayaran terverifikasi! Premium ${hasil.paket || paketHint} aktif.`);
    } else {
      this.toast('⚠️ Order belum terverifikasi. Pastikan pembayaran selesai, lalu coba lagi.');
    }
  },

  afterUnlock() {
    this.refreshProUI();
    this.renderHariIni();
    this.renderDaftar();
    this.renderTersimpan();
  },

  /* ---------- Toast ---------- */
  toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(this._tt);
    this._tt = setTimeout(() => t.classList.remove('show'), 3200);
  },
};
window.App = App;
