/*
 * app.js — The Quran Lens
 * Navigasi Musim/Episode, reader (Ayah Display + kartu kajian), kajian linguistik
 * (perbandingan kata chosen-vs-alternatif), paywall, bookmark, streak, tema.
 */

/* Buang harakat & normalisasi alef agar pencocokan kata fokus tahan-banting */
function stripHarakat(s) {
  return String(s || '')
    .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED\u0640]/g, '')
    .replace(/[\u0622\u0623\u0625\u0671]/g, '\u0627')
    .replace(/[^\u0621-\u064A]/g, '');
}

const App = {
  current: null,

  // Urutan kartu kajian + label (Cinzel) + gating premium
  LAPISAN: [
    { key: 'asbabunNuzul', ico: '📜', label: 'Asbabun Nuzul',      premium: true },
    { key: 'tafsir',       ico: '📖', label: 'Tafsir',             premium: true },
    { key: 'linguistik',   ico: '✨', label: 'Kajian Linguistik',  premium: true, comparison: true },
    { key: 'hikmah',       ico: '🌿', label: 'Hikmah',             premium: false },
    { key: 'amalan',       ico: '🤲', label: 'Amalan & Kehidupan', premium: true },
  ],

  PAKET: [
    { nama: 'Bulanan', harga: 'Rp 49.000', per: '/bulan',
      fitur: ['Akses semua episode', 'Episode baru tiap minggu', 'Batal kapan saja'] },
    { nama: 'Tahunan', harga: 'Rp 399.000', per: '/tahun', best: true, hemat: 'HEMAT ~32%',
      fitur: ['Semua benefit bulanan', 'Akses awal episode baru', 'Dukung pengembangan konten'] },
  ],

  FAQ: [
    ['Apa bedanya dengan aplikasi Qur’an gratis?', 'Kami tidak berhenti di terjemahan. Setiap episode membedah <em>kenapa</em> Allah memilih satu kata, bukan alternatifnya — akar kata, gramatika, dan rujukan ulama klasik.'],
    ['Apakah kontennya bisa dipercaya?', 'Setiap kajian mencantumkan rujukan tafsir mu’tabar (Ibnu Katsir, As-Sa‘di, Al-Qurthubi, Ibnul Qayyim). Kami jujur bila sebuah ayat tak punya riwayat khusus.'],
    ['Bisa batal kapan saja?', 'Bisa. Paket bulanan tanpa ikatan — berhenti kapan pun kamu mau.'],
    ['Apakah ada konten gratis?', 'Ada. Beberapa episode terbuka penuh sebagai cicipan. Selebihnya untuk pelanggan.'],
  ],

  /* ---------- Init ---------- */
  init() {
    this.setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'terang');

    document.getElementById('tabs').addEventListener('click', (e) => {
      const t = e.target.closest('.tab');
      if (t) this.switchTab(t.dataset.tab);
    });

    // Aktivasi otomatis bila pembeli kembali dari checkout Mayar
    const redir = Payment.cekRedirect();
    if (redir) {
      Payment.bersihkanURL();
      if (Payment.backendAktif()) {
        this.aktifkan(redir.order, redir.paket, true);
      } else {
        Store.setPro(redir.paket, redir.order);
        setTimeout(() => this.toast(`🎉 Pembayaran berhasil! Premium ${redir.paket} aktif.`), 400);
      }
    }

    // Akses PENINJAU (ustadz/reviewer): buka semua episode tanpa bayar via ?akses=KODE.
    // Catatan: kode ini sisi-klien (terlihat di source) — cukup untuk peninjauan;
    // ganti bila bocor. Perlindungan sungguhan menyusul (konten sisi-server).
    if (new URLSearchParams(location.search).get('akses') === 'tashih-ql-9f3k') {
      Store.setPro('Peninjau', 'TASHIH');
      if (window.history.replaceState) history.replaceState({}, document.title, location.pathname);
      setTimeout(() => this.toast('✓ Akses peninjau aktif — seluruh episode terbuka.'), 500);
    }

    this.renderStreak(Store.catatKunjungan());
    this.refreshProUI();
    this.refreshFontUI();

    this.current = ayatHariIni().id;
    this.renderNavigator();
    this.renderEpisodeInto();      // muat episode awal ke reader (tanpa scroll)
    this.renderBeranda();
    this.renderPricing('pricingBeranda');
    this.renderPricing('pricingFull');
    this.renderFaq();
    this.renderTersimpan();
    this.renderKataHariIni();
    this.renderKoleksi();
    this.showKataNotif(false);
  },

  switchTab(name) {
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
    document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + name));
    if (name === 'tersimpan') this.renderTersimpan();
    if (name === 'koleksi') this.renderKoleksi();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  /* ---------- Streak & Premium UI ---------- */
  renderStreak(s) {
    const el = document.getElementById('streakPill');
    if (!el) return;
    el.textContent = s.count > 1
      ? `🔥 ${s.count} hari beruntun menyelami kata`
      : `🔥 Hari pertamamu — mulai kebiasaan tadabbur`;
  },

  refreshProUI() {
    const pro = Store.isPro();
    const badge = document.getElementById('proBadge');
    if (pro) {
      badge.textContent = '✓ ' + pro.paket;
      badge.classList.add('is-pro');
      badge.onclick = () => this.toast('Langganan kamu aktif 💛');
    } else {
      badge.textContent = '✦ Premium';
      badge.classList.remove('is-pro');
      badge.onclick = () => this.openUpgrade();
    }
  },

  /* ---------- Navigator (Musim → Episode) ---------- */
  renderNavigator() {
    const pro = !!Store.isPro();
    document.getElementById('navigator').innerHTML = MUSIM.map(m => {
      const total = m.episodes.length;
      const sel = Store.doneCount(m.episodes);
      const pct = total ? Math.round((sel / total) * 100) : 0;
      return `
      <div class="nav-musim">
        <div class="nav-musim-head"><span class="nm-label">${m.label}</span><span class="nm-surah">${m.surah}</span></div>
        <div class="nav-progress" title="${sel} dari ${total} episode selesai">
          <div class="np-bar"><i style="width:${pct}%"></i></div><span class="np-num">${sel}/${total}</span>
        </div>
        <div class="nav-eps">
          ${m.episodes.map((id, i) => {
            const a = cariAyat(id); if (!a) return '';
            const open = pro || a.gratis;
            const ikon = !open ? '🔒' : (a.gratis && !pro ? '○' : '✦');
            const done = Store.isDone(id);
            return `<button class="nav-ep ${this.current === id ? 'active' : ''} ${done ? 'done' : ''}" onclick="App.bukaEpisode('${id}')">
              <span class="ne-no">${done ? '✓' : (i + 1)}</span>
              <span class="ne-title">${a.surah} : ${a.ayatNo}</span>
              <span class="ne-status">${ikon}</span>
            </button>`;
          }).join('')}
        </div>
      </div>`;
    }).join('');
  },

  // Muat episode 'current' ke reader tanpa efek samping (dipakai saat init)
  renderEpisodeInto() {
    const a = cariAyat(this.current); if (!a) return;
    document.getElementById('episodeBox').innerHTML = this.renderEpisode(a);
  },

  bukaEpisode(id) {
    const a = cariAyat(id); if (!a) return;
    this.current = id;
    document.getElementById('episodeBox').innerHTML = this.renderEpisode(a);
    this.renderNavigator();
    this.toggleDrawer(false);
    if (document.getElementById('panel-kajian').classList.contains('active')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  gotoEpisode(id) { this.switchTab('kajian'); this.bukaEpisode(id); },

  /* ---------- Render satu Episode ---------- */
  renderEpisode(ayat) {
    const meta = episodeMeta(ayat.id);
    const pro = !!Store.isPro();
    const open = pro || ayat.gratis;
    const marked = Store.isMarked(ayat.id);

    let h = `<nav class="crumbs" aria-label="Posisi">
      <button onclick="App.switchTab('beranda')">Beranda</button><i>›</i>
      <button onclick="App.toggleDrawer(true)">${meta ? meta.musim.label : 'Episode'}</button><i>›</i>
      <span aria-current="page">${ayat.surah} : ${ayat.ayatNo}</span>
    </nav>`;

    h += `<div class="ep-head">
      <button class="btn-mark ${marked ? 'on' : ''}" title="Simpan episode" onclick="App.toggleMark('${ayat.id}', this)">${marked ? '🔖' : '🏷️'}</button>
      <div class="ep-kicker">${meta ? `${meta.musim.label} · Episode ${meta.no}` : 'Episode'}${ayat.gratis ? ' · GRATIS' : ''}</div>
      <h2 class="ep-title">QS. ${ayat.surah} : ${ayat.ayatNo}</h2>
      <div class="ep-tema">${ayat.tema.map(t => `<span>${t}</span>`).join('')}</div>
    </div>`;

    h += this.renderAyahDisplay(ayat);
    if (Array.isArray(ayat.kajianKata) && ayat.kajianKata.length) {
      h += this.renderKajianKata(ayat, open);
      h += `<div class="hr-grad"></div><div class="kajian-label section"><span class="kj-ico">📖</span>Kajian Ayat Menyeluruh</div>`;
    }
    h += this.renderKajianCards(ayat, open);
    if (open) h += this.renderScholar(ayat.sumber);

    const done = Store.isDone(ayat.id);
    h += `<button class="btn-selesai ${done ? 'done' : ''}" onclick="App.toggleDone('${ayat.id}', this)">
      ${done ? '✓ Sudah dipelajari' : 'Tandai selesai dipelajari'}</button>`;

    h += this.renderEpNav(ayat);
    return h;
  },

  toggleDone(id, btn) {
    const now = Store.toggleDone(id);
    if (btn) {
      btn.classList.toggle('done', now);
      btn.textContent = now ? '✓ Sudah dipelajari' : 'Tandai selesai dipelajari';
    }
    this.toast(now ? '✓ Ditandai selesai — lanjutkan perjalananmu!' : 'Tanda selesai dilepas');
    this.renderNavigator();
  },

  // Kajian kata demi kata: tiap kata satu kartu (kartu pertama gratis sebagai cicipan)
  renderKajianKata(ayat, open) {
    const items = ayat.kajianKata;
    let out = `<div class="kajian-label section"><span class="kj-ico">✨</span>Kajian Kata demi Kata</div>`;
    items.forEach((k, i) => {
      if (i > 0) out += `<div class="divider-short"></div>`;
      const free = open || i === 0;
      out += free ? this.renderKataCard(k) : this.renderKataLocked(k);
    });
    return out;
  },

  renderKataCard(k) {
    const blocks = [];
    if (k.akar) blocks.push(k.akar);
    if (k.banding) blocks.push(k.banding);
    if (k.hitung) blocks.push(k.hitung);
    if (k.taqdim) blocks.push(k.taqdim);
    if (Array.isArray(k.viz)) blocks.push(...k.viz);
    return `<div class="kata-card">
      <div class="kata-arab" lang="ar" dir="rtl">${k.kata}</div>
      <div class="kata-gloss"><span class="kg-latin">${k.latin || ''}</span><span class="kg-arti">${k.arti || ''}</span></div>
      ${k.asalKata ? this.renderAsal(k.asalKata) : ''}
      ${Array.isArray(k.poin) ? `<ul class="poin">${k.poin.map(p => `<li>${p}</li>`).join('')}</ul>` : ''}
      ${blocks.length ? this.renderVisual(blocks) : ''}
      ${k.hikmah ? `<div class="kata-hikmah"><span class="kh-label">Hikmah</span><p>${k.hikmah}</p></div>` : ''}
      ${this.renderScholar(k.sumber)}
    </div>`;
  },

  // Lapisan "Asal-Usul Kata": akar klasik + makna inti + gambaran konkret (etimologi hidup)
  renderAsal(a) {
    if (!a) return '';
    const akar = Array.isArray(a.huruf)
      ? `<span class="as-akar" lang="ar" dir="rtl">${a.huruf.map(h => `<span>${h}</span>`).join('<i>·</i>')}</span>` : '';
    const makna = a.makna ? `<span class="as-makna">${a.makna}</span>` : '';
    return `<div class="asal">
      <div class="asal-head"><span class="asal-label">⌬ Asal-Usul Kata</span>${akar}${makna}</div>
      <p class="asal-gambar">${a.gambar}</p>
    </div>`;
  },

  renderKataLocked(k) {
    return `<div class="kata-card locked">
      <div class="kata-arab" lang="ar" dir="rtl">${k.kata}</div>
      <div class="kata-gloss"><span class="kg-latin">${k.latin || ''}</span><span class="premium-tag">PREMIUM</span></div>
      <p class="kajian-teaser">${this.teaser((k.poin || []).join(' '))}</p>
    </div>`;
  },

  // Ayah Display: kata yang dikaji menyala, sisanya di-fade
  renderAyahDisplay(ayat) {
    // Bila episode punya kajian kata demi kata, semua kata itu disorot.
    let fokusSrc = ayat.fokus || [];
    if (Array.isArray(ayat.kajianKata) && ayat.kajianKata.length) {
      fokusSrc = ayat.kajianKata.flatMap(k => k.kata.split(/\s+/));
    }
    const fokus = fokusSrc.map(stripHarakat).filter(Boolean);
    const tokens = ayat.arab.split(/\s+/).filter(Boolean);
    const words = tokens.map(tok => {
      const s = stripHarakat(tok);
      if (!/[ء-ي]/.test(s)) return `<span class="aw-mark">${tok}</span>`;
      const on = !fokus.length || fokus.some(f => s.includes(f));
      return `<span class="aw ${on ? 'on' : 'off'}">${tok}</span>`;
    }).join(' ');

    return `<div class="ayah-display framed">
      <div class="ayah-arab" lang="ar" dir="rtl">${words}</div>
      <details class="ayah-more">
        <summary>Transliterasi &amp; terjemahan</summary>
        <div class="ayah-latin">${ayat.latin}</div>
        <div class="ayah-arti">“${ayat.arti}”</div>
      </details>
    </div>`;
  },

  teaser(txt, n = 130) {
    const t = String(txt || '').replace(/\s+/g, ' ').trim();
    return t.length > n ? t.slice(0, n) + '…' : t;
  },

  // Kartu kajian + gating (locked = teaser blur)
  renderKajianCards(ayat, open) {
    let cards = '', adaKunci = false;
    const adaKata = Array.isArray(ayat.kajianKata) && ayat.kajianKata.length;
    this.LAPISAN.forEach(l => {
      if (l.key === 'linguistik' && adaKata) return; // sudah jadi kajian kata demi kata
      const punyaPoin = (l.key === 'hikmah' && Array.isArray(ayat.hikmahPoin));
      const isi = ayat[l.key];
      if (!isi && !punyaPoin) return;

      const locked = l.premium && !open;
      if (locked) {
        adaKunci = true;
        const txt = Array.isArray(isi) ? isi.join(' ') : isi;
        cards += `<div class="kajian locked">
          <div class="kajian-label"><span class="kj-ico">${l.ico}</span>${l.label}<span class="premium-tag">PREMIUM</span></div>
          <p class="kajian-teaser">${this.teaser(txt)}</p>
        </div>`;
        return;
      }

      let body;
      if (punyaPoin) body = `<ul class="poin">${ayat.hikmahPoin.map(p => `<li>${p}</li>`).join('')}</ul>`;
      else body = `<p>${isi}</p>`;

      const grafik = (l.comparison && ayat.visual) ? this.renderVisual(ayat.visual) : '';

      cards += `<div class="kajian ${l.key}">
        <div class="kajian-label"><span class="kj-ico">${l.ico}</span>${l.label}</div>
        ${body}${grafik}
      </div>`;
    });
    if (adaKunci) cards += this.premiumCTA();
    return cards;
  },

  premiumCTA() {
    return `<div class="premium-cta framed">
      <div class="lk">🔒</div>
      <h4>Lanjutkan membaca</h4>
      <p>Buka asbabun nuzul, tafsir, kajian linguistik &amp; amalan untuk episode ini.</p>
      <button class="btn gold" onclick="App.openUpgrade()">Mulai dari Rp 49rb / bulan</button>
    </div>`;
  },

  renderScholar(sumber) {
    if (!Array.isArray(sumber) || !sumber.length) return '';
    return `<div class="scholar">
      <div class="scholar-label">Rujukan Ulama</div>
      <div class="scholar-list">${sumber.map(s => `<span>${s}</span>`).join('')}</div>
    </div>`;
  },

  renderEpNav(ayat) {
    const seq = MUSIM.flatMap(m => m.episodes);
    const i = seq.indexOf(ayat.id);
    const prev = seq[i - 1], next = seq[i + 1];
    const b = (id, label, arah) => {
      const a = id && cariAyat(id);
      if (!a) return '<span></span>';
      return `<button class="epnav-btn ${arah}" onclick="App.bukaEpisode('${id}')">
        <span class="en-arah">${arah === 'prev' ? '← Sebelumnya' : 'Berikutnya →'}</span>
        <span class="en-title">${a.surah} : ${a.ayatNo}</span></button>`;
    };
    return `<div class="epnav">${b(prev, '', 'prev')}${b(next, '', 'next')}</div>`;
  },

  /* ---------- Grafik linguistik (perbandingan kata/huruf) ---------- */
  renderVisual(blocks) {
    if (!Array.isArray(blocks) || !blocks.length) return '';
    return `<div class="viz">${blocks.map(b => this.renderViz(b)).join('')}</div>`;
  },

  renderViz(b) {
    const note = b.catatan ? `<div class="viz-note">${b.catatan}</div>` : '';
    switch (b.tipe) {
      case 'akar':
        return `<div class="viz-akar">
          <div class="vk-huruf" lang="ar" dir="rtl">${b.huruf.map(h => `<span>${h}</span>`).join('<i>·</i>')}</div>
          ${b.teks ? `<div class="vk-teks">${b.teks}</div>` : ''}
        </div>`;

      // Perbandingan kata: item ber-flag alt:true = alternatif (pudar), sisanya = pilihan Al-Qur'an (emas)
      case 'banding': {
        const adaAlt = b.item.some(it => it.alt);
        return `<div class="viz-banding ${adaAlt ? 'vs' : ''}" style="--n:${b.item.length}">
          ${b.item.map((it, i) => `<div class="vb-card ${it.alt ? 'alt' : (adaAlt ? 'chosen' : '')}" style="--d:${i}">
            ${it.alt ? '<div class="vb-tag">Alternatif</div>' : (adaAlt ? '<div class="vb-tag chosen">Dipilih Al-Qur’an</div>' : '')}
            <div class="vb-arab" lang="ar" dir="rtl">${it.arab}</div>
            ${it.latin ? `<div class="vb-latin">${it.latin}</div>` : ''}
            <div class="vb-sifat">${(it.sifat || []).map(s => `<span>${s}</span>`).join('')}</div>
          </div>`).join('')}
        </div>${note}`;
      }

      case 'hitung':
        return `<div class="viz-hitung">
          ${b.item.map((it, i) => `<div class="vh-row" style="--d:${i}">
            <div class="vh-info"><div class="vh-label">${it.label}</div>
              ${it.nuansa ? `<div class="vh-nuansa">${it.nuansa}</div>` : ''}</div>
            <div class="vh-dots">${Array.from({ length: it.jumlah || 0 }).map(() => '<i></i>').join('')}</div>
          </div>`).join('')}
        </div>${note}`;

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

  /* ---------- Beranda ---------- */
  renderBeranda() {
    const gratis = AYAT.filter(a => a.gratis);
    document.getElementById('berandaPreview').innerHTML = gratis.map(a => {
      const meta = episodeMeta(a.id);
      return `<div class="preview-card" onclick="App.gotoEpisode('${a.id}')">
        <div class="pc-arab" lang="ar" dir="rtl">${a.arab}</div>
        <div class="pc-kicker">${meta ? meta.musim.label + ' · Episode ' + meta.no : 'Episode'} · GRATIS</div>
        <div class="pc-title">QS. ${a.surah} : ${a.ayatNo}</div>
        <div class="pc-cta">Baca episode →</div>
      </div>`;
    }).join('');
  },

  renderPricing(targetId) {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.className = 'price-grid';
    el.innerHTML = this.PAKET.map(p => `
      <div class="price-card ${p.best ? 'hl' : ''}">
        ${p.best ? `<div class="pc-ribbon">${p.hemat}</div>` : ''}
        <div class="pc-name">${p.nama}</div>
        <div class="pc-amt">${p.harga}<small>${p.per}</small></div>
        <ul>${p.fitur.map(f => `<li>${f}</li>`).join('')}</ul>
        <button class="btn ${p.best ? 'gold' : 'ghost'}" style="width:100%" onclick="App.beli('${p.nama}')">Pilih ${p.nama}</button>
      </div>`).join('') +
      `<div class="price-tagline">“Lebih murah dari satu buku tafsir. Lebih dalam dari satu seri ceramah.”</div>`;
  },

  renderFaq() {
    const el = document.getElementById('faq');
    if (!el) return;
    el.className = 'faq wrap-narrow';
    el.innerHTML = this.FAQ.map(([q, a]) => `
      <details class="faq-item"><summary>${q}</summary><div class="faq-a">${a}</div></details>`).join('');
  },

  /* ---------- Tersimpan ---------- */
  renderTersimpan() {
    const ids = Store.bookmarks();
    const box = document.getElementById('daftarTersimpan');
    if (!box) return;
    if (!ids.length) {
      box.innerHTML = `<div class="kosong">Belum ada episode tersimpan. Tekan 🏷️ pada sebuah episode untuk menyimpannya.</div>`;
      return;
    }
    box.innerHTML = ids.map(id => {
      const a = cariAyat(id); if (!a) return '';
      const meta = episodeMeta(a.id);
      return `<button class="nav-ep saved" onclick="App.gotoEpisode('${a.id}')">
        <span class="ne-no">${meta ? meta.no : '•'}</span>
        <span class="ne-title">${a.surah} : ${a.ayatNo}<small>${a.tema.join(' · ')}</small></span>
        <span class="ne-status">🔖</span>
      </button>`;
    }).join('');
  },

  toggleMark(id, btn) {
    const ditandai = Store.toggleMark(id);
    if (btn) { btn.classList.toggle('on', ditandai); btn.textContent = ditandai ? '🔖' : '🏷️'; }
    this.toast(ditandai ? '🔖 Episode disimpan' : 'Dihapus dari tersimpan');
    this.renderTersimpan();
  },

  /* ---------- Premium / pembayaran ---------- */
  openUpgrade() { document.getElementById('modalUpgrade').classList.add('show'); },
  closeUpgrade() { document.getElementById('modalUpgrade').classList.remove('show'); },

  beli(paket) {
    if (Payment.checkout(paket)) {
      this.toast('Mengarahkan ke pembayaran Mayar…');
    } else {
      Store.setPro(paket, 'DEMO');
      this.closeUpgrade();
      this.afterUnlock();
      this.toast(`🎉 (Mode demo) Premium ${paket} aktif. Pasang link Mayar untuk transaksi nyata.`);
    }
  },

  aktivasiManual(fromModal) {
    const sel = document.getElementById(fromModal ? 'm-paket-2' : 'm-paket');
    const inp = document.getElementById(fromModal ? 'm-order-2' : 'm-order');
    const paket = sel.value;
    const order = (inp.value || '').trim();
    if (!order) return this.toast('Masukkan Order ID dari Mayar terlebih dahulu.');
    if (Payment.backendAktif()) {
      this.aktifkan(order, paket, false);
    } else {
      Store.setPro(paket, order);
      this.closeUpgrade();
      this.afterUnlock();
      this.toast(`✓ Premium ${paket} aktif. Terima kasih 💛`);
    }
  },

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
    this.renderNavigator();
    this.renderEpisodeInto();
    this.renderBeranda();
    this.renderTersimpan();
  },

  /* ---------- Drawer (navigator mobile) ---------- */
  toggleDrawer(force) {
    const panel = document.getElementById('panel-kajian');
    const open = (typeof force === 'boolean') ? force : !panel.classList.contains('drawer-open');
    panel.classList.toggle('drawer-open', open);
  },

  /* ---------- Tema terang/gelap ---------- */
  setTheme(mode) {
    document.documentElement.dataset.theme = (mode === 'dark') ? 'dark' : 'light';
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
    this.setTheme(document.documentElement.dataset.theme === 'dark' ? 'terang' : 'dark');
  },

  /* ---------- Ukuran teks (aksesibilitas) ---------- */
  FONT_STEPS: [100, 112.5, 125, 137.5], // % pada <html>; default 112.5 (indeks 1)
  FONT_NAMA: ['Kecil', 'Normal', 'Besar', 'Sangat besar'],
  fontScale() {
    const v = parseFloat(localStorage.getItem('ql-fontscale'));
    return this.FONT_STEPS.includes(v) ? v : 112.5;
  },
  setFont(pct) {
    document.documentElement.style.fontSize = pct + '%';
    try { localStorage.setItem('ql-fontscale', pct); } catch (e) {}
    this.refreshFontUI();
  },
  bumpFont(dir) {
    const steps = this.FONT_STEPS;
    let i = steps.indexOf(this.fontScale());
    if (i < 0) i = 1;
    const ni = Math.max(0, Math.min(steps.length - 1, i + dir));
    if (ni === i) return; // sudah di batas
    this.setFont(steps[ni]);
    this.toast(`Ukuran teks: ${this.FONT_NAMA[ni]}`);
  },
  refreshFontUI() {
    const i = this.FONT_STEPS.indexOf(this.fontScale());
    const down = document.getElementById('fontDown');
    const up = document.getElementById('fontUp');
    if (down) down.disabled = (i <= 0);
    if (up) up.disabled = (i >= this.FONT_STEPS.length - 1);
  },

  /* ---------- Toast ---------- */
  toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(this._tt);
    this._tt = setTimeout(() => t.classList.remove('show'), 3200);
  },

  /* ---------- Kata Hari Ini + pengingat ---------- */
  renderKataHariIni() {
    const box = document.getElementById('kataHariIni');
    if (!box) return;
    const a = cariAyat(ayatHariIni().id);
    if (!a) { box.innerHTML = ''; return; }
    const k = (Array.isArray(a.kajianKata) && a.kajianKata.length) ? a.kajianKata[0] : null;
    const refleksi = (Array.isArray(a.hikmahPoin) && a.hikmahPoin[0]) || a.hikmah || '';
    const on = Store.reminderOn();
    box.innerHTML = `<div class="khi framed">
      <div class="khi-top">
        <span class="khi-label">✦ Kata Hari Ini</span>
        <button class="khi-bell ${on ? 'on' : ''}" onclick="App.toggleReminder()" title="${on ? 'Matikan pengingat' : 'Aktifkan pengingat harian'}" aria-label="Pengingat harian">${on ? '🔔' : '🔕'}</button>
      </div>
      <div class="khi-arab" lang="ar" dir="rtl">${k ? k.kata : a.arab.split(/\s+/).slice(0, 3).join(' ')}</div>
      ${k ? `<div class="khi-gloss"><b>${k.latin || ''}</b> — ${k.arti || ''}</div>` : ''}
      <p class="khi-ref">${this.teaser(refleksi, 160)}</p>
      <div class="khi-src">QS. ${a.surah} : ${a.ayatNo}</div>
      <button class="btn gold" onclick="App.gotoEpisode('${a.id}')">Renungkan hari ini →</button>
    </div>`;
  },

  async toggleReminder() {
    if (Store.reminderOn()) {
      Store.setReminder(false); this.renderKataHariIni();
      this.toast('🔕 Pengingat harian dimatikan.'); return;
    }
    if (!('Notification' in window)) { this.toast('Browser ini tak mendukung notifikasi.'); return; }
    let perm = Notification.permission;
    if (perm !== 'granted') { try { perm = await Notification.requestPermission(); } catch (e) {} }
    if (perm !== 'granted') { this.toast('Izin notifikasi belum diberikan.'); return; }
    Store.setReminder(true); this.renderKataHariIni();
    this.showKataNotif(true);
    this.toast('🔔 Pengingat aktif — Kata Hari Ini muncul tiap kamu buka app di hari baru.');
  },

  async showKataNotif(force) {
    if (!Store.reminderOn() || !('Notification' in window) || Notification.permission !== 'granted') return;
    const today = new Date().toISOString().slice(0, 10);
    if (!force && Store.reminder().last === today) return;
    const a = cariAyat(ayatHariIni().id); if (!a) return;
    const k = (Array.isArray(a.kajianKata) && a.kajianKata.length) ? a.kajianKata[0] : null;
    const ref = (Array.isArray(a.hikmahPoin) && a.hikmahPoin[0]) || a.hikmah || '';
    const body = (k ? `${k.latin} — ${k.arti}. ` : '') + this.teaser(ref, 90);
    try {
      const reg = navigator.serviceWorker && await navigator.serviceWorker.ready;
      const opts = { body, tag: 'kata-' + today, data: { url: './' } };
      if (reg && reg.showNotification) await reg.showNotification('✦ Kata Hari Ini — ' + a.surah, opts);
      else new Notification('✦ Kata Hari Ini — ' + a.surah, opts);
      Store.markReminderShown(today);
    } catch (e) {}
  },

  /* ---------- Koleksi bertema ---------- */
  renderKoleksi() {
    const box = document.getElementById('daftarKoleksi');
    if (!box || typeof KOLEKSI === 'undefined') return;
    box.innerHTML = KOLEKSI.map(kol => `
      <div class="kol">
        <div class="kol-head"><span class="kol-ico">${kol.ikon || '✦'}</span>
          <div><h3 class="kol-judul">${kol.judul}</h3><p class="kol-desc">${kol.deskripsi || ''}</p></div>
        </div>
        <div class="kol-items">
          ${kol.items.map((it, i) => {
            const a = cariAyat(it.id); if (!a) return '';
            return `<div class="kol-item">
              <div class="kol-no">${i + 1}</div>
              <div class="kol-body">
                <div class="kol-surah">QS. ${a.surah} : ${a.ayatNo}</div>
                <p class="kol-note">💡 <b>Untuk orang tua:</b> ${it.catatan}</p>
                <button class="kol-open" onclick="App.gotoEpisode('${a.id}')">Buka episode →</button>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>`).join('');
  },
};
window.App = App;
