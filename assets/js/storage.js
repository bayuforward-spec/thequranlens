/*
 * storage.js — Status Premium, bookmark ayat, & streak harian (localStorage).
 *
 * Catatan: Gating Premium di sini sisi-klien untuk demo produk. Untuk produksi,
 * validasi langganan harus di server (webhook Scalev + autentikasi pengguna).
 */
const Store = {
  KEY_PRO: 'quranlens_pro',
  KEY_MARK: 'quranlens_bookmark',
  KEY_STREAK: 'quranlens_streak',
  KEY_DONE: 'quranlens_done',
  KEY_REMINDER: 'quranlens_reminder',

  /* ---------- Premium ---------- */
  isPro() {
    const raw = localStorage.getItem(this.KEY_PRO);
    return raw ? JSON.parse(raw) : null;
  },
  setPro(paket, order) {
    const data = { paket, order: order || '-', aktifSejak: new Date().toISOString() };
    localStorage.setItem(this.KEY_PRO, JSON.stringify(data));
    return data;
  },

  /* ---------- Bookmark ---------- */
  bookmarks() {
    try { return JSON.parse(localStorage.getItem(this.KEY_MARK)) || []; }
    catch { return []; }
  },
  isMarked(id) { return this.bookmarks().includes(id); },
  toggleMark(id) {
    const list = this.bookmarks();
    const i = list.indexOf(id);
    if (i >= 0) list.splice(i, 1); else list.unshift(id);
    localStorage.setItem(this.KEY_MARK, JSON.stringify(list));
    return i < 0; // true bila baru ditandai
  },

  /* ---------- Tandai selesai dipelajari (progress) ---------- */
  doneList() {
    try { return JSON.parse(localStorage.getItem(this.KEY_DONE)) || []; }
    catch { return []; }
  },
  isDone(id) { return this.doneList().includes(id); },
  toggleDone(id) {
    const list = this.doneList();
    const i = list.indexOf(id);
    if (i >= 0) list.splice(i, 1); else list.push(id);
    localStorage.setItem(this.KEY_DONE, JSON.stringify(list));
    return i < 0; // true bila baru ditandai selesai
  },
  doneCount(ids) { return (ids || []).filter(id => this.isDone(id)).length; },

  /* ---------- Pengingat "Kata Hari Ini" ---------- */
  reminder() {
    try { return JSON.parse(localStorage.getItem(this.KEY_REMINDER)) || { on: false, last: null }; }
    catch { return { on: false, last: null }; }
  },
  reminderOn() { return this.reminder().on; },
  setReminder(on) {
    const r = this.reminder(); r.on = !!on;
    localStorage.setItem(this.KEY_REMINDER, JSON.stringify(r));
    return r;
  },
  markReminderShown(dateStr) {
    const r = this.reminder(); r.last = dateStr;
    localStorage.setItem(this.KEY_REMINDER, JSON.stringify(r));
  },

  /* ---------- Streak harian (retensi) ---------- */
  streak() {
    try { return JSON.parse(localStorage.getItem(this.KEY_STREAK)) || { count: 0, last: null }; }
    catch { return { count: 0, last: null }; }
  },
  catatKunjungan() {
    const s = this.streak();
    const hariIni = new Date().toISOString().slice(0, 10);
    if (s.last === hariIni) return s; // sudah dicatat hari ini
    const kemarin = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    s.count = (s.last === kemarin) ? s.count + 1 : 1;
    s.last = hariIni;
    localStorage.setItem(this.KEY_STREAK, JSON.stringify(s));
    return s;
  },
};
window.Store = Store;
