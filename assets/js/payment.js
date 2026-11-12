/*
 * payment.js — Integrasi pembayaran Mayar (https://mayar.id)
 *
 * Cara pakai (untuk pemilik aplikasi):
 * 1. Buat produk di Mayar (cukup satu link untuk kedua paket; pembeli memilih
 *    Bulanan/Tahunan di halaman Mayar). Salin link-nya ke CONFIG.checkout.
 * 2. Deploy server/ (lihat server/README) lalu isi CONFIG.apiBase dengan URL-nya,
 *    mis. 'https://quranlens.onrender.com'. Webhook Mayar mencatat order yang LUNAS.
 * 3. Pembeli bayar di Mayar → webhook (bertoken) mencatat transaksi setelah
 *    diverifikasi ulang ke API Mayar → pembeli kembali via Redirect URL
 *    (?aktivasi=1[&order=...]) atau menempel Order ID di "Aktivasi dengan Order ID"
 *    → server menerbitkan token sesi → konten Premium diambil dari server (premium.js).
 *
 * CATATAN: API Key & Webhook Secret Mayar TIDAK pernah ditaruh di sini —
 * keduanya hanya di server sebagai environment variable.
 */
const Payment = {
  // Satu link checkout Mayar untuk kedua paket
  MAYAR_LINK: 'https://bayu-maulana.myr.id/m/the-quran-lens',
  CONFIG: {
    checkout: {
      'Bulanan': 'https://bayu-maulana.myr.id/m/the-quran-lens',
      'Tahunan': 'https://bayu-maulana.myr.id/m/the-quran-lens',
    },
    slug: {
      'bulanan': 'Bulanan',
      'tahunan': 'Tahunan',
    },
    // URL backend verifikasi (server/). KOSONGKAN untuk mode demo sisi-klien.
    // Setelah server di-deploy: 'https://quranlens.onrender.com' -> memanggil /api/verify
    apiBase: 'https://quran-lens-api.onrender.com',
  },

  // True bila backend verifikasi sudah dipasang
  backendAktif() { return !!this.CONFIG.apiBase; },

  // Verifikasi Order ID ke server (dipertahankan untuk kompatibilitas; lihat premium.js).
  async verifikasiOrder(order) {
    if (window.Premium) return Premium.verifikasiOrder(order);
    return { active: false, error: 'backend-nonaktif' };
  },

  terkonfigurasi(paket) {
    const url = this.CONFIG.checkout[paket] || '';
    return url && !/CHECKOUT-/.test(url);
  },

  checkout(paket) {
    const url = this.CONFIG.checkout[paket];
    if (!this.terkonfigurasi(paket)) return false;
    // Mayar membaca UTM/plan bila param itu didaftarkan di produk → Track → URL Param.
    let tujuan = url;
    if (window.Analytics && typeof Analytics.decorateMayar === 'function') {
      tujuan = Analytics.decorateMayar(url, paket);
      Analytics.event('premium_checkout_click', {
        plan: Analytics.planFor(paket),
        provider: 'mayar',
      });
    }
    window.open(tujuan, '_blank', 'noopener');
    return true;
  },

  // Kembali dari Mayar: ?aktivasi=<slug|1>&order=<id>. Nama parameter ID transaksi
  // yang (mungkin) ditambahkan Mayar belum terdokumentasi → beberapa nama diterima.
  // Tanpa ID → order kosong; app meminta pembeli menempel Order ID.
  cekRedirect() {
    const p = new URLSearchParams(window.location.search);
    if (!p.has('aktivasi')) return null;
    const slug = String(p.get('aktivasi') || '').toLowerCase();
    const order = ['order', 'transactionId', 'transaction_id', 'invoiceId', 'invoice_id', 'id']
      .map((k) => p.get(k)).find((v) => v && v.trim().length >= 4) || '';
    return { paket: this.CONFIG.slug[slug] || null, order: order.trim() };
  },

  bersihkanURL() {
    if (window.history.replaceState) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  },
};
window.Payment = Payment;
