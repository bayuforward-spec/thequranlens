/*
 * nahwu.js — Halaman "Belajar Nahwu": 12 pertemuan, masing-masing Materi,
 * Analisis ayat (warna i'rob per kata), Latihan, dan Quiz. Data: nahwu-data.js.
 * Progres: Store.nahwu() (localStorage). Tautan ke/dari episode Kajian lewat
 * nahwuUntukEpisode() / episodeUntukNahwu().
 *
 * Rute (hash): #nahwu · #nahwu/p3 · #nahwu/p3/latihan · #nahwu/p3/ayat/1 (sorot ayat ke-1)
 */

const Nahwu = {
  JUMLAH: 12,
  LEG: [['r', "Rofa'"], ['n', 'Nashob'], ['j', 'Jer'], ['z', 'Jazm'], ['m', 'Mabni']],
  JENIS: { I: 'Isim', F: "Fi'il", H: 'Harf' },
  IROB: { r: "Rofa'", n: 'Nashob', j: 'Jer', z: 'Jazm', m: 'Mabni' },
  TABS: [['materi', 'Materi'], ['ayat', 'Analisis ayat'], ['latihan', 'Latihan'], ['quiz', 'Quiz']],

  S: null,       // progres
  cur: 0,        // 0 = beranda kursus
  tab: 'materi',
  sorot: null,   // indeks ayat yang disorot (datang dari episode)
  lastHash: '',  // posisi terakhir, dipulihkan saat kembali ke tab Nahwu

  /* ---------- Siklus hidup ---------- */
  init() {
    this.S = Store.nahwu();
    const panel = document.getElementById('panel-nahwu');
    panel.addEventListener('click', (e) => {
      const g = e.target.closest('[data-nw-go]');
      if (g) { this.go(+g.dataset.nwGo, g.dataset.nwTab); return; }
      const t = e.target.closest('[data-nw-tab]');
      if (t && this.cur) this.go(this.cur, t.dataset.nwTab);
    });
    window.addEventListener('hashchange', () => {
      if (location.hash.startsWith('#nahwu')) {
        if (!document.getElementById('panel-nahwu').classList.contains('active')) App.switchTab('nahwu');
        else this.route();
      }
    });
    this.renderSide();
  },

  // Dipanggil App.switchTab('nahwu')
  show() {
    if (!location.hash.startsWith('#nahwu')) this.setHash(this.lastHash || '#nahwu', true);
    this.route();
  },

  // Dari episode Kajian: buka pertemuan p, tab Analisis ayat, sorot ayat vi
  open(p, tab, vi) {
    this.setHash(`#nahwu/p${p}/${tab || 'materi'}${vi != null ? '/' + vi : ''}`);
    App.switchTab('nahwu');
  },

  go(i, t) {
    this.setHash(i ? `#nahwu/p${i}/${t || 'materi'}` : '#nahwu');
    this.route();
    this.toggleSide(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  setHash(h, replace) {
    if (location.hash === h) return;
    if (replace) history.replaceState(null, '', h);
    else history.pushState(null, '', h);
  },

  route() {
    this.lastHash = location.hash.replace(/\/\d+$/, ''); // tanpa sorotan ayat
    const m = /^#nahwu\/p(\d+)(?:\/(\w+))?(?:\/(\d+))?/.exec(location.hash);
    const i = m ? +m[1] : 0;
    this.cur = i >= 1 && i <= this.JUMLAH ? i : 0;
    this.tab = m && this.TABS.some(([k]) => k === m[2]) ? m[2] : 'materi';
    this.sorot = m && m[3] != null ? +m[3] : null;
    this.renderSide();
    if (this.cur) this.renderPertemuan(this.cur); else this.renderHome();
    if (window.Tanya) Tanya.updKonteks();
  },

  save() {
    Store.setNahwu(this.S);
    this.renderSide();
  },

  toggleSide(force) {
    const el = document.getElementById('nwSide');
    el.classList.toggle('open', force != null ? force : !el.classList.contains('open'));
  },

  /* ---------- Progres ---------- */
  status(i) {
    const S = this.S;
    return [
      !!S.read[i],
      (S.ayat[i] || []).length > 0,
      Object.values(S.lat[i] || {}).some((x) => x.done > 0),
      (S.quiz[i] || 0) >= 60,
    ];
  },
  pct(i) { return this.status(i).filter(Boolean).length / 4; },

  /* ---------- Util ---------- */
  arwrap(t) {
    return String(t).replace(/([؀-ۿ][؀-ۿً-ٰ\s]*[؀-ۿً-ٰ])/g, '<span class="ar" lang="ar">$1</span>');
  },
  shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  },
  legend() {
    return `<div class="nw-legend">${this.LEG.map(([k, l]) => `<span><b class="irob-bg-${k}"></b>${l}</span>`).join('')}</div>`;
  },

  /* ---------- Sidebar: daftar pertemuan + progres total ---------- */
  renderSide() {
    const el = document.getElementById('nwSide');
    if (!el) return;
    let tot = 0;
    let h = `<button class="nw-nav ${this.cur === 0 ? 'on' : ''}" data-nw-go="0"><span class="nw-num">⌂</span><span>Beranda kursus</span></button>`;
    for (let i = 1; i <= this.JUMLAH; i++) {
      const p = this.pct(i); tot += p;
      h += `<button class="nw-nav ${this.cur === i ? 'on' : ''}" data-nw-go="${i}" ${this.cur === i ? 'aria-current="page"' : ''}>
        <span class="nw-num ${p === 1 ? 'done' : p > 0 ? 'part' : ''}">${i}</span><span>${NAHWU[i].title}</span></button>`;
    }
    const o = Math.round(tot / this.JUMLAH * 100);
    el.innerHTML = `<div class="nw-logo" lang="ar">النَّحْوُ</div>
      <div class="nw-by">12 pertemuan · Ust. Billy Rizky</div>
      <div class="nw-overall">Progres ${o}%<div class="nw-bar"><i style="width:${o}%"></i></div></div>
      <nav aria-label="Daftar pertemuan">${h}</nav>
      <div class="nw-sync">Progres tersimpan di perangkat ini.</div>`;
  },

  /* ---------- Beranda kursus ---------- */
  renderHome() {
    const names = this.TABS.map(([, l]) => l);
    document.getElementById('nwView').innerHTML = `
      <div class="nw-hero">
        <div class="nw-hero-ar" lang="ar"><u class="irob-m">قَدْ</u> <u class="irob-m">أَفْلَحَ</u> <u class="irob-r">الْمُؤْمِنُونَ</u></div>
        <span class="kicker">Belajar Nahwu</span>
        <h2>Belajar nahwu dari ayat yang sudah kamu hafal</h2>
        <p class="nw-lead">Dua belas pertemuan mengikuti urutan kelas. Setiap bab punya empat bagian: materi, analisis ayat, latihan, dan quiz. Warna garis bawah pada kata Arab selalu menunjukkan keadaan i'robnya:</p>
        ${this.legend()}
      </div>
      <div class="nw-grid">${Array.from({ length: this.JUMLAH }, (_, k) => {
        const i = k + 1, s = this.status(i);
        return `<button class="nw-gcard" data-nw-go="${i}">
          <span class="nw-gn">Pertemuan ${i}</span><span class="nw-gt">${NAHWU[i].title}</span>
          <span class="nw-dots" title="${names.map((n, j) => n + (s[j] ? ' ✓' : '')).join(' · ')}">${s.map((x) => `<i class="${x ? 'on' : ''}"></i>`).join('')}</span>
        </button>`;
      }).join('')}</div>
      <p class="nw-lead nw-small">Satu bab dianggap selesai bila materi ditandai sudah dibaca, minimal satu ayat dianalisis, latihan dicoba, dan quiz ≥ 60%.</p>
      <div class="nw-row"><button class="btn ghost" id="nwReset">Hapus semua progres</button></div>`;
    document.getElementById('nwReset').onclick = () => {
      if (confirm('Hapus semua progres belajar nahwu?')) {
        this.S = { read: {}, quiz: {}, lat: {}, ayat: {} };
        this.save(); this.renderHome();
      }
    };
  },

  /* ---------- Satu pertemuan ---------- */
  renderPertemuan(i) {
    const d = NAHWU[i], s = this.status(i);
    document.getElementById('nwView').innerHTML = `
      <div class="nw-kicker">Pertemuan ${i}</div>
      <h2 class="nw-title">${d.title}</h2>
      <p class="nw-sub">${d.sub}</p>
      <div class="nw-tabs" role="tablist">${this.TABS.map(([k, l], j) =>
        `<button role="tab" data-nw-tab="${k}" aria-selected="${this.tab === k}">${l}${s[j] ? '<span class="nw-ck">✓</span>' : ''}</button>`).join('')}</div>
      <div class="nw-card" id="nwPanel" role="tabpanel"></div>
      <div class="nw-row nw-pager">
        ${i > 1 ? `<button class="btn ghost" data-nw-go="${i - 1}">‹ Pertemuan ${i - 1}</button>` : '<span></span>'}
        ${i < this.JUMLAH ? `<button class="btn ghost" data-nw-go="${i + 1}">Pertemuan ${i + 1} ›</button>` : ''}
      </div>`;
    const pn = document.getElementById('nwPanel');
    ({ materi: this.materi, ayat: this.ayat, latihan: this.latihan, quiz: this.quiz })[this.tab].call(this, pn, i);
  },

  refreshTabChecks(i) {
    const s = this.status(i);
    document.querySelectorAll('.nw-tabs button').forEach((b, j) => {
      if (s[j] && !b.querySelector('.nw-ck')) b.insertAdjacentHTML('beforeend', '<span class="nw-ck">✓</span>');
    });
  },

  /* ---------- Materi ---------- */
  materi(pn, i) {
    pn.innerHTML = `<div class="nw-materi">${NAHWU[i].materi.replace(/<table/g, '<div class="tw"><table').replace(/<\/table>/g, '</table></div>')}</div>
      <div class="nw-row nw-done-row">
        <button class="btn" id="nwMk">${this.S.read[i] ? 'Sudah dibaca ✓' : 'Tandai sudah dibaca'}</button>
        <button class="btn ghost" data-nw-tab="ayat">Lanjut ke analisis ayat</button>
      </div>`;
    document.getElementById('nwMk').onclick = () => { this.S.read[i] = !this.S.read[i]; this.save(); this.renderPertemuan(i); };
    pn.querySelectorAll('[data-widget]').forEach((w) => this.WIDGETS[w.dataset.widget].call(this, w));
  },

  /* ---------- Analisis ayat: klik kata → jenis & i'rob ---------- */
  ayat(pn, i) {
    const seen = new Set(this.S.ayat[i] || []);
    pn.innerHTML = `<p>Klik setiap kata untuk melihat jenis dan i'robnya.</p>${this.legend()}` +
      NAHWU[i].ayat.map((v, vi) => {
        const ep = window.episodeUntukNahwu ? episodeUntukNahwu(v.ref) : null;
        return `<div class="nw-verse ${this.sorot === vi ? 'sorot' : ''}" id="nwV${vi}">
          <div class="nw-vref">${v.ref}</div>
          <div class="nw-words" lang="ar" dir="rtl">${v.t.map((w, wi) =>
            `<button class="nw-w irob-${w[2]} ${seen.has(vi + '-' + wi) ? 'seen' : ''}" data-v="${vi}" data-w="${wi}">${w[0]}</button>`).join('')}</div>
          <div class="nw-vid">${v.id}</div>
          <div class="nw-explain" id="nwEx${vi}" aria-live="polite"><span class="nw-muted">Pilih satu kata di atas.</span></div>
          ${ep ? `<button class="nw-eplink" onclick="App.gotoEpisode('${ep.id}')">Buka kajian episode QS. ${ep.surah} : ${ep.ayatNo} ›</button>` : ''}
        </div>`;
      }).join('');
    pn.querySelectorAll('.nw-w').forEach((b) => b.onclick = () => {
      const vi = +b.dataset.v, wi = +b.dataset.w, w = NAHWU[i].ayat[vi].t[wi];
      pn.querySelectorAll(`.nw-w[data-v="${vi}"]`).forEach((x) => x.classList.remove('on'));
      b.classList.add('on');
      document.getElementById('nwEx' + vi).innerHTML = `<div><span class="nw-hw" lang="ar">${w[0]}</span><span class="nw-pill">${this.JENIS[w[1]]}</span><span class="nw-tag irob-bg-${w[2]}">${this.IROB[w[2]]}</span></div><div class="nw-ket">${w[3]}</div>`;
      const k = vi + '-' + wi;
      if (!seen.has(k)) { seen.add(k); this.S.ayat[i] = [...seen]; this.save(); this.refreshTabChecks(i); }
    });
    if (this.sorot != null) {
      const el = document.getElementById('nwV' + this.sorot);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
    }
  },

  /* ---------- Latihan ---------- */
  latihan(pn, i) {
    pn.innerHTML = NAHWU[i].latihan.map((e, ei) => `<div class="nw-ex" id="nwLat${ei}"></div>`).join('');
    NAHWU[i].latihan.forEach((e, ei) => {
      const el = document.getElementById('nwLat' + ei);
      (e.type === 'transform' ? this.transform : this.classify).call(this, el, e, i, ei);
    });
  },

  catatLatihan(i, ei, ok) {
    const S = this.S;
    S.lat[i] = S.lat[i] || {};
    const r = S.lat[i][ei] || { done: 0, ok: 0 };
    S.lat[i][ei] = { done: r.done + 1, ok: r.ok + (ok ? 1 : 0) };
    this.save(); this.refreshTabChecks(i);
  },

  selesaiHTML(e, teks) {
    return `<h3>${e.title}</h3><div class="nw-qcard"><div class="nw-score-sm">${teks}</div>
      <div class="nw-row nw-center"><button class="btn" data-ulang>Ulangi</button></div></div>`;
  },

  // Kartu "jawab di kepala, lalu cocokkan" (mis. ubah mufrad → tasniyah)
  transform(el, e, i, ei) {
    let order = this.shuffle(e.items.map((_, k) => k)), k = 0, ok = 0;
    const draw = () => {
      if (k >= order.length) {
        el.innerHTML = this.selesaiHTML(e, `Selesai: ${ok} dari ${order.length} benar`);
        el.querySelector('[data-ulang]').onclick = () => { order = this.shuffle(e.items.map((_, x) => x)); k = 0; ok = 0; draw(); };
        return;
      }
      const it = e.items[order[k]];
      el.innerHTML = `<h3>${e.title}</h3><div class="nw-meta"><span>Soal ${k + 1} / ${order.length}</span><span>Benar: ${ok}</span></div>
        <div class="nw-qcard"><div class="nw-q" lang="ar">${it[0]}</div>
          <div data-ans hidden><div class="nw-a" lang="ar">${it[1]}</div>${it[2] ? `<div class="nw-why">${it[2]}</div>` : ''}</div>
          <div class="nw-row nw-center" data-ctl><button class="btn" data-show>Tunjukkan jawaban</button></div></div>
        <p class="nw-why">Jawab dulu di kepala atau tulis di kertas, lalu cocokkan.</p>`;
      el.querySelector('[data-show]').onclick = () => {
        el.querySelector('[data-ans]').hidden = false;
        el.querySelector('[data-ctl]').innerHTML = '<button class="btn" data-y>Jawaban saya benar</button><button class="btn ghost" data-n>Belum tepat</button>';
        el.querySelector('[data-y]').onclick = () => { ok++; this.catatLatihan(i, ei, true); k++; draw(); };
        el.querySelector('[data-n]').onclick = () => { order.push(order[k]); this.catatLatihan(i, ei, false); k++; draw(); };
      };
    };
    draw();
  },

  // Pilihan ganda: opsi bersama (e.opts) atau opsi per soal
  classify(el, e, i, ei) {
    let order = this.shuffle(e.items.map((_, k) => k)), k = 0, ok = 0;
    const draw = () => {
      if (k >= order.length) {
        el.innerHTML = this.selesaiHTML(e, `Skor: ${ok} / ${order.length}`);
        el.querySelector('[data-ulang]').onclick = () => { order = this.shuffle(order); k = 0; ok = 0; draw(); };
        return;
      }
      const it = e.items[order[k]];
      let opts, ans, why;
      if (e.opts) { opts = e.opts.map((o, x) => [o, x]); ans = it[1]; why = it[2]; }
      else { opts = this.shuffle(it[1].map((o, x) => [o, x])); ans = it[2]; why = it[3]; }
      el.innerHTML = `<h3>${e.title}</h3><div class="nw-meta"><span>Soal ${k + 1} / ${order.length}</span><span>Benar: ${ok}</span></div>
        <div class="nw-qcard"><div class="nw-q" lang="ar">${it[0]}</div></div>
        <div class="nw-opts">${opts.map(([o, x]) => `<button class="nw-opt" data-x="${x}">${this.arwrap(o)}</button>`).join('')}</div>
        <div class="nw-fb" data-fb></div>`;
      el.querySelectorAll('.nw-opt').forEach((b) => b.onclick = () => {
        const x = +b.dataset.x, good = x === ans;
        if (good) ok++;
        el.querySelectorAll('.nw-opt').forEach((o) => { o.disabled = true; if (+o.dataset.x === ans) o.classList.add('good'); });
        if (!good) b.classList.add('bad');
        this.catatLatihan(i, ei, good);
        const fb = el.querySelector('[data-fb]');
        fb.className = 'nw-fb ' + (good ? 'good' : 'bad');
        fb.innerHTML = `<b>${good ? 'Tepat.' : 'Belum tepat.'}</b> ${why || ''}
          <div class="nw-row"><button class="btn" data-next>${k + 1 < order.length ? 'Soal berikutnya' : 'Lihat skor'}</button></div>`;
        const nx = el.querySelector('[data-next]');
        nx.onclick = () => { k++; draw(); };
        nx.focus();
      });
    };
    draw();
  },

  /* ---------- Quiz (lulus ≥ 60%) ---------- */
  quiz(pn, i) {
    const qs = this.shuffle(NAHWU[i].quiz);
    let k = 0, ok = 0;
    const draw = () => {
      if (k >= qs.length) {
        const p = Math.round(ok / qs.length * 100);
        const best = Math.max(this.S.quiz[i] || 0, p);
        this.S.quiz[i] = best; this.save();
        pn.innerHTML = `<div class="nw-qcard">
          <div class="nw-score ${p >= 60 ? 'good' : 'bad'}">${p}%</div>
          <div>${ok} dari ${qs.length} benar · skor terbaik ${best}%</div>
          <p class="nw-why">${p >= 60 ? 'Bab ini lulus quiz.' : 'Butuh minimal 60%. Baca ulang materi lalu coba lagi.'}</p>
          <div class="nw-row nw-center"><button class="btn" id="nwAgain">Ulangi quiz</button>
          ${i < this.JUMLAH ? `<button class="btn ghost" data-nw-go="${i + 1}">Pertemuan ${i + 1}</button>` : ''}</div></div>`;
        document.getElementById('nwAgain').onclick = () => this.quiz(pn, i);
        this.refreshTabChecks(i);
        return;
      }
      const q = qs[k], opts = this.shuffle(q.o.map((o, x) => [o, x]));
      pn.innerHTML = `<div class="nw-meta"><span>Pertanyaan ${k + 1} / ${qs.length}</span><span>Skor terbaik: ${this.S.quiz[i] || 0}%</span></div>
        <p class="nw-qtext">${this.arwrap(q.q)}</p>
        <div class="nw-opts">${opts.map(([o, x]) => `<button class="nw-opt" data-x="${x}">${this.arwrap(o)}</button>`).join('')}</div>
        <div class="nw-fb" id="nwQfb"></div>`;
      pn.querySelectorAll('.nw-opt').forEach((b) => b.onclick = () => {
        const x = +b.dataset.x, good = x === q.a;
        if (good) ok++;
        pn.querySelectorAll('.nw-opt').forEach((o) => { o.disabled = true; if (+o.dataset.x === q.a) o.classList.add('good'); });
        if (!good) b.classList.add('bad');
        const fb = document.getElementById('nwQfb');
        fb.className = 'nw-fb ' + (good ? 'good' : 'bad');
        fb.innerHTML = `<b>${good ? 'Benar.' : 'Kurang tepat.'}</b> ${this.arwrap(q.why)}
          <div class="nw-row"><button class="btn" id="nwQn">${k + 1 < qs.length ? 'Berikutnya' : 'Lihat hasil'}</button></div>`;
        const nx = document.getElementById('nwQn');
        nx.onclick = () => { k++; draw(); };
        nx.focus();
      });
    };
    draw();
  },

  /* ---------- Widget interaktif di dalam materi ---------- */
  WIDGETS: {
    // 'amil berganti → akhir kata mu'rab berubah, mabni tetap
    amil(w) {
      const D = NAHWU_WIDGET.amil;
      let s = 0;
      const kal = (x) => D[x].kalimat[s].replace(D[x].akhir[s], `<b class="irob-${x === 'murab' ? D.amil[s][1] : 'm'}">${D[x].akhir[s]}</b>`);
      const draw = () => {
        w.innerHTML = `<div class="nw-seg">${D.amil.map((a, x) =>
          `<button aria-pressed="${s === x}" data-s="${x}"><span lang="ar">${a[0]}</span> <small>(${this.IROB[a[1]]} — ${a[2]})</small></button>`).join('')}</div>
          <div class="nw-amil">
            <div class="nw-box"><small>Mu'rab: <span lang="ar">${D.murab.label}</span></small><div class="nw-s" lang="ar">${kal('murab')}</div><small>Akhir kata berubah</small></div>
            <div class="nw-box"><small>Mabni: <span lang="ar">${D.mabni.label}</span></small><div class="nw-s" lang="ar">${kal('mabni')}</div><small>Akhir kata tetap kasrah</small></div>
          </div>`;
        w.querySelectorAll('[data-s]').forEach((b) => b.onclick = () => { s = +b.dataset.s; draw(); });
      };
      draw();
    },
    // Tabel tanda i'rob 9 isim mu'rab per keadaan
    tabel9(w) {
      const D = NAHWU_WIDGET.tabel9;
      let s = 0;
      const draw = () => {
        const [k, nama] = D.keadaan[s];
        w.innerHTML = `<div class="nw-seg">${D.keadaan.map((c, x) =>
          `<button aria-pressed="${s === x}" data-s="${x}">${c[1]} <small lang="ar">${c[2]}</small></button>`).join('')}</div>
          <div class="tw"><table class="t"><tr><th>Jenis isim</th><th>Tanda ${nama}</th><th class="nw-r">Contoh</th></tr>
          ${D.rows.map((r) => {
            const t = r[1][s * 2], e = r[1][s * 2 + 1];
            const odd = !['dhammah', 'fathah', 'kasrah'].includes(t);
            return `<tr><td>${r[0]}</td><td class="${odd ? 'nw-odd irob-fg-' + k : ''}">${t}</td><td class="ar"><span class="nw-ul irob-${k}">${e}</span></td></tr>`;
          }).join('')}
          </table></div><p class="nw-why">Huruf tebal = tanda pengganti atau muqaddarah. ⚑ = pengecualian yang paling sering keliru.</p>`;
        w.querySelectorAll('[data-s]').forEach((b) => b.onclick = () => { s = +b.dataset.s; draw(); });
      };
      draw();
    },
  },

  /* ---------- Kotak "Analisis nahwu" di halaman episode Kajian ---------- */
  renderEpisodeLink(ayat) {
    if (!window.nahwuUntukEpisode) return '';
    const hits = nahwuUntukEpisode(ayat);
    if (!hits.length) return '';
    return `<div class="nw-epbox">
      <div class="nw-epbox-label">Analisis nahwu</div>
      <p>Kata-kata ayat ini dibedah jenis &amp; i'robnya di modul Belajar Nahwu:</p>
      <div class="nw-row">${hits.map((h) =>
        `<button class="btn ghost" onclick="Nahwu.open(${h.p}, 'ayat', ${h.vi})">Pertemuan ${h.p} · ${h.ref.replace(/^QS\.\s*/, '')}</button>`).join('')}</div>
    </div>`;
  },
};
window.Nahwu = Nahwu;
