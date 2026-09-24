/*
 * nahwu-tanya.js — "Tanya ustadz AI" untuk halaman Belajar Nahwu.
 *
 * Pertanyaan dikirim ke backend sendiri (server/: POST /api/nahwu/tanya) yang
 * meneruskannya ke Claude. API key Anthropic HANYA ada di server (env
 * ANTHROPIC_API_KEY) — tidak pernah di sini. Tombol baru muncul bila
 * /api/health melaporkan tanya:true (server aktif & key terpasang).
 * Jawaban dialirkan (SSE): baris "data: {t}" per potongan teks, lalu {done} / {error}.
 */
const Tanya = {
  hist: [],
  busy: null,
  aktif: false,

  ERR: {
    rate_limited: 'Terlalu banyak pertanyaan dalam waktu singkat. Tunggu sebentar lalu kirim lagi.',
    too_large: 'Percakapan terlalu panjang. Tekan Bersihkan lalu tanya lagi.',
    refused: 'Pertanyaan ini tidak bisa dijawab. Coba ubah kalimatnya.',
    unavailable: 'Fitur tanya sedang tidak tersedia.',
  },

  api() { return (window.Payment && Payment.CONFIG.apiBase || '').replace(/\/$/, ''); },

  async init() {
    if (!this.api()) return;
    try {
      const r = await fetch(this.api() + '/api/health', { cache: 'no-store' });
      const j = await r.json();
      if (!j.tanya) return;
    } catch (e) { return; }
    this.aktif = true;
    this.mount();
  },

  mount() {
    document.body.insertAdjacentHTML('beforeend', `
      <button class="nw-askfab" id="nwAskFab" aria-controls="nwAsk">Tanya ustadz AI</button>
      <section class="nw-ask" id="nwAsk" hidden aria-label="Tanya jawab nahwu">
        <div class="nw-askh"><div><b>Tanya jawab nahwu</b><small id="nwAskCtx">Konteks: Beranda kursus</small></div>
          <div class="nw-row"><button id="nwAskClr">Bersihkan</button><button id="nwAskX" aria-label="Tutup">Tutup</button></div></div>
        <div class="nw-asklog" id="nwAskLog"></div>
        <form class="nw-askf" id="nwAskF">
          <textarea id="nwAskIn" rows="2" maxlength="1500" placeholder="Tulis pertanyaan, mis. kenapa الصَّالِحَاتِ dibaca kasrah?"></textarea>
          <button class="btn" id="nwAskSend" type="submit">Kirim</button>
        </form>
        <div class="nw-askfoot">Jawaban AI bisa keliru — cocokkan dengan materi &amp; guru.</div>
      </section>`);
    const $ = (id) => document.getElementById(id);
    this.log = $('nwAskLog'); this.inp = $('nwAskIn');
    $('nwAskF').onsubmit = (e) => { e.preventDefault(); const q = this.inp.value; this.inp.value = ''; this.ask(q); };
    this.inp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); $('nwAskF').requestSubmit(); }
    });
    this.log.addEventListener('click', (e) => { const b = e.target.closest('[data-q]'); if (b) this.ask(b.dataset.q); });
    $('nwAskFab').onclick = () => { $('nwAsk').hidden = false; $('nwAskFab').hidden = true; this.updKonteks(); this.render(); this.inp.focus(); };
    $('nwAskX').onclick = () => { $('nwAsk').hidden = true; $('nwAskFab').hidden = false; };
    $('nwAskClr').onclick = () => { if (this.busy) this.busy.abort(); this.hist = []; this.render(); };
    this.render();
  },

  /* ---------- Tampilan ---------- */
  esc(t) { return String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); },
  fmt(t) { return Nahwu.arwrap(this.esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')).replace(/\n/g, '<br>'); },
  strip(html) { const d = document.createElement('div'); d.innerHTML = html; return d.textContent.replace(/\s+/g, ' ').trim(); },

  chips() {
    const cur = Nahwu.cur;
    const base = cur
      ? [`Jelaskan inti bab "${NAHWU[cur].title}" dengan analogi sederhana`, 'Beri 3 contoh lain dari Juz Amma untuk bab ini', 'Apa kesalahan yang paling sering terjadi di bab ini?']
      : ['Bagaimana urutan belajar nahwu yang efektif?', "Apa beda i'rob dan bina'?", "Tolong i'robkan: قُلْ هُوَ اللَّهُ أَحَدٌ"];
    return `<div class="nw-msg a">Silakan tanya apa saja soal nahwu, atau minta i'rob sebuah ayat/kalimat. Jawaban memakai konteks bab yang sedang dibuka.</div>
      <div class="nw-chips">${base.map((c) => `<button type="button" data-q="${this.esc(c)}">${Nahwu.arwrap(this.esc(c))}</button>`).join('')}</div>`;
  },

  render() {
    if (!this.log) return;
    this.log.innerHTML = this.hist.length
      ? this.hist.map((m) => `<div class="nw-msg ${m.role === 'user' ? 'u' : 'a'}">${this.fmt(m.content)}</div>`).join('')
      : this.chips();
    this.log.scrollTop = this.log.scrollHeight;
  },

  updKonteks() {
    const el = document.getElementById('nwAskCtx');
    if (!el) return;
    el.textContent = 'Konteks: ' + (Nahwu.cur ? `Pertemuan ${Nahwu.cur} — ${NAHWU[Nahwu.cur].title}` : 'Beranda kursus');
    if (!this.hist.length) this.render();
  },

  // Ringkasan halaman yang sedang dibuka (dibatasi; server juga membatasi)
  konteks() {
    const cur = Nahwu.cur;
    if (!cur) return 'Pengguna sedang di beranda kursus. Daftar bab: ' + NAHWU.slice(1).map((p, k) => `${k + 1}. ${p.title}`).join('; ');
    const d = NAHWU[cur];
    return `Pengguna sedang membuka Pertemuan ${cur}: ${d.title} (${d.sub}).\nRingkasan materi bab ini:\n${this.strip(d.materi).slice(0, 3000)}\n` +
      `Ayat contoh di bab ini: ${d.ayat.map((v) => v.ref + ' ' + v.t.map((w) => w[0]).join(' ')).join(' | ')}`.slice(0, 800);
  },

  /* ---------- Kirim & terima (streaming) ---------- */
  async ask(q) {
    q = String(q || '').trim();
    if (!q || this.busy || !this.aktif) return;
    this.hist.push({ role: 'user', content: q });
    this.render();
    const bubble = document.createElement('div');
    bubble.className = 'nw-msg a';
    bubble.textContent = 'Sedang berpikir…';
    this.log.appendChild(bubble);
    this.log.scrollTop = this.log.scrollHeight;

    this.busy = new AbortController();
    const send = document.getElementById('nwAskSend');
    send.disabled = true;
    let text = '', err = null;
    try {
      const res = await fetch(this.api() + '/api/nahwu/tanya', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: this.hist.slice(-8), konteks: this.konteks() }),
        signal: this.busy.signal,
      });
      if (!res.ok || !res.body) {
        const j = await res.json().catch(() => ({}));
        throw Object.assign(new Error('http'), { code: j.code || 'unavailable' });
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = '';
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        let n;
        while ((n = buf.indexOf('\n\n')) >= 0) {
          const line = buf.slice(0, n).replace(/^data: ?/, '');
          buf = buf.slice(n + 2);
          if (!line) continue;
          const ev = JSON.parse(line);
          if (ev.t) { text += ev.t; bubble.innerHTML = this.fmt(text); this.log.scrollTop = this.log.scrollHeight; }
          if (ev.error) err = ev.error;
        }
      }
    } catch (e) {
      err = e.name === 'AbortError' ? 'cancelled' : (e.code || 'network');
    } finally {
      this.busy = null;
      send.disabled = false;
    }
    if (text && err !== 'refused') this.hist.push({ role: 'assistant', content: text });
    else this.hist.pop(); // pertanyaan tanpa jawaban dibuang agar percakapan tetap bergantian
    this.render();
    if (err && err !== 'cancelled') {
      const d = document.createElement('div');
      d.className = 'nw-msg a err';
      d.textContent = this.ERR[err] || 'Jawaban gagal dimuat. Coba kirim lagi.';
      this.log.appendChild(d);
    }
  },
};
window.Tanya = Tanya;
